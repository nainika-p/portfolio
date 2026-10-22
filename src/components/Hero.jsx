import { ArrowDown, ArrowUpRight } from "lucide-react";
import siteConfig from "../data/siteConfig.js";

export default function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__text">
          <p className="eyebrow reveal">{siteConfig.headline}</p>
          <h1 id="hero-title" className="hero__title reveal">
            {siteConfig.name}
          </h1>
          <p className="hero__intro reveal">{siteConfig.intro}</p>
          <div className="hero__actions reveal">
            <a href="#work" className="btn btn--primary">
              Explore My Work <ArrowDown size={18} aria-hidden="true" />
            </a>
            <a href="#contact" className="btn btn--link">
              Get in Touch <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* Decorative composition made only from CSS shapes (no stock photo) */}
        <div className="hero__art reveal" aria-hidden="true">
          <div className="art">
            <div className="art__circle" />
            <div className="art__arc" />
            <div className="art__block" />
            <span className="art__letter">Aa</span>
            <span className="art__tag art__tag--one">AI</span>
            <span className="art__tag art__tag--two">Design</span>
            <div className="art__lines">
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
