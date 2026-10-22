// ============================================================
//  SITE CONFIG — the ONE place for your personal details.
//  Search for the [SQUARE BRACKETS] below and replace each one.
//  Anything still inside square brackets is treated as "not set yet":
//   - links are shown as plain text instead of clickable links
//   - the contact form refuses to send until the email is set
// ============================================================

const siteConfig = {
  // [PLACEHOLDER] Your full name, e.g. "Priya Sharma"
  name: "Sri Naga Nainika Pulapa",

  // [PLACEHOLDER] Short wordmark for the navbar/footer, e.g. "PS"
  initials: "N",

  // Role headline shown in the hero (as supplied)
  headline: "Aspiring AI Generalist | Exploring AI & Visual Design",

  // [EDITABLE] Short introduction shown in the hero
  intro:
    "I'm a Computer Science and Business Systems student interested in exploring how technology, AI, and creative thinking can come together to build meaningful visual experiences. I enjoy experimenting with ideas, learning new tools, and turning concepts into visual outcomes.",

  // [PLACEHOLDER] Your final personal statement for the About section.
  // Leave it as is until you have written your own.
  personalStatement:
    "I’m curious about how AI can make creative work more intuitive, efficient, and meaningful. I enjoy exploring ideas, experimenting with design concepts, and finding better ways to solve problems. I hope to learn how to build practical AI-powered workflows that support designers and improve the creative process.",

  // [PLACEHOLDER] The email that receives contact-form messages.
  // This is also used for the mailto: link. Example: "you@example.com"
  // NOTE: this address is visible in the website's code (see README).
  email: "Nainika.pulapa@gmail.com",

  // [PLACEHOLDER] Full URL, e.g. "https://www.linkedin.com/in/your-name"
  linkedin: "https://www.linkedin.com/in/nainika-pulapa-30893027a?utm_source=share_via&utm_content=profile&utm_medium=member_android",

  // [PLACEHOLDER] Full URL, e.g. "https://github.com/your-username"
  // Optional: if you have no GitHub, leave the placeholder and it is hidden in the footer.
  github: "https://github.com/nainika-p",

  // Education (supplied details — do not add anything you cannot prove)
  education: {
    degree: "B.Tech — Computer Science and Business Systems",
    institution: "SRM Institute of Science and Technology",
    graduation: "Expected graduation: 2027",
  },
};

// Returns true when a value has been filled in (i.e. is not a [PLACEHOLDER]).
export function isSet(value) {
  return typeof value === "string" && value.trim() !== "" && !value.trim().startsWith("[");
}

export default siteConfig;
