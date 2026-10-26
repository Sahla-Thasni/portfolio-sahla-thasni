"use client";

import { useEffect, useState } from "react";

const navigationItems = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Skills", id: "skills" },
  { label: "Training", id: "training" },
  { label: "Contact", id: "contact" },
];

function scrollToAnchorTarget(target: HTMLElement) {
  const headerHeight = document.querySelector<HTMLElement>(".site-header")?.getBoundingClientRect().height ?? 56;
  const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top: Math.max(0, targetTop), behavior: "auto" });
}

export default function ActiveNavigation() {
  const [activeId, setActiveId] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const updateActiveLink = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
      document.querySelector<HTMLElement>(".scroll-progress span")?.style.setProperty(
        "transform",
        `scaleX(${Math.min(1, Math.max(0, progress))})`,
      );

      const header = document.querySelector<HTMLElement>(".site-header");
      const headerBottom = header?.getBoundingClientRect().bottom ?? 56;
      const activationLine = headerBottom + 12;
      let currentId = "home";

      for (const item of navigationItems) {
        const target = document.getElementById(item.id);
        const section = target?.closest<HTMLElement>("section, footer");
        if (!section) continue;

        const bounds = section.getBoundingClientRect();
        if (bounds.top <= activationLine) {
          currentId = item.id;
        } else {
          break;
        }
      }

      if (window.scrollY <= 1) {
        currentId = "home";
      } else if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
        currentId = "contact";
      }

      setActiveId(currentId);
      document.querySelector<HTMLElement>(".hero-copy")?.style.setProperty(
        "--hero-parallax",
        `${-Math.min(window.scrollY * 0.08, 64)}px`,
      );
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        updateActiveLink();
        frame = 0;
      });
    };

    const restoreAnchorPosition = () => {
      if (!window.matchMedia("(min-width: 761px) and (max-width: 1199px)").matches) return;
      const id = decodeURIComponent(window.location.hash.slice(1));
      const target = id ? document.getElementById(id) : null;
      if (target) scrollToAnchorTarget(target);
    };

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("popstate", restoreAnchorPosition);
    updateActiveLink();

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("popstate", restoreAnchorPosition);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav aria-label="Main navigation" className={`main-nav${isMenuOpen ? " is-open" : ""}`}>
      <button
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        className="menu-toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        type="button"
      >
        <span />
        <span />
        <span />
      </button>
      <div className="nav-links" id="primary-navigation">
        {navigationItems.map((item) => (
          <a
            aria-current={activeId === item.id ? "location" : undefined}
            href={`#${item.id}`}
            key={item.id}
            onClick={(event) => {
              setIsMenuOpen(false);

              if (window.matchMedia("(min-width: 761px) and (max-width: 1199px)").matches) {
                const target = document.getElementById(item.id);

                if (target) {
                  event.preventDefault();
                  const hash = `#${item.id}`;

                  if (window.location.hash !== hash) window.history.pushState(null, "", hash);
                  scrollToAnchorTarget(target);
                }
              }
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
