import type { CSSProperties } from "react";
import Image from "next/image";
import ActiveNavigation from "./active-navigation";
import ContactSection from "./contact-section";
import PortfolioFooter from "./portfolio-footer";
import { MagneticLink, MotionObserver, ProjectCard, SkillLogo } from "./portfolio-interactions";

const projects = [
  { number: "01", name: "CRM System", type: "Team project", status: "Live", description: ["Built frontend and backend functionality for the CRM detail pages, including responsive layouts and reusable UI components.", "Implemented activity management, REST APIs and CRUD operations, working with the team in Git."], tags: ["Next.js", "React.js", "TypeScript", "Material UI", "Python", "Django REST Framework", "PostgreSQL", "REST APIs", "Git"], url: "https://crm-live-project-frontend-5h5x.vercel.app/", site: "crm-live-project-frontend-5h5x.vercel.app", screenshots: ["/images/crm-2.png", "/images/crm-3.png", "/images/crm-4.png", "/images/crm-5.png", "/images/crm-6.png", "/images/crm-7.png", "/images/crm-8.png"], className: "project-card-crm" },
  { number: "02", name: "STYLE.CO", type: "Personal project", status: "E-commerce", description: ["Built a full stack e-commerce application with responsive product pages, product management, shopping cart, checkout and order history.", "Connected the React frontend to the Django API with REST endpoints and JWT authentication, and managed application state with Redux Toolkit."], tags: ["React.js", "Redux Toolkit", "Python", "Django REST Framework", "PostgreSQL", "REST APIs", "JWT"], site: "style.co � local build", screenshots: ["/images/style.co-0.png", "/images/style.co-1.png", "/images/style.co-2.png", "/images/style.co-3.png", "/images/style.co-4.png", "/images/style.co-5.png"], className: "project-card-style" },
];

type Skill = { name: string; logos: { slug: string; mark: string; color?: string }[] };
const skillGroups: { name: string; skills: Skill[] }[] = [
  { name: "Frontend", skills: [
    { name: "React.js", logos: [{ slug: "react", mark: "R" }] },
    { name: "Next.js", logos: [{ slug: "nextdotjs", mark: "N", color: "F4F6F6" }] },
    { name: "TypeScript", logos: [{ slug: "typescript", mark: "TS" }] },
    { name: "JavaScript (ES6+)", logos: [{ slug: "javascript", mark: "JS" }] },
    { name: "HTML5", logos: [{ slug: "html5", mark: "H5" }] },
    { name: "CSS3", logos: [{ slug: "css3", mark: "C3" }] },
    { name: "Bootstrap 5", logos: [{ slug: "bootstrap", mark: "B" }] },
    { name: "Tailwind CSS", logos: [{ slug: "tailwindcss", mark: "TW" }] },
    { name: "Material UI", logos: [{ slug: "mui", mark: "M" }] },
    { name: "Redux Toolkit", logos: [{ slug: "redux", mark: "RT" }] },
  ] },
  { name: "Backend", skills: [
    { name: "Python", logos: [{ slug: "python", mark: "Py", color: "3776AB" }] },
    { name: "Django", logos: [{ slug: "django", mark: "D", color: "44B78B" }] },
    { name: "Django REST Framework (DRF)", logos: [{ slug: "django", mark: "DRF", color: "44B78B" }] },
    { name: "REST API Development", logos: [{ slug: "openapiinitiative", mark: "API", color: "54D8CC" }] },
    { name: "JWT Authentication", logos: [{ slug: "jsonwebtokens", mark: "JWT", color: "F4F6F6" }] },
  ] },
  { name: "Database", skills: [
    { name: "PostgreSQL", logos: [{ slug: "postgresql", mark: "PG", color: "4169E1" }] },
    { name: "SQL", logos: [{ slug: "sqlite", mark: "SQL", color: "F4F6F6" }] },
  ] },
  { name: "Tools", skills: [
    { name: "Git", logos: [{ slug: "git", mark: "G", color: "F05032" }] },
    { name: "GitHub", logos: [{ slug: "github", mark: "GH", color: "F4F6F6" }] },
    { name: "GitLab", logos: [{ slug: "gitlab", mark: "GL", color: "FC6D26" }] },
    { name: "Postman", logos: [{ slug: "postman", mark: "P", color: "FF6C37" }] },
    { name: "VS Code", logos: [{ slug: "visualstudiocode", mark: "VS", color: "007ACC" }] },
    { name: "Figma", logos: [{ slug: "figma", mark: "F", color: "F24E1E" }] },
    { name: "Vercel", logos: [{ slug: "vercel", mark: "V", color: "F4F6F6" }] },
  ] },
];

