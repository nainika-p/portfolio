import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import projects from "../data/projects.js";
import ProjectVisual from "./ProjectVisual.jsx";
import ProjectModal from "./ProjectModal.jsx";

export default function Projects() {
  const [selected, setSelected] = useState(null);
  // Remember which button opened the modal so focus can return to it.
  const triggerRef = useRef(null);

  function openProject(project, event) {
    triggerRef.current = event.currentTarget;
    setSelected(project);
  }

  function closeProject() {
    setSelected(null);
    // Return focus to the "View Project" button that opened the modal.
    if (triggerRef.current) triggerRef.current.focus();
  }

  return (
    <section id="work" className="section section--tint" aria-labelledby="work-title">
      <div className="container">
        <div className="section-head reveal">
          <p className="section-label">02 — Selected Work</p>
          <h2 id="work-title" className="section-title">
            AI &amp; design projects
          </h2>
          <p className="section-note">
            A selection of product design explorations and AI-driven concepts focused on creative problem-solving, thoughtful design decisions, and more effective workflows.
          </p>
        </div>

        <ul className="work__grid">
          {projects.map((project) => (
            <li key={project.id} className="card reveal">
              <button
                type="button"
                className="card__media"
                onClick={(e) => openProject(project, e)}
                aria-label={`View project: ${project.title}`}
                tabIndex={-1}
              >
                <ProjectVisual project={project} />
              </button>

              <div className="card__body">
                <div className="card__meta">
                  <span className="card__category">{project.category}</span>
                  {project.isSample && <span className="badge">Sample concept</span>}
                </div>
                <h3 className="card__title">{project.title}</h3>
                <p className="card__desc">{project.shortDescription}</p>
                <p className="card__tools">
                  <span className="card__tools-label">Tools:</span> {project.tools.join(" · ")}
                </p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={(e) => openProject(project, e)}
                >
                  View Project <ArrowUpRight size={18} aria-hidden="true" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selected && <ProjectModal project={selected} onClose={closeProject} />}
    </section>
  );
}
