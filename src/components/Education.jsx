import siteConfig from "../data/siteConfig.js";

export default function Education() {
  const { degree, institution, graduation } = siteConfig.education;

  return (
    <section id="education" className="section" aria-labelledby="education-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="section-label">03 — Education</p>
          <h2 id="education-title" className="section-title">
            Where I'm studying.
          </h2>
        </div>

        <div className="timeline reveal">
          <div className="timeline__marker" aria-hidden="true" />
          <article className="timeline__card">
            <p className="timeline__date">{graduation}</p>
            <h3 className="timeline__degree">{degree}</h3>
            <p className="timeline__school">{institution}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
