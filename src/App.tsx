import { useEffect, useRef, useState } from "react";
import "./App.css";
import profilePhoto from "./assets/adriano-horta.jpeg";

type Side = "editing" | "development" | null;
const work = [
  [
    "01",
    "Rhythm in Motion",
    "Video editing",
    "Premiere Pro · Color · Sound Design",
    "raw-edit",
    "/videos/projects/raw-vs-edited.mp4",
  ],
  ["02", "Frame / Studio", "Development", "React · TypeScript", "interface"],
  [
    "03",
    "Stories in Seconds",
    "Video editing",
    "Long-from · Short-form · Motion graphics · Sound design",
    "social",
  ],
  ["04", "Atlas Dashboard", "Development", "Vue · Supabase", "dashboard"],
];
const editSkills = [
  "Premiere Pro",
  "After Effects",
  "Photoshop",
  "Motion Graphics",
  "Sound Design",
  "Color Correction",
];
const devSkills = [
  "JavaScript",
  "TypeScript",
  "React",
  "Vue / Nuxt",
  "Laravel",
  "Java",
  "Python",
  "SQL",
  "Docker",
];
const Arrow = () => <span aria-hidden="true">↗</span>;

function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="navbar">
      <a className="brand" href="#top">
        <b>AH</b>
        <span>Adriano Horta</span>
      </a>
      <button className="menu" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav className={open ? "open" : ""}>
        {["Work", "Editing", "Development", "About"].map((x) => (
          <a
            key={x}
            href={"#" + x.toLowerCase()}
            onClick={() => setOpen(false)}
          >
            {x}
          </a>
        ))}
        <a className="nav-cta" href="#contact">
          Let's talk <Arrow />
        </a>
      </nav>
    </header>
  );
}

function HeroPanel({
  side,
  setActive,
}: {
  side: Exclude<Side, null>;
  setActive: (s: Side) => void;
}) {
  const edit = side === "editing";
  return (
    <a
      href={"#" + side}
      className={"hero-panel " + side}
      onMouseEnter={() => setActive(side)}
      onFocus={() => setActive(side)}
    >
      <div className="hero-art">
        {edit ? (
          <>
            <div className="frame">REC&nbsp; 00:00:08:12</div>
            <i className="play">▶</i>
            <div className="timeline" />
          </>
        ) : (
          <>
            <div className="grid" />
            <div className="code">
              ●<br />
              <br />
              &lt;create&gt;
              <br />
              &nbsp; ideas: true,
              <br />
              &nbsp; detail: “always”
              <br />
              &lt;/create&gt;
            </div>
          </>
        )}
      </div>
      <div className="hero-copy">
        <small>{edit ? "01 / The craft" : "02 / The build"}</small>
        <h1>
          {edit ? (
            <>
              Video
              <br />
              Editing
            </>
          ) : (
            <>
              Software
              <br />
              Development
            </>
          )}
        </h1>
        <p>
          {edit
            ? "Crafting rhythm, emotion and stories that stay with you."
            : "Building purposeful digital experiences from idea to interface."}
        </p>
        <b>
          Explore {edit ? "editing" : "development"} <Arrow />
        </b>
      </div>
    </a>
  );
}

function Hero() {
  const [active, setActive] = useState<Side>(null);
  return (
    <section
      id="top"
      className={"hero " + (active || "")}
      onMouseLeave={() => setActive(null)}
    >
      <div className="identity">
        <img src={profilePhoto} alt="Adriano Horta" />
        <div>
          <b>Adriano Horta</b>
          <span className="identity-roles">
            <span>Video Editor</span>
            <i />
            <span>Software Developer</span>
          </span>
        </div>
      </div>
      <HeroPanel side="editing" setActive={setActive} />
      <div className="divider">
        <i />
      </div>
      <HeroPanel side="development" setActive={setActive} />
      <div className="scroll">— &nbsp; Scroll to explore</div>
    </section>
  );
}

function Intro({
  num,
  label,
  title,
  copy,
}: {
  num: string;
  label: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="intro reveal">
      <small>
        {num}&nbsp;&nbsp;&nbsp; {label}
      </small>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  );
}

