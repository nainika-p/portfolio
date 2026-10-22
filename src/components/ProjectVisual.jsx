// Shows a project preview.
//  - If the project has an `image` file name (in src/assets/projects/), that image is shown.
//  - Otherwise an original CSS-made sample composition is shown.

// Vite finds every image in src/assets/projects/ and gives us its final URL.
const imageFiles = import.meta.glob("../assets/projects/*.{png,jpg,jpeg,webp,gif,svg,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

function findImage(fileName) {
  if (!fileName) return null;
  const key = Object.keys(imageFiles).find((path) => path.endsWith(`/${fileName}`));
  return key ? imageFiles[key] : null;
}

export default function ProjectVisual({ project, large = false }) {
  const src = findImage(project.image);
  const size = large ? " pv--large" : "";

  if (src) {
    return (
      <div className={`pv pv--image${size}`}>
        <img src={src} alt={project.imageAlt} loading="lazy" />
      </div>
    );
  }

  return (
    <div className={`pv pv--${project.visual}${size}`} role="img" aria-label={project.imageAlt}>
      {project.visual === "exploration" && (
        <>
          <span className="pv__shape pv__shape--circle" />
          <span className="pv__shape pv__shape--half" />
          <span className="pv__shape pv__shape--bar" />
          <span className="pv__shape pv__shape--ring" />
          <span className="pv__letter" aria-hidden="true">
            Ag
          </span>
          <span className="pv__caption" aria-hidden="true">
            Color · Mood · Type
          </span>
        </>
      )}

      {project.visual === "campaign" && (
        <>
          <div className="pv__poster">
            <span className="pv__poster-kicker">Concept</span>
            <span className="pv__poster-title">Big idea</span>
            <span className="pv__poster-circle" />
            <span className="pv__poster-line" />
          </div>
          <div className="pv__tile pv__tile--one">
            <span />
          </div>
          <div className="pv__tile pv__tile--two">
            <span />
          </div>
        </>
      )}

      {project.visual === "digital" && (
        <>
          <div className="pv__desktop">
            <div className="pv__bar">
              <i />
              <i />
              <i />
            </div>
            <div className="pv__page">
              <span className="pv__h1" />
              <span className="pv__h2" />
              <span className="pv__btn" />
              <span className="pv__hero-block" />
            </div>
          </div>
          <div className="pv__phone">
            <span className="pv__notch" />
            <span className="pv__h1" />
            <span className="pv__card" />
            <span className="pv__card" />
            <span className="pv__btn" />
          </div>
        </>
      )}
    </div>
  );
}
