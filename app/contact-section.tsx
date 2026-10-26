"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import ContactForm from "./contact-form";

type ContactIconName = "email" | "phone" | "github" | "location";

function ContactIcon({ name }: { name: ContactIconName }) {
  const paths: Record<ContactIconName, ReactNode> = {
    email: <><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7 7.5 5.5L19.5 7" /></>,
    phone: <path d="M7.3 3.8h2.9l1.2 4-2 1.6a14 14 0 0 0 5.2 5.2l1.6-2 4 1.2v2.9a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 5.3 6a2 2 0 0 1 2-2.2Z" />,
    github: <><path d="M9 19.5c-4.2 1.3-4.2-2.1-5.9-2.5m11.8 5v-3.2a2.8 2.8 0 0 0-.8-2.2c2.7-.3 5.5-1.3 5.5-6.1a4.8 4.8 0 0 0-1.3-3.3 4.4 4.4 0 0 0-.1-3.3s-1-.3-3.3 1.3a11.3 11.3 0 0 0-6 0C6.6 3.6 5.6 4 5.6 4a4.4 4.4 0 0 0-.1 3.3 4.8 4.8 0 0 0-1.3 3.3c0 4.8 2.8 5.8 5.5 6.1a2.8 2.8 0 0 0-.8 2.2V22" /></>,
    location: <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.2" /></>,
  };

  return <svg className="contact-icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

export default function ContactSection() {
  const [copyState, setCopyState] = useState<"copied" | "failed" | "">("");
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  function copyWithFallback() {
    const textarea = document.createElement("textarea");
    textarea.value = "+971522489774";
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    try {
      return document.execCommand("copy");
    } catch {
      return false;
    } finally {
      textarea.remove();
    }
  }

  async function copyPhoneNumber() {
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText("+971522489774");
        copied = true;
      } else {
        copied = copyWithFallback();
      }
    } catch {
      copied = copyWithFallback();
    }

    setCopyState(copied ? "copied" : "failed");
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopyState(""), 2000);
  }

  return (
    <section className="contact-section page-gutter">
      <div className="contact-title-row" id="contact">
        <h2 className="contact-title">Contact</h2>
        <span className="contact-status">Available now</span>
      </div>
      <div className="contact-layout">
        <div className="contact-intro">
          <h3 className="contact-heading"><span>Let&apos;s build</span> <em>something.</em></h3>
          <p className="contact-description">Have a role, a project or a question? Send me a message or use any of the details below.</p>
          <div className="contact-cards">
            <a className="contact-card contact-card-link" href="mailto:sahlathasniparamban@gmail.com">
              <div className="contact-card-heading"><span className="contact-icon-wrap"><ContactIcon name="email" /></span><span className="contact-card-label">Email</span></div>
              <span className="contact-card-value">sahlathasniparamban@gmail.com</span>
            </a>
            <button className="contact-card contact-card-button" type="button" onClick={copyPhoneNumber} aria-label="Copy phone number +971 52 248 9774">
              <span className="contact-card-heading"><span className="contact-icon-wrap"><ContactIcon name="phone" /></span><span className="contact-card-label">Phone</span></span>
              <span className="contact-phone-value">
                <span className={`contact-card-value contact-phone-number${copyState ? " is-hidden" : ""}`}>+971 52 248 9774</span>
                <span className={`contact-phone-feedback${copyState ? ` is-visible is-${copyState}` : ""}`} aria-live="polite" aria-atomic="true">
                  {copyState === "copied" && <><svg aria-hidden="true" viewBox="0 0 12 12"><path d="m2 6 2.5 2.5L10 3" /></svg>Phone number copied</>}
                  {copyState === "failed" && "Copy failed"}
                </span>
              </span>
            </button>
            <a className="contact-card contact-card-link" href="https://github.com/Sahla-Thasni" target="_blank" rel="noreferrer">
              <div className="contact-card-heading"><span className="contact-icon-wrap"><ContactIcon name="github" /></span><span className="contact-card-label">GitHub</span></div>
              <span className="contact-card-value">github.com/Sahla-Thasni</span>
            </a>
            <article className="contact-card">
              <div className="contact-card-heading"><span className="contact-icon-wrap"><ContactIcon name="location" /></span><span className="contact-card-label">Location</span></div>
              <p className="contact-card-value">Dubai, UAE</p>
            </article>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}