function Featured() {
  return (
    <section id="work" className="shell section">
      <Intro
        num="01"
        label="Selected projects"
        title="Featured work"
        copy="Moving images and digital products — built with equal care for story and function."
      />
      <div className="projects">
        {work.map(([num, title, type, tools, visual, video]) => (
          <article className="project reveal" key={title}>
            <div className={"project-art " + visual}>
              <small>{num}</small>
              {video ? (
                <video
                  className="project-video"
                  src={video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  controls
                  onMouseEnter={(event) => event.currentTarget.play()}
                  onMouseLeave={(event) => event.currentTarget.pause()}
                >
                  O teu navegador não suporta reprodução de vídeo.
                </video>
              ) : (
                <div />
              )}
              <button aria-label={"View " + title}>
                <Arrow />
              </button>
            </div>
            <footer>
              <span>
                <small>{type}</small>
                <h3>{title}</h3>
              </span>
              <p>{tools}</p>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}

function Discipline({ type }: { type: "editing" | "development" }) {
  const reelRef = useRef<HTMLVideoElement>(null);
  const [reelPlaying, setReelPlaying] = useState(false);
  const edit = type === "editing",
    items = edit
      ? [
          "Short-form content",
          "YouTube editing",
          "Motion graphics",
          "Sound design",
        ]
      : ["Web applications", "REST APIs", "Product interfaces", "IoT projects"];
  return (
    <section id={type} className={"discipline " + type}>
      <div className="shell">
        <Intro
          num={edit ? "02" : "03"}
          label={edit ? "Video editing" : "Software development"}
          title={
            edit
              ? "Stories, shaped frame by frame."
              : "Ideas, built to work beautifully."
          }
        />
        <div className="discipline-grid reveal">
          <div className="feature-art">
            {edit ? (
              <>
                <video
                  ref={reelRef}
                  className="reel"
                  src="/videos/showreel-2025.mp4"
                  preload="metadata"
                  playsInline
                  controls={reelPlaying}
                  onPlay={() => setReelPlaying(true)}
                  onPause={() => setReelPlaying(false)}
                  onEnded={() => setReelPlaying(false)}
                >
                  O teu navegador não suporta reprodução de vídeo.
                </video>
                {!reelPlaying && (
                  <button
                    type="button"
                    aria-label="Play showreel"
                    onClick={() => reelRef.current?.play()}
                  >
                    ▶
                  </button>
                )}
                <b>Showreel</b>
                <small>00:30</small>
              </>
            ) : (
              <>
                <div className="browser">
                  <header>● ● ●</header>
                  <main>
                    <aside />
                    <div>
                      <i />
                      <i />
                      <section />
                    </div>
                  </main>
                </div>
                <b>Selected interface</b>
              </>
            )}
          </div>
          <div className="discipline-copy">
            <p>
              {edit
                ? "From the first cut to the final grade, I create edits with intention — balancing pace, sound and visual detail."
                : "I turn real problems into clear, maintainable digital products — from thoughtful interfaces to the systems behind them."}
            </p>
            <ul>
              {items.map((x) => (
                <li key={x}>
                  {x}
                  <Arrow />
                </li>
              ))}
            </ul>
            <div className="discipline-actions">
              <a href="#contact">
                Discuss a {edit ? "video" : "project"} <Arrow />
              </a>
              <a
                href={
                  edit
                    ? "https://www.behance.net/adrianohortaa"
                    : "https://www.linkedin.com/in/adriano-horta-732405271/"
                }
                target="_blank"
                rel="noreferrer"
              >
                View on {edit ? "Behance" : "LinkedIn"} <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="shell skills">
      <Intro
        num="04"
        label="Tools & capabilities"
        title="Two disciplines. One mindset."
      />
      <div className="skill-grid reveal">
        {[
          ["Video editing", editSkills],
          ["Development", devSkills],
        ].map(([title, items]) => (
          <div key={title as string}>
            <small>{title as string}</small>
            <p>
              {(items as string[]).map((x) => (
                <span key={x}>{x}</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="shell about reveal">
      <small>05 / About</small>
      <div className="portrait">
        <img src={profilePhoto} alt="Adriano Horta sorrindo" />
        <span>Based in Portugal</span>
      </div>
      <div>
        <h2>
          I work at the intersection of <em>storytelling, design</em> and{" "}
          <em>technology.</em>
        </h2>
        <p>
          Adriano Horta is a Video Editor and Software Developer based in
          Portugal. Available for freelance editing projects and software
          opportunities.
        </p>
        <a href="#contact">
          More about me <Arrow />
        </a>
        <div className="cv-actions" aria-label="Download curriculum vitae">
          <a href="/cv/adriano-horta-cv-pt.pdf" download>
            CV Português <span aria-hidden="true">↓</span>
          </a>
          <a href="/cv/adriano-horta-cv-en.pdf" download>
            CV English <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="contact">
      <div className="shell">
        <small>Have a project in mind?</small>
        <h2>
          Let's work
          <br />
          <em>together.</em>
        </h2>
        <a href="mailto:hello@adrianohorta.com">
          Get in touch <Arrow />
        </a>
        <div className="footer-row">
          <span>Adriano Horta © 2026</span>
          <p>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
            <a href="#">Instagram</a>
          </p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const o = new IntersectionObserver(
      (es) =>
        es.forEach(
          (e) => e.isIntersecting && e.target.classList.add("visible"),
        ),
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((e) => o.observe(e));
    return () => o.disconnect();
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Featured />
        <Discipline type="editing" />
        <Discipline type="development" />
        <Skills />
        <About />
      </main>
      <Contact />
    </>
  );
}
