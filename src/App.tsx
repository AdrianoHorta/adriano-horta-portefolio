import { useEffect, useRef, useState } from "react";
import "./App.css";
import profilePhoto from "./assets/adriano-horta.jpeg";

type Side = "editing" | "development" | null;

type Project = {
  title: string;
  category: string;
  tools: string;
  visual: string;
  image?: string;
  imageAlt?: string;
  format?: "vertical" | "horizontal";
  video?: string;
  youtubeId?: string;
  description?: string;
  githubUrl?: string;
  details?: { title: string; text: string }[];
};

const editingWork: Project[] = [
  {
    title: "Rhythm in Motion",
    category: "Video editing",
    tools: "Short-form · Color · Sound Design",
    visual: "raw-edit",
    format: "vertical",
    video: "/videos/projects/raw-vs-edited.mp4",
  },
  {
    title: "Stories in Seconds",
    category: "Video editing",
    tools: "Short-form · Motion Graphics · Sound Design",
    visual: "social",
    format: "vertical",
    video: "/videos/projects/motion-graphics-piparena.mp4",
  },
  {
    title: "A Day in the Life",
    category: "YouTube editing",
    tools: "Long-form · Storytelling · Sound Design",
    visual: "youtube-edit",
    format: "horizontal",
    youtubeId: "L6TzU1pe0CM",
  },
];

