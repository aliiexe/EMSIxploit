import { NextResponse } from "next/server";
import { Resend } from "resend";
import { sanitizeString, escapeHtml } from "@/lib/sanitize";

// Set RESEND_API_KEY, optional RESEND_FROM (default: onboarding@resend.dev), CONTACT_EMAIL (recipient)
const resend = new Resend(process.env.RESEND_API_KEY);

const SUBJECT_OPTIONS: Record<string, string> = {
  general: "General enquiry",
  collaboration: "Collaboration",
  sponsorship: "Sponsorship",
  join: "Join the Club",
  press: "Press",
};

const VALID_SUBJECTS = new Set<string>(Object.keys(SUBJECT_OPTIONS));

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawName = body?.name;
    const rawEmail = body?.email;
    const rawSubject = body?.subject;
    const rawMessage = body?.message;

    const name = sanitizeString(rawName, 100);
    const email = sanitizeString(rawEmail, 254).trim().toLowerCase();
    const subject = typeof rawSubject === "string" && VALID_SUBJECTS.has(rawSubject) ? rawSubject : null;
    const message = sanitizeString(rawMessage, 2000);

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, message" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const subjectLabel = SUBJECT_OPTIONS[subject];

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL ?? "emsixploit@gmail.com",
      replyTo: email,
      subject: `[emsixploit] ${subjectLabel} — ${name}`,
      html: `
        <h2>New contact form submission</h2>
        <p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        <p><strong>Subject:</strong> ${escapeHtml(subjectLabel)}</p>
        <hr />
        <pre style="white-space: pre-wrap; font-family: sans-serif;">${escapeHtml(message)}</pre>
      `,
    });

    if (error) {
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch {
    return NextResponse.json(
      { error: "Unexpected error. Please try again later." },
      { status: 500 }
    );
  }
}
