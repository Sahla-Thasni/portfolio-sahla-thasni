"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent, type ReactNode } from "react";

const terminalLines = ["GET /api/projects/ â†’ 200 OK Â· 3 projects", "POST /api/token/ â†’ 200 OK Â· JWT issued", "SELECT * FROM orders; â†’ order history loaded", "git push origin main â†’ deployed on Vercel"];

export function HeroTerminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [output, setOutput] = useState(terminalLines[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setLineIndex((index) => (index + 1) % terminalLines.length), 3400);
    return () => window.clearInterval(timer);
  }, []);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const line = terminalLines[lineIndex];
    let position = 0;
    let timer = 0;
    const delay = window.setTimeout(() => {
      setOutput("");
      timer = window.setInterval(() => {
        position += 1;
        setOutput(line.slice(0, position));
        if (position >= line.length) window.clearInterval(timer);
      }, 24);
    }, 0);
    return () => { window.clearTimeout(delay); window.clearInterval(timer); };
  }, [lineIndex]);
  return <div className="hero-terminal" aria-label="Terminal activity"><span className="terminal-prompt">$</span><span key={lineIndex} className="terminal-line">{output}</span><span className="terminal-cursor" aria-hidden="true">â–‹</span></div>;
}

export function CursorGlow() {
  useEffect(() => {
    if (window.matchMedia("(hover: none), (prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const move = (event: globalThis.PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
        document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
        frame = 0;
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => { window.removeEventListener("pointermove", move); if (frame) window.cancelAnimationFrame(frame); };
  }, []);
  return <div className="cursor-glow" aria-hidden="true" />;
}

export function DubaiClock() {
  const [time, setTime] = useState("DUBAI TIME");
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Dubai", hour: "2-digit", minute: "2-digit", hour12: false });
    const update = () => setTime(formatter.format(new Date()));
    update();
    const interval = window.setInterval(update, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  return <time className="dubai-clock" aria-label={`Dubai local time ${time}`}>{time}</time>;
}

export function MotionObserver() {
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-inview"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-inview"); observer.unobserve(entry.target); }
    }), { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);
  return null;
}

export function SkillLogo({ name, slug, fallback, color }: { name: string; slug: string; fallback: string; color?: string }) {
  const [unavailable, setUnavailable] = useState(false);

  return (
    <span aria-hidden="true" className="skill-logo">
      {unavailable ? (
        <span className="skill-logo-fallback">{fallback}</span>
      ) : (
        <img alt="" loading="lazy" onError={() => setUnavailable(true)} src={`https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`} title={`${name} logo`} />
      )}
    </span>
  );
}

type MagneticLinkProps = { href?: string; className?: string; children?: ReactNode; external?: boolean; download?: boolean; asButton?: boolean; value?: string; buttonLabel?: string };
export function MagneticLink({ href, className = "", children, external = false, download = false, asButton = false, value, buttonLabel }: MagneticLinkProps) {
  const [copied, setCopied] = useState(false);
  const resetCopy = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(resetCopy.current), []);
  const moveTowardPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
    const y = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
    event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };
  const resetMagnet = (event: MouseEvent<HTMLElement>) => { event.currentTarget.style.transform = ""; };
  if (asButton) return <button className="copy-button" type="button" onPointerMove={moveTowardPointer} onPointerLeave={resetMagnet} onClick={async () => {
    if (!value) return;
    try { await navigator.clipboard.writeText(value); setCopied(true); window.clearTimeout(resetCopy.current); resetCopy.current = window.setTimeout(() => setCopied(false), 1600); } catch { setCopied(false); }
  }}>{copied ? "COPIED" : buttonLabel ?? "COPY"}</button>;
  return <a className={className} href={href} download={download || undefined} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} onPointerMove={moveTowardPointer} onPointerLeave={resetMagnet}>{children}</a>;
}

type Project = { number: string; name: string; type: string; status: string; description: string[]; tags: string[]; url?: string; site: string; screenshots: string[]; className: string };

