"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Linkedin,
  Trophy,
  Github,
  Building2,
  Instagram,
} from "lucide-react";
import { FAQAccordion, type FAQItem } from "@/components/ui/FAQAccordion";
import { sanitizeString } from "@/lib/sanitize";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100)
    .transform((s) => sanitizeString(s, 100)),
  email: z.string().email("Invalid email").transform((s) => s.trim().toLowerCase()),
  subject: z.enum(["general", "collaboration", "sponsorship", "join", "press"]),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000)
    .transform((s) => sanitizeString(s, 2000)),
});

type FormData = z.infer<typeof schema>;

const SUBJECT_OPTIONS: { value: FormData["subject"]; label: string }[] = [
  { value: "general", label: "General" },
  { value: "collaboration", label: "Collaboration" },
  { value: "sponsorship", label: "Sponsorship" },
  { value: "join", label: "Join the Club" },
  { value: "press", label: "Press" },
];

const SOCIAL_LINKS = [
  { href: "https://github.com/EMSIxploit-Club", label: "GitHub", icon: Github },
  { href: "https://ctftime.org/team/414843", label: "CTFtime", icon: Trophy },
  { href: "https://www.linkedin.com/in/emsixploit-cyber-security-club-513079371/", label: "LinkedIn", icon: Linkedin },
  { href: "https://www.instagram.com/emsixploit/", label: "Instagram", icon: Instagram },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "How do I join the club?",
    answer:
      "Fill out the contact form with subject ‘Join the Club’ or come to one of our weekly meetups. We welcome all skill levels from beginners to experienced practitioners.",
  },
  {
    question: "Do I need experience in cybersecurity?",
    answer:
      "No. We run beginner-friendly workshops and CTF prep sessions. Many members started with no prior security experience.",
  },
  {
    question: "How can my company collaborate or sponsor?",
    answer:
      "Select ‘Collaboration’ or ‘Sponsorship’ in the form and describe your interest. We’re open to talks, workshops, and event partnerships.",
  },
  {
    question: "When and where do you meet?",
    answer:
      "Check the News & Events page for the latest meetup schedule and locations. We also coordinate online via Discord.",
  },
];

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { subject: "general" },
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Something went wrong.");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-[0.75rem] border border-[var(--glass-border)] bg-[var(--glass-bg)] px-4 py-3 text-[var(--text-primary)] placeholder:text-[var(--text-muted)] backdrop-blur-[20px] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:shadow-[0_0_0_2px_rgba(36,233,46,0.5)]";
  const errorBorder = "border-red-500/50 focus:ring-red-500/50";

  return (
    <>
      <section className="px-6 py-[8rem] sm:px-8 md:px-10" data-animated-section>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)] sm:text-5xl">
            Get in Touch
          </h1>
          <p className="mt-4 leading-[1.7] text-[var(--text-muted)]">
            Enquiries, collaborations, sponsorships, or want to join? We’d love to hear from you.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-8 md:px-10">
        <section className="mb-16" data-animated-section>
          <div className="glass-card mx-auto max-w-2xl p-8 sm:p-10">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                    Name
                  </label>
                  <input
                    id="name"
                    {...register("name")}
                    className={`${inputClass} ${errors.name ? errorBorder : ""}`}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    className={`${inputClass} ${errors.email ? errorBorder : ""}`}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Subject
                </label>
                <select
                  id="subject"
                  {...register("subject")}
                  className={`${inputClass} ${errors.subject ? errorBorder : ""}`}
                >
                  {SUBJECT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-[var(--text-primary)]">
                  Message
                </label>
                <textarea
                  id="message"
                  {...register("message")}
                  rows={5}
                  className={`${inputClass} resize-y ${errors.message ? errorBorder : ""}`}
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-[1rem] bg-[var(--accent)]/10 px-4 py-3 text-[var(--accent)]"
                  >
                    <CheckCircle className="h-5 w-5 shrink-0" />
                    <span>Message sent. We’ll get back to you soon.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 rounded-[1rem] bg-red-500/10 px-4 py-3 text-red-400"
                  >
                    <AlertCircle className="h-5 w-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent-dim)] px-6 py-3 font-semibold text-[#040a06] transition-opacity duration-[0.4s] hover:opacity-90 disabled:opacity-70 sm:w-auto"
              >
                {status === "loading" ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send message
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

        <section className="mb-16" data-animated-section>
          <a
            href="mailto:support@emsixploit.com"
            className="block glass-card p-8 transition-[transform,box-shadow] duration-[0.4s] hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(36,233,46,0.2)] sm:p-10"
          >
            <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
              Interested in collaborating?
            </h2>
            <p className="mt-2 leading-[1.7] text-[var(--text-muted)]">
              Companies and researchers: partner with us for talks, workshops, or events. Get in touch above or email us directly.
            </p>
          </a>
        </section>

        <section className="mb-16" data-animated-section>
          <h2 className="mb-4 text-lg font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">Connect</h2>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-transparent px-5 py-3 text-[var(--text-primary)] transition-colors duration-[0.4s] hover:bg-[var(--accent)]/10 hover:text-[var(--accent)]"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{label}</span>
              </a>
            ))}
          </div>
        </section>

        <section data-animated-section>
          <h2 className="mb-6 text-lg font-extrabold tracking-[-0.03em] text-[var(--text-primary)]">
            Frequently asked questions
          </h2>
          <FAQAccordion items={FAQ_ITEMS} />
        </section>
      </div>
    </>
  );
}
