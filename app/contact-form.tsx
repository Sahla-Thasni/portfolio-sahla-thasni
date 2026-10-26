"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message", string>>;

export default function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showDeliveryNotice, setShowDeliveryNotice] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const nextErrors: FieldErrors = {};
    const name = String(values.get("name") ?? "").trim();
    const email = String(values.get("email") ?? "").trim();
    const subject = String(values.get("subject") ?? "").trim();
    const message = String(values.get("message") ?? "").trim();

    if (!name) nextErrors.name = "Please enter your name.";
    if (!email) nextErrors.email = "Please enter your email address.";
    else if (!form.elements.namedItem("email") || !(form.elements.namedItem("email") as HTMLInputElement).validity.valid) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!subject) nextErrors.subject = "Please enter a subject.";
    if (!message) nextErrors.message = "Please enter a message.";

    setErrors(nextErrors);
    setShowDeliveryNotice(Object.keys(nextErrors).length === 0);
  }

  function clearFieldError(field: keyof FieldErrors) {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setShowDeliveryNotice(false);
  }

  return (
    <div className="contact-form-panel">
      <h3 className="contact-form-title">Send a message</h3>
      <span className="contact-form-accent" aria-hidden="true" />
      <form className="contact-form" noValidate onSubmit={handleSubmit}>
        <div className="contact-form-fields">
          <label className="contact-field">
            <span>Name</span>
            <input autoComplete="name" name="name" placeholder="Your name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "contact-name-error" : undefined} onChange={() => clearFieldError("name")} />
            {errors.name && <span className="contact-field-error" id="contact-name-error">{errors.name}</span>}
          </label>
          <label className="contact-field">
            <span>Your Email</span>
            <input autoComplete="email" name="email" type="email" placeholder="you@example.com" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "contact-email-error" : undefined} onChange={() => clearFieldError("email")} />
            {errors.email && <span className="contact-field-error" id="contact-email-error">{errors.email}</span>}
          </label>
          <label className="contact-field contact-field-full">
            <span>Subject</span>
            <input name="subject" placeholder="What would you like to discuss?" required aria-invalid={Boolean(errors.subject)} aria-describedby={errors.subject ? "contact-subject-error" : undefined} onChange={() => clearFieldError("subject")} />
            {errors.subject && <span className="contact-field-error" id="contact-subject-error">{errors.subject}</span>}
          </label>
          <label className="contact-field contact-field-full">
            <span>Message</span>
            <textarea name="message" placeholder="Tell me a little about it..." rows={5} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "contact-message-error" : undefined} onChange={() => clearFieldError("message")} />
            {errors.message && <span className="contact-field-error" id="contact-message-error">{errors.message}</span>}
          </label>
        </div>
        <button className="contact-submit" type="submit">
          <span>Send Message</span>
          <svg aria-hidden="true" viewBox="0 0 20 20" fill="none"><path d="m17 3-6.5 14-2.2-5.3L3 9.5 17 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="m8.3 11.7 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </button>
        {Object.keys(errors).length > 0 && <p className="contact-form-status contact-form-error" role="alert">Please correct the highlighted fields.</p>}
        {showDeliveryNotice && <p className="contact-form-status" role="status">Email delivery isn’t configured yet. Please contact me directly using the email card.</p>}
      </form>
    </div>
  );
}
