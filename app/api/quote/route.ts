import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

/**
 * Receives the quote form and emails it on.
 *
 * Runs on Node rather than the edge because the Resend SDK expects it, and the
 * API key never reaches the browser — the form posts here, and this route is the
 * only thing that sees the key.
 */
export const runtime = "nodejs";

/** Vercel caps a serverless request body well below Resend's own attachment
 *  limit, so photos are held to something that comfortably fits. */
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;

type Attachment = { filename: string; content: string };

type QuoteRequest = {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  service?: string;
  timing?: string;
  issue?: string;
  attachments?: Attachment[];
};

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const row = (label: string, value: string) =>
  `<tr>
     <td style="padding:10px 16px;background:#f6f4f1;color:#04383b;font:600 12px/1.4 system-ui,sans-serif;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap;vertical-align:top">${escape(label)}</td>
     <td style="padding:10px 16px;color:#04383b;font:400 15px/1.55 system-ui,sans-serif">${escape(value).replace(/\n/g, "<br>")}</td>
   </tr>`;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const inbox = process.env.QUOTE_INBOX;

  if (!apiKey || !inbox) {
    console.error("quote: RESEND_API_KEY or QUOTE_INBOX is not set");
    return NextResponse.json({ error: "Email is not configured." }, { status: 500 });
  }

  let body: QuoteRequest;
  try {
    body = (await request.json()) as QuoteRequest;
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const phone = body.phone?.trim();
  const address = body.address?.trim();

  if (!name || !email || !phone || !address) {
    return NextResponse.json({ error: "Please fill in every required field." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }

  // Photos arrive base64-encoded; drop the batch rather than the whole enquiry
  // if it is too big to send.
  const attachments = (body.attachments ?? []).filter((a) => a?.filename && a?.content);
  const attachmentBytes = attachments.reduce((sum, a) => sum + Math.ceil((a.content.length * 3) / 4), 0);
  const attachmentsTooBig = attachmentBytes > MAX_ATTACHMENT_BYTES;

  const rows = [
    row("Name", name),
    row("Email", email),
    row("Phone", phone),
    row("Address", address),
    body.service ? row("Service", body.service) : "",
    body.timing ? row("Timing", body.timing) : "",
    body.issue?.trim() ? row("Details", body.issue.trim()) : "",
    attachments.length
      ? row("Photos", attachmentsTooBig ? `${attachments.length} attached but too large to send` : `${attachments.length} attached`)
      : "",
  ].join("");

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      // Resend only allows its shared sender until a domain is verified, and a
      // shared sender may only deliver to the account's own address. Once
      // gjpaintpartners.com.au is verified, set QUOTE_FROM and QUOTE_INBOX and
      // nothing here needs changing.
      from: process.env.QUOTE_FROM ?? `${siteConfig.fullName} Website <onboarding@resend.dev>`,
      to: [inbox],
      replyTo: email,
      subject: `Quote request — ${name}${body.service ? ` · ${body.service}` : ""}`,
      html: `<div style="background:#eceae5;padding:28px">
          <table style="width:100%;max-width:620px;margin:0 auto;border-collapse:collapse;background:#fffefc;border-radius:12px;overflow:hidden">
            <tr><td style="padding:22px 16px;background:#022b2e;color:#f6f4f1;font:600 17px/1.3 system-ui,sans-serif">New quote request</td></tr>
            <tr><td style="padding:0">
              <table style="width:100%;border-collapse:collapse">${rows}</table>
            </td></tr>
            <tr><td style="padding:16px;background:#f6f4f1;color:#3d6a6c;font:400 12px/1.5 system-ui,sans-serif">
              Sent from the ${escape(siteConfig.fullName)} website. Reply directly to reach the customer.
            </td></tr>
          </table>
        </div>`,
      attachments: attachmentsTooBig
        ? undefined
        : attachments.map((a) => ({ filename: a.filename, content: a.content })),
    });

    if (error) {
      console.error("quote: resend rejected the send", error);
      return NextResponse.json({ error: "Could not send right now." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id: data?.id, attachmentsSkipped: attachmentsTooBig });
  } catch (cause) {
    console.error("quote: send threw", cause);
    return NextResponse.json({ error: "Could not send right now." }, { status: 502 });
  }
}