const devWork: Project[] = [
  {
    title: "Memory Game",
    category: "Academic project · Full-stack development",
    tools: "Vue 3 · Pinia · Laravel · Node.js · Socket.IO",
    visual: "memory-game",
    description:
      "A web-based memory card game developed as an academic project. Includes single-player and multiplayer modes, game lobbies and real-time card events with Socket.IO, alongside a Laravel REST API for game and transaction data.",
    githubUrl: "", // Coloca aqui o link do repositório GitHub.
  },
  {
    title: "Scientific Publications Platform",
    category: "Academic project · Full-stack development",
    tools: "Nuxt · Java / Jakarta EE · PostgreSQL · Docker · Ollama",
    visual: "dashboard",
    image: "/images/projects/Dad.png",
    imageAlt: "Interface da plataforma de gestão de publicações científicas",
    description:
      "A platform for managing scientific publications, with file uploads, tags, comments, ratings and edit history. Combines role-based access with AI-generated summaries through Ollama, backed by a Jakarta EE REST API and PostgreSQL, with a Nuxt frontend.",
    githubUrl: "https://github.com/GoncaloFidalgo/plataforma-gestao-publicacoes", // Coloca aqui o link do repositório GitHub.
  },
  {
    title: "Smart Object Localization",
    category: "Final-year project · IoT & Web development",
    tools: "Vue 3 · Leaflet · Supabase · ESP32 / Arduino · BLE",
    visual: "indoor-map",
    image: "/images/projects/IoT.png",
    imageAlt: "Interface do sistema de localização de objetos IoT",
    format: "horizontal",
    description:
      "Connecting physical objects to a digital map. A two-person final-year project that combines embedded hardware, Bluetooth signal processing and web development to help users find and manage objects inside buildings.",
    details: [
      {
        title: "From building to object",
        text: "Hierarchical map navigation connects buildings, floors, rooms and individual objects. An object inventory stores identifiers, descriptions and locations, supporting tasks such as finding equipment and maintaining assets.",
      },
      {
        title: "Hardware & positioning",
        text: "Four ESP32 beacons collect BLE signal strength readings and expose them over HTTP. The system converts RSSI measurements into distance estimates and uses trilateration and multilateration to estimate positions on a room map.",
      },
      {
        title: "Web interface & persistence",
        text: "Vue 3 and Leaflet bring together interactive maps, object search and administration views. Supabase persists the object inventory, while the interface integrates readings from the beacon firmware written for ESP32 with Arduino.",
      },
      {
        title: "Calibration & evaluation",
        text: "Dedicated tools calibrate the RSSI distance model and compare estimated positions with known locations. Error analysis, RMS metrics and CSV exports help assess positioning performance and investigate the effects of the indoor environment.",
      },
    ],
    githubUrl: "https://github.com/AdrianoHorta/frontend-PI", // Coloca aqui o link do repositório GitHub.
  },
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
      <button className="menu" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav className={open ? "open" : ""}>
        {["Editing", "Development", "About"].map((x) => (
          <a
            key={x}
            href={"#" + x.toLowerCase()}
            onClick={() => setOpen(false)}
          >
            {x}
          </a>
        ))}
        <a className="nav-cta" href="#contact">
          Let's talk
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

type ProjectGalleryProps = {
  projects: Project[];
  label: string;
  title: string;
  description: string;
};

function ProjectGallery({
  projects,
  label,
  title,
  description,
}: ProjectGalleryProps) {
  return (
    <div className="discipline-projects">
      <div className="project-gallery-heading reveal">
        <div className="project-gallery-meta">
          <small>{label}</small>
          <small>
            {String(projects.length).padStart(2, "0")} selected projects
          </small>
        </div>
        <div className="project-gallery-title">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      <div className="projects">
        {projects.map((project, index) => (
          <article
            className={`project project-${project.format ?? "default"} reveal`}
            key={project.title}
          >
            <div className={`project-art ${project.visual}${project.image ? " project-screenshot" : ""}`}>
              <small>{String(index + 1).padStart(2, "0")}</small>
              {project.youtubeId ? (
                <iframe
                  className="project-youtube"
                  src={`https://www.youtube-nocookie.com/embed/${project.youtubeId}`}
                  title="POV: um dia realista na vida de um trader e empreendedor (segunda-feira)"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : project.video ? (
                <video
                  className="project-video"
                  src={project.video}
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
              ) : project.image ? (
                <img
                  className="project-image"
                  src={project.image}
                  alt={project.imageAlt ?? project.title}
                  loading="lazy"
                />
              ) : project.visual === "memory-game" ? (
                <div className="memory-cards" aria-hidden="true">
                  {["♠", "?", "♦", "?", "?", "♦", "?", "♠"].map((symbol, cardIndex) => (
                    <span key={cardIndex} className={symbol === "?" ? "face-down" : ""}>
                      {symbol}
                    </span>
                  ))}
                </div>
              ) : (
                <div />
              )}
            </div>
            <footer>
              <span>
                <small>{project.category}</small>
                <h3>{project.title}</h3>
              </span>
              <p>{project.tools}</p>
            </footer>
            {project.description && (
              <p className="project-description">{project.description}</p>
            )}
            {project.details && (
              <div className="project-details">
                {project.details.map((detail) => (
                  <section key={detail.title}>
                    <h4>{detail.title}</h4>
                    <p>{detail.text}</p>
                  </section>
                ))}
              </div>
            )}
            {/*{project.githubUrl && (
              <a className="project-link" href={project.githubUrl} target="_blank" rel="noreferrer">
                View on GitHub <Arrow />
              </a>
            )}*/}
          </article>
        ))}
      </div>
    </div>
  );
}

function EditingWork() {
  return (
    <ProjectGallery
      projects={editingWork}
      label="Editing portfolio"
      title="Selected cuts"
      description="A closer look at pacing, storytelling and visual craft."
    />
  );
}

function DevWork() {
  return (
    <ProjectGallery
      projects={devWork}
      label="Development portfolio"
      title="Selected Projects"
      description="Products and systems designed around real problems."
    />
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
          num={edit ? "01" : "02"}
          label={edit ? "Video editing" : "Software development"}
          title={
            edit
              ? "Stories, shaped frame by frame."
              : "Ideas, built to work\u00a0beautifully."
          }
        />
        <div className="discipline-grid reveal">
          {edit && (
            <div className="feature-art">
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
            </div>
          )}
          <div className="discipline-copy">
            <p>
              {edit
                ? "From the first cut to the final grade, I create edits with intention, balancing pace, sound and visual detail."
                : "I turn real problems into clear, maintainable digital products, from thoughtful interfaces to the systems behind them."}
            </p>
            <ul>
              {items.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <div className="discipline-actions">
              <a href="#contact">
                {edit ? "Discuss a video" : "Discuss an opportunity"} <Arrow />
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
        {edit ? <EditingWork /> : <DevWork />}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="shell skills">
      <Intro
        num="03"
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
      <small>04 / About Me</small>
      <div className="portrait">
        <img src={profilePhoto} alt="Adriano Horta sorrindo" />
        <span>Based in Portugal</span>
      </div>
      <div className="about-content">
        <h2>
          I bring the same curiosity to <em>stories</em> and <em>software.</em>
        </h2>
        <p className="about-lead">
          I'm Adriano Horta, a Video Editor and Software Developer based in
          Portugal. I enjoy taking raw material — whether footage or an idea —
          and shaping it into something clear, purposeful and engaging.
        </p>
        <p className="about-detail">
          My work is driven by curiosity, attention to detail and a practical
          approach to solving problems. I'm currently building my path in two
          distinct directions.
        </p>
        <div className="cv-actions" aria-label="Download curriculum vitae">
          <a href="/cv/adriano-horta-cv-pt.pdf" download>
            CV Português <span aria-hidden="true">↓</span>
          </a>
          <a href="/cv/adriano-horta-cv-en.pdf" download>
            CV English <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <div className="career-paths">
        <article className="career-path career-editing">
          <div className="career-path-meta">
            <small>01 / Video editing</small>
            <span>Available for freelance</span>
          </div>
          <h3>Freelance editing</h3>
          <p>
            I work with creators, brands and teams on short-form and long-form
            content, shaping pacing, sound and visuals around each story.
          </p>
          <a href="mailto:adriano_horta@hotmail.com?subject=Freelance%20video%20editing%20project">
            Discuss an editing project <Arrow />
          </a>
        </article>
        <article className="career-path career-development">
          <div className="career-path-meta">
            <small>02 / Software development</small>
            <span>Open to company roles</span>
          </div>
          <h3>Join a software team</h3>
          <p>
            On the development side, I'm looking to join a company as part of a
            software team, where I can contribute, learn and grow — rather than
            take on freelance development projects.
          </p>
          <a href="mailto:adriano_horta@hotmail.com?subject=Software%20development%20opportunity">
            Discuss a software role <Arrow />
          </a>
        </article>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="contact">
      <div className="shell">
        <small>Have an editing project or a software role in mind?</small>
        <h2 className="contact-title">
          <a
            className="contact-orb"
            href="mailto:adriano_horta@hotmail.com"
            aria-label="Let's work together — get in touch"
          >
            <svg viewBox="0 0 320 320" aria-hidden="true">
              <defs>
                <path id="contact-arc-top" d="M 65 158 A 95 95 0 0 1 255 158" />
                <path id="contact-arc-bottom" d="M 65 174 A 95 95 0 0 0 255 174" />
              </defs>
              <text className="arc-top">
                <textPath href="#contact-arc-top" startOffset="50%">
                  Let's work
                </textPath>
              </text>
              <text className="arc-bottom">
                <textPath href="#contact-arc-bottom" startOffset="50%">
                  together.
                </textPath>
              </text>
            </svg>
            <span className="orb-core">
              <span>Get in touch ↗</span>
            </span>
          </a>
        </h2>
        <div className="footer-row">
          <span>Adriano Horta © 2026</span>
          <p>
            <a
              href="https://www.linkedin.com/in/adriano-horta-732405271/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://www.behance.net/adrianohortaa"
              target="_blank"
              rel="noreferrer"
            >
              Behance
            </a>
            <a
              href="https://www.instagram.com/xhortz/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
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
       {/* <section className="dual-focus reveal" aria-label="Creative focus">
          <p>
            Two disciplines, <em>one focus:</em>
            <br />
            <h1>creating work that connects and performs.</h1>
          </p>
        </section>*/}
        <Discipline type="editing" />
        <Discipline type="development" />
        <Skills />
        <About />
      </main>
      <Contact />
    </>
  );
}
