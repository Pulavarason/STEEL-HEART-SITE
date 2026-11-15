"use client";

import Image from "next/image";
import type { FormEvent } from "react";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { nav, site } from "@/config/site";

const isPlaceholder = (href: string) => !href;

export function Footer() {
  const year = new Date().getFullYear();
  const { contact } = site;

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");
    const referral = String(form.get("referral") ?? "");
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nHow they heard about us: ${referral || "Not specified"}\n\n${message}`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }

  return (
    <footer id="contact" className="relative border-t border-[var(--line-strong)] bg-[var(--bg)]">
      {/* red hairline signature */}
      <span aria-hidden="true" className="absolute left-0 top-[-1px] h-[2px] w-24 bg-[var(--sh-red)]" />
      <div className="wrap py-16 lg:py-24">
        <section aria-labelledby="contact-form-title" className="mb-16 border-b border-[var(--line)] pb-12 lg:mb-20 lg:pb-16">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow mb-4">Get in touch</p>
              <h2 id="contact-form-title" className="f-display text-4xl uppercase leading-none sm:text-5xl">Let&apos;s get to work.</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--fg-muted)]">
                Tell us what you&apos;re working toward and we&apos;ll help you find your next step.
              </p>
            </div>
            <form onSubmit={handleContactSubmit} className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
              <label className="f-head text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                Name
                <input required name="name" autoComplete="name" className="mt-2 block w-full border border-[var(--line-strong)] bg-transparent px-4 py-3 text-sm normal-case tracking-normal text-[var(--fg)] outline-none transition-colors focus:border-[var(--sh-red)]" />
              </label>
              <label className="f-head text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)]">
                Email
                <input required type="email" name="email" autoComplete="email" className="mt-2 block w-full border border-[var(--line-strong)] bg-transparent px-4 py-3 text-sm normal-case tracking-normal text-[var(--fg)] outline-none transition-colors focus:border-[var(--sh-red)]" />
              </label>
              <label className="f-head text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)] sm:col-span-2">
                How did you hear about us?
                <select name="referral" defaultValue="" className="mt-2 block w-full border border-[var(--line-strong)] bg-[var(--bg)] px-4 py-3 text-sm normal-case tracking-normal text-[var(--fg)] outline-none transition-colors focus:border-[var(--sh-red)]">
                  <option value="">Choose an option (optional)</option>
                  <option>Friend or family referral</option>
                  <option>Instagram or social media</option>
                  <option>Google or online search</option>
                  <option>Walked by the studio</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="f-head text-xs uppercase tracking-[0.16em] text-[var(--fg-muted)] sm:col-span-2">
                How can we help?
                <textarea required name="message" rows={4} className="mt-2 block w-full resize-y border border-[var(--line-strong)] bg-transparent px-4 py-3 text-sm normal-case tracking-normal text-[var(--fg)] outline-none transition-colors focus:border-[var(--sh-red)]" />
              </label>
              <div className="sm:col-span-2">
                <button type="submit" className="btn btn-solid">Send enquiry <span aria-hidden="true">↗</span></button>
                <p className="mt-3 text-xs text-[var(--fg-faint)]">Opens your email app to send the message.</p>
              </div>
            </form>
          </div>
        </section>

        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <a href="#home" aria-label={`${site.fullName}, back to top`} className="inline-flex items-center gap-4">
              <Image src="/brand/steel-heart-logo.png" alt={`${site.fullName} logo`} width={96} height={96} className="h-20 w-20" />
              <span className="f-display text-3xl tracking-[0.06em]">
                STEEL <span className="text-red-accent">HEART</span>
                <span className="eyebrow mt-1 block !text-[0.6rem]">Fitness Studio</span>
              </span>
            </a>
            <p className="f-serif mt-8 max-w-xs text-2xl leading-snug text-[var(--fg-muted)]">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <p className="eyebrow mb-5">Navigate</p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.href}
                    className="f-display text-xl text-[var(--fg-muted)] transition-colors hover:text-[var(--sh-red)]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic lg:col-span-4">
            <p className="eyebrow mb-5">Enquiries &amp; Studio</p>
            <ul className="f-head space-y-4 text-sm text-[var(--fg-muted)]">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--sh-red)]" />
                <span>
                  {contact.address.map((l) => (
                    <span key={l} className="block">{l}</span>
                  ))}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-[var(--sh-red)]" />
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="hover:text-[var(--fg)]">{contact.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--sh-red)]" />
                <a href={`mailto:${contact.email}`} className="hover:text-[var(--fg)]">{contact.email}</a>
              </li>
              <li className="flex gap-3">
                <Clock size={16} className="mt-0.5 shrink-0 text-[var(--sh-red)]" />
                <span>{contact.hours}</span>
              </li>
            </ul>
            <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[var(--fg-faint)]">
              Contact details are placeholders until confirmed
            </p>
          </address>

          <div className="lg:col-span-2">
            <p className="eyebrow mb-5">Follow</p>
            <ul className="space-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  {isPlaceholder(s.href) ? (
                    <span className="f-head text-sm text-[var(--fg-faint)]" title="Link to be added">
                      {s.label}
                    </span>
                  ) : (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="f-head text-sm text-[var(--fg-muted)] hover:text-[var(--sh-red)]"
                    >
                      {s.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>



        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-[var(--line)] pt-6 text-[0.7rem] uppercase tracking-[0.2em] text-[var(--fg-faint)] sm:flex-row">
          <p>© {year} {site.fullName}. All rights reserved.</p>
          <a href="#home" className="hover:text-[var(--sh-red)]">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