export default function Home() {
  return <main className="portfolio-shell min-h-screen overflow-x-clip">
    <MotionObserver />
    <div className="scroll-progress" aria-hidden="true"><span /></div>
    <header className="site-header page-gutter"><a className="wordmark" href="#home" aria-label="Sahla Thasni home">SAHLA<span>_</span>THASNI</a><ActiveNavigation /></header>
    <section id="home" className="hero page-gutter">
      <div className="hero-grid">
        <p className="availability-label"><span className="availability-dot" aria-hidden="true" />Available for new opportunities</p>
        <p className="hero-name">I&apos;m Sahla Thasni</p>
        <h1 className="hero-title"><span className="hero-line-serif">Full stack</span><span className="hero-line-condensed">DEVELOPER.</span></h1>
        <p className="hero-intro">I create responsive, user-friendly web applications with clean interfaces and scalable backend solutions.</p>
        <div className="hero-actions"><MagneticLink className="button-primary" href="#projects">See projects <span aria-hidden="true">&#x2198;</span></MagneticLink><MagneticLink className="button-secondary resume-button" href="/Sahla_Thasni_Resume.pdf" download>Download Resume <span aria-hidden="true">&#x2193;</span></MagneticLink><MagneticLink className="button-secondary" href="#contact">Contact me <span aria-hidden="true">&#x2197;</span></MagneticLink></div>
      </div>
      <div className="hero-bottomline mono-label"><span>React &#xB7; Next.js &#xB7; TypeScript &#xB7; Django &#xB7; PostgreSQL</span></div>
    </section>
    <section className="content-section about-section page-gutter reveal">
      <div id="about" className="about-heading"><h2>About</h2><span className="section-kicker">Hello</span></div>
      <div className="about-grid">
        <div className="portrait-frame-wrap"><div className="portrait-frame"><Image className="portrait-photo" src="/images/sahla.png" alt="Sahla Thasni, full stack developer" width={1086} height={1448} sizes="(max-width: 760px) min(calc(100vw - 48px), 360px), 360px" /><span className="portrait-caption">Sahla Thasni</span></div></div>
        <div className="about-copy">
          <p>I&apos;m a full stack developer passionate about building modern, user-friendly web applications using React, Next.js, TypeScript, Django REST Framework, and PostgreSQL.</p>
          <p>I contributed to a live CRM project with a team and built my own e-commerce application, which taught me responsive web development, connecting a frontend to an API, and relational database design. I&apos;m looking for a role where I can work on real software and keep growing.</p>
          <div className="facts-grid"><div><span>BASED IN</span><p>Dubai, UAE</p></div><div><span>EDUCATION</span><p>MSc Computer Science</p></div><div><span>TRAINING</span><p>Upcode Software Labs</p></div><div><span>SPECIALIZATION</span><p>Full Stack Development</p></div></div>
        </div>
      </div>
    </section>
    <section className="content-section projects-section page-gutter"><div id="projects" className="projects-heading reveal"><h2>Projects</h2><p>Selected work</p></div><div className="projects-grid">{projects.map((project) => <ProjectCard key={project.number} project={project} />)}</div></section>
    <section className="content-section skills-section page-gutter"><div id="skills" className="skills-heading reveal"><h2>Skills</h2><span>stack</span></div><div className="skills-grid">{skillGroups.map((group, index) => <div className="skill-column reveal" key={group.name} style={{ "--column-index": index } as CSSProperties}><h3>{group.name}<span className="skill-underline" /></h3><ul>{group.skills.map((skill) => <li className="skill-row" key={skill.name}>{skill.logos.map((logo) => <SkillLogo color={logo.color} fallback={logo.mark} key={logo.slug} name={skill.name} slug={logo.slug} />)}<span>{skill.name}</span></li>)}</ul></div>)}</div></section>
    <section id="training" className="content-section journey-section page-gutter"><div className="journey-grid"><div className="journey-column reveal"><h2>Training</h2><article className="journey-row"><span className="journey-date">11/2025 – 09/2026</span><div className="journey-content"><h3>AI Powered Full-Stack Development</h3><p>Upcode Software Labs</p><p className="journey-description">Training in frontend and backend development using React, Next.js, Python, Django, REST APIs, and PostgreSQL.</p></div></article></div><div className="journey-column education-column reveal"><h2>Education</h2><article className="journey-row"><span className="journey-date">2014 – 2016</span><div className="journey-content"><h3>MSc in Computer Science</h3><p>Farook College, Calicut · University of Calicut, India</p></div></article><article className="journey-row"><span className="journey-date">2011 – 2014</span><div className="journey-content"><h3>BSc in Computer Science</h3><p>KAHM Unity Women&apos;s College, Malappuram · University of Calicut, India</p></div></article></div></div></section>
    <ContactSection />
    <PortfolioFooter />
  </main>;
}

