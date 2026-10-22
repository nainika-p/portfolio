import { useRef, useState } from "react";
import { Send, Mail, ArrowUpRight } from "lucide-react";
import siteConfig, { isSet } from "../data/siteConfig.js";

// FormSubmit's documented AJAX endpoint: https://formsubmit.co/ajax/<your-email>
// The recipient email comes from src/data/siteConfig.js — do not edit it here.
const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/";

const EMPTY = { name: "", email: "", subject: "", message: "" };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "That email address doesn't look right. Example: name@example.com";
  }
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (!values.message.trim()) {
    errors.message = "Please write a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Your message is a bit short. Please write at least 10 characters.";
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  // status: "idle" | "submitting" | "success" | "error"
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");
  // A ref blocks double-clicks instantly (state updates can lag a moment).
  const submittingRef = useRef(false);

  const emailReady = isSet(siteConfig.email);

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    // Remove the error for a field as soon as the person starts fixing it.
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
    if (status !== "submitting") {
      setStatus("idle");
      setFeedback("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submittingRef.current) return;

    // Honeypot: real people never see this field. If it is filled, a bot did it.
    // We quietly stop without sending and without a success message.
    if (e.currentTarget.elements._honey?.value) return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus("error");
      setFeedback("Please fix the highlighted fields and try again.");
      // Move focus to the first field with a problem.
      const firstKey = Object.keys(found)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }

    if (!emailReady) {
      setStatus("error");
      setFeedback(
        "The recipient email is not set yet. Open src/data/siteConfig.js and replace [YOUR EMAIL] with your real address."
      );
      return;
    }

    submittingRef.current = true;
    setStatus("submitting");
    setFeedback("Sending your message…");

    try {
      const response = await fetch(`${FORMSUBMIT_ENDPOINT}${encodeURIComponent(siteConfig.email.trim())}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          message: values.message.trim(),
          _subject: values.subject.trim(),
          _replyto: values.email.trim(),
          _template: "table",
          _captcha: "false",
        }),
      });

      let data = null;
      try {
        data = await response.json();
      } catch {
        data = null;
      }

      // FormSubmit answers with JSON like { "success": "true", "message": "..." }.
      // We only show success when the HTTP status is OK AND the service says success.
      const confirmed = response.ok && data && String(data.success) === "true";

      if (confirmed) {
        setValues(EMPTY); // clear the form ONLY after confirmed success
        setErrors({});
        setStatus("success");
        setFeedback("Thank you! Your message was sent successfully. I'll get back to you soon.");
      } else {
        setStatus("error");
        const reason = data && data.message ? ` The service said: "${data.message}"` : "";
        setFeedback(
          `Your message could not be sent.${reason} Your text is still here, so you can try again, or email me directly using the link above.`
        );
      }
    } catch {
      // Network failure, blocked request, offline, etc.
      setStatus("error");
      setFeedback(
        "Your message could not be sent because of a network problem. Your text is still here, so you can try again, or email me directly using the link above."
      );
    } finally {
      submittingRef.current = false;
    }
  }

  const submitting = status === "submitting";

  return (
    <section id="contact" className="section section--tint" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro reveal">
          <p className="section-label">04 — Contact</p>
          <h2 id="contact-title" className="section-title">
            Let's Connect
          </h2>
          <p className="contact__lead">
            If you'd like to talk about design, AI, or an opportunity, send me a message. I'd be glad
            to hear from you.
          </p>

          <ul className="contact__links">
            <li>
              {emailReady ? (
                <a href={`mailto:${siteConfig.email}`} className="contact__link">
                  <Mail size={18} aria-hidden="true" /> {siteConfig.email}
                </a>
              ) : (
                <span className="contact__link contact__link--todo">
                  <Mail size={18} aria-hidden="true" /> {siteConfig.email}
                </span>
              )}
            </li>
            <li>
              {isSet(siteConfig.linkedin) ? (
                <a
                  href={siteConfig.linkedin}
                  className="contact__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <span className="contact__link contact__link--todo">{siteConfig.linkedin}</span>
              )}
            </li>
            <li>
              {isSet(siteConfig.github) ? (
                <a
                  href={siteConfig.github}
                  className="contact__link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              ) : (
                <span className="contact__link contact__link--todo">{siteConfig.github}</span>
              )}
            </li>
          </ul>

          <p className="contact__privacy">
            
          </p>
        </div>

        <form className="form reveal" onSubmit={handleSubmit} noValidate aria-describedby="form-status">
          {/* Honeypot spam trap — hidden from people and screen readers */}
          <div className="form__honey" aria-hidden="true">
            <label htmlFor="contact-honey">Leave this field empty</label>
            <input id="contact-honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="field">
            <label htmlFor="contact-name">Full name</label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={handleChange}
              aria-invalid={errors.name ? "true" : "false"}
              aria-describedby={errors.name ? "error-name" : undefined}
              disabled={submitting}
            />
            {errors.name && (
              <p className="field__error" id="error-name">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact-email">Email address</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={values.email}
              onChange={handleChange}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "error-email" : undefined}
              disabled={submitting}
            />
            {errors.email && (
              <p className="field__error" id="error-email">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact-subject">Subject</label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              value={values.subject}
              onChange={handleChange}
              aria-invalid={errors.subject ? "true" : "false"}
              aria-describedby={errors.subject ? "error-subject" : undefined}
              disabled={submitting}
            />
            {errors.subject && (
              <p className="field__error" id="error-subject">
                {errors.subject}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              rows="6"
              required
              value={values.message}
              onChange={handleChange}
              aria-invalid={errors.message ? "true" : "false"}
              aria-describedby={errors.message ? "error-message" : undefined}
              disabled={submitting}
            />
            {errors.message && (
              <p className="field__error" id="error-message">
                {errors.message}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn--primary form__submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send Message"}
            <Send size={18} aria-hidden="true" />
          </button>

          {/* Screen-reader friendly status area. It is always in the page so updates are announced. */}
          <div
            id="form-status"
            className={`form__status${status === "success" ? " is-success" : ""}${
              status === "error" ? " is-error" : ""
            }`}
            role={status === "error" ? "alert" : "status"}
            aria-live={status === "error" ? "assertive" : "polite"}
          >
            {feedback}
          </div>
        </form>
      </div>
    </section>
  );
}