function ProjectGallery({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<string[]>([]);
  const [lightbox, setLightbox] = useState(false);
  const [imageRatios, setImageRatios] = useState<Record<string, number>>({});

  const closeRef = useRef<HTMLButtonElement>(null);
  const touchStart = useRef<number | null>(null);
  const multi = project.screenshots.length > 1;
  const usesOriginalScreenshots = project.className === "project-card-style" || project.className === "project-card-crm";
  const step = useCallback((direction: number) => setActive((index) => (index + direction + project.screenshots.length) % project.screenshots.length), [project.screenshots.length]);
  const failImage = (src: string) => setFailed((items) => items.includes(src) ? items : [...items, src]);

  useEffect(() => {
    if (!lightbox) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setLightbox(false); return; }
      if (event.key === "ArrowLeft" && multi) { event.preventDefault(); step(-1); }
      if (event.key === "ArrowRight" && multi) { event.preventDefault(); step(1); }
      if (event.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(".project-lightbox button"));
        const first = focusable[0]; const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => { window.removeEventListener("keydown", onKeyDown); previousFocus?.focus(); };
  }, [lightbox, multi, step]);

  const image = (src: string, enlarged = false) => failed.includes(src)
    ? <div className={`project-image-fallback${enlarged ? " is-enlarged" : ""}`} aria-label={`${project.name} screenshot unavailable`}><span>{project.name}</span></div>
    : <Image src={usesOriginalScreenshots ? `${src}?v=8` : src} alt={`${project.name} ${enlarged ? "enlarged " : ""}screenshot ${project.screenshots.indexOf(src) + 1}`} width="1280" height="800" style={usesOriginalScreenshots ? { width: "100%", height: "100%", objectFit: "contain", objectPosition: "center" } : undefined} unoptimized={usesOriginalScreenshots} loading="lazy" onLoad={(event) => { if (!usesOriginalScreenshots || enlarged) return; const ratio = event.currentTarget.naturalWidth / event.currentTarget.naturalHeight; setImageRatios((current) => current[src] === ratio ? current : { ...current, [src]: ratio }); }} onError={() => failImage(src)} />;

  return <div className="project-gallery">
    <div className="browser-window">
      <div className="browser-bar"><span className="browser-dots" aria-hidden="true"><i /><i /><i /></span><span className="browser-address">{project.site}</span></div>
      <div className="browser-screen" style={usesOriginalScreenshots ? { aspectRatio: imageRatios[project.screenshots[active]] ?? "16 / 10" } : undefined} onTouchStart={(event) => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={(event) => { if (touchStart.current === null || !multi) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 40) step(delta < 0 ? 1 : -1); touchStart.current = null; }}>
        {project.screenshots.length ? project.screenshots.map((src, index) => <button key={src} className={`screenshot-trigger${index === active ? " is-active" : ""}`} type="button" tabIndex={index === active ? 0 : -1} aria-label={`Enlarge ${project.name} screenshot ${index + 1}`} onClick={() => setLightbox(true)} onKeyDown={(event) => { if (multi && event.key === "ArrowLeft") { event.preventDefault(); step(-1); } if (multi && event.key === "ArrowRight") { event.preventDefault(); step(1); } }}>{image(src)}</button>) : <div className="project-image-fallback" aria-label={`${project.name} screenshots not added`}><span>{project.name}</span></div>}
      </div>
    </div>
    {multi ? <div className="gallery-controls"><button type="button" className="gallery-arrow" aria-label={`Previous ${project.name} screenshot`} onClick={() => step(-1)}>‹</button><div className="gallery-dots" aria-label="Choose screenshot">{project.screenshots.map((src, index) => <button key={src} type="button" className={index === active ? "is-active" : ""} aria-label={`Show screenshot ${index + 1}`} aria-current={index === active ? "true" : undefined} onClick={() => setActive(index)} />)}</div><button type="button" className="gallery-arrow" aria-label={`Next ${project.name} screenshot`} onClick={() => step(1)}>›</button></div> : null}
    {lightbox ? createPortal(<div className="project-lightbox" role="dialog" aria-modal="true" aria-label={`${project.name} screenshots`} onMouseDown={(event) => { if (event.target === event.currentTarget) setLightbox(false); }}><button ref={closeRef} type="button" className="lightbox-close" aria-label="Close enlarged screenshot" onClick={() => setLightbox(false)}>×</button>{multi ? <button type="button" className="lightbox-arrow lightbox-prev" aria-label="Previous screenshot" onClick={() => step(-1)}>‹</button> : null}<div className="lightbox-image">{image(project.screenshots[active], true)}</div>{multi ? <button type="button" className="lightbox-arrow lightbox-next" aria-label="Next screenshot" onClick={() => step(1)}>›</button> : null}</div>, document.body) : null}
  </div>;
}

export function ProjectCard({ project }: { project: Project }) {
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    card.style.setProperty("--pointer-x", `${x * 100}%`);
    card.style.setProperty("--pointer-y", `${y * 100}%`);
    card.style.setProperty("--tilt-x", `${(0.5 - y) * 3}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 3}deg`);
  };
  const resetCard = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty("--pointer-x", "50%");
    card.style.setProperty("--pointer-y", "50%");
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };
  return <article className={`project-card ${project.className} reveal`} onPointerMove={onPointerMove} onPointerLeave={resetCard}>
    <ProjectGallery project={project} />
    <div className="project-card-content"><div className="project-card-top"><span className="project-type">{project.type}</span><span className="project-status">{project.status}</span></div><h3>{project.name}</h3><ul>{project.description.map((point) => <li key={point}>{point}</li>)}</ul><div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>{project.url ? <a className="project-link" href={project.url} target="_blank" rel="noreferrer">{project.name === "CRM System" ? "View live project" : "Open live demo"}</a> : null}</div>
  </article>;
}
