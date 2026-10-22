import siteConfig from "../data/siteConfig.js";

const interests = [
  {
    title: "AI-assisted design",
    text: "I'm curious about how AI tools can become part of a creative process, from first sketch to finished visual.",
  },
  {
    title: "Visual communication",
    text: "I like thinking about how color, type and layout carry an idea to the person looking at them.",
  },
  {
    title: "Digital experiences",
    text: "I'm interested in how interfaces can feel clear, intuitive and enjoyable to use.",
  },
  {
    title: "Learning by making",
    text: "I learn best by experimenting, trying new tools and turning small ideas into real outcomes.",
  },
];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__lead reveal">
          <p className="section-label">01 — About</p>
          <h2 id="about-title" className="section-title">
            Technology, curiosity and a visual eye.
          </h2>
          <p className="about__academic">
            I'm studying {siteConfig.education.degree} at {siteConfig.education.institution}, and I'm
            looking for ways to bring my technical background together with creative work.
          </p>
          <blockquote className="about__statement">{siteConfig.personalStatement}</blockquote>
        </div>

        <ul className="about__list">
          {interests.map((item) => (
            <li key={item.title} className="about__item reveal">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
