import { useEffect, useRef, useState } from "react";
import { X, ArrowUpRight } from "lucide-react";
import ProjectVisual from "./ProjectVisual.jsx";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const panelRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [closing, setClosing] = useState(false);

  // Play the closing animation first, then tell the parent to remove the modal.
  function requestClose() {
    if (closing) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onClose();
      return;
    }
    setClosing(true);
    setTimeout(onClose, 180);
  }

  useEffect(() => {
    // Lock page scrolling behind the modal and move focus into it.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    function onKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      // Keep Tab / Shift+Tab inside the modal ("focus trap").
      if (e.key === "Tab" && panelRef.current) {
        const items = panelRef.current.querySelectorAll(FOCUSABLE);
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleId = `modal-title-${project.id}`;

  return (
    <div
      className={`modal${closing ? " is-closing" : ""}`}
      onMouseDown={(e) => {
        // Clicking the dark backdrop (not the panel) closes the modal.
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div
        className="modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={panelRef}
      >
        <button
          type="button"
          className="modal__close"
          onClick={requestClose}
          ref={closeBtnRef}
          aria-label="Close project details"
        >
          <X size={20} aria-hidden="true" />
        </button>

        <div className="modal__visual">
          <ProjectVisual project={project} large />
        </div>

        <div className="modal__content">
          <div className="card__meta">
            <span className="card__category">{project.category}</span>
            {project.isSample && <span className="badge">Sample concept</span>}
          </div>
          <h3 id={titleId} className="modal__title">
            {project.title}
          </h3>

          <dl className="modal__details">
            <div>
              <dt>Project overview</dt>
              <dd>{project.overview}</dd>
            </div>
            <div>
              <dt>Creative objective</dt>
              <dd>{project.objective}</dd>
            </div>
            <div>
              <dt>Design approach</dt>
              <dd>{project.approach}</dd>
            </div>
            <div>
              <dt>Tools used</dt>
              <dd>{project.tools.join(" · ")}</dd>
            </div>
            <div>
              <dt>Key learning or outcome</dt>
              <dd>{project.outcome}</dd>
            </div>
          </dl>

          {/* Only shown when you add a real URL in projects.js */}
          {project.url && (
            <a
              className="btn btn--primary"
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit project <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
