/**
 * Cloudflare Pages Function — POST /api/onboard
 * ---------------------------------------------
 * Receives the onboarding form (multipart/form-data), then:
 *   1. Emails all details (with the logo attached) to the agency inbox.
 *   2. Emails the client a confirmation with next steps + the 24hr promise
 *      + the correct Stripe payment link for their plan.
 *   3. Stores a JSON backup of the submission in a KV namespace (if bound).
 *
 * Emails are sent through the Resend REST API.
 *
 * Required environment variables (set in the Cloudflare Pages dashboard):
 *   RESEND_API_KEY            — your Resend API key
 *   FROM_EMAIL    (optional)  — verified sender, e.g. "Ashford Digital <onboarding@ashforddigital.co.uk>"
 *   AGENCY_EMAIL  (optional)  — where leads are sent (default ashforddigital10@gmail.com)
 *   STRIPE_STANDARD_LINK      — Stripe payment link for the £80 plan
 *   STRIPE_PRO_LINK           — Stripe payment link for the £120 plan
 *
 * Optional KV binding:
 *   ONBOARDING_KV             — namespace for JSON backups
 */

interface KVNamespaceLike {
  put(key: string, value: string, options?: Record<string, unknown>): Promise<void>;
}

interface Env {
  RESEND_API_KEY: string;
  FROM_EMAIL?: string;
  AGENCY_EMAIL?: string;
  STRIPE_STANDARD_LINK?: string;
  STRIPE_PRO_LINK?: string;
  ONBOARDING_KV?: KVNamespaceLike;
}

interface EventContext {
  request: Request;
  env: Env;
}

const DEFAULT_FROM = "Ashford Digital <onboarding@ashforddigital.co.uk>";
const DEFAULT_AGENCY = "ashforddigital10@gmail.com";

function escapeHtml(value: string): string {
  return (value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });
}

interface ResendAttachment {
  filename: string;
  content: string; // base64
}

async function sendEmail(
  apiKey: string,
  payload: {
    from: string;
    to: string;
    subject: string;
    html: string;
    reply_to?: string;
    attachments?: ResendAttachment[];
  }
): Promise<void> {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Resend error ${res.status}: ${detail}`);
  }
}

export const onRequestPost = async (context: EventContext): Promise<Response> => {
  const { request, env } = context;

  if (!env.RESEND_API_KEY) {
    return json(
      { error: "Email service is not configured (missing RESEND_API_KEY)." },
      500
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: "Invalid form submission." }, 400);
  }

  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const data = {
    fullName: get("fullName"),
    businessName: get("businessName"),
    tradeType: get("tradeType"),
    location: get("location"),
    phone: get("phone"),
    email: get("email"),
    plan: get("plan") === "Pro" ? "Pro" : "Standard",
    pricePerMonth: get("pricePerMonth") || (get("plan") === "Pro" ? "120" : "80"),
    hasDomain: get("hasDomain"),
    domainName: get("domainName"),
    about: get("about"),
    services: get("services"),
    social: get("social"),
    colours: get("colours"),
    submittedAt: new Date().toISOString(),
  };

  // Basic server-side validation.
  if (!data.fullName || !data.businessName || !data.email || !data.phone) {
    return json({ error: "Missing required fields." }, 400);
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email)) {
    return json({ error: "Invalid email address." }, 400);
  }

  const from = env.FROM_EMAIL || DEFAULT_FROM;
  const agencyEmail = env.AGENCY_EMAIL || DEFAULT_AGENCY;
  const stripeLink =
    data.plan === "Pro"
      ? env.STRIPE_PRO_LINK || ""
      : env.STRIPE_STANDARD_LINK || "";

  // ---- Logo attachment ------------------------------------------------- //
  const attachments: ResendAttachment[] = [];
  const logo = formData.get("logo");
  let logoName = "";
  if (logo && typeof logo === "object" && "arrayBuffer" in logo) {
    const file = logo as File;
    logoName = file.name;
    try {
      const buf = await file.arrayBuffer();
      attachments.push({
        filename: file.name || "logo",
        content: arrayBufferToBase64(buf),
      });
    } catch {
      logoName = `${file.name} (attachment failed)`;
    }
  }

  // ---- Backup to KV ---------------------------------------------------- //
  if (env.ONBOARDING_KV) {
    try {
      const key = `lead:${data.submittedAt}:${data.businessName
        .replace(/[^a-z0-9]+/gi, "-")
        .toLowerCase()}`;
      await env.ONBOARDING_KV.put(
        key,
        JSON.stringify({ ...data, logoName }),
        { metadata: { plan: data.plan, email: data.email } }
      );
    } catch {
      /* backup is best-effort; do not fail the request */
    }
  }

  // ---- Agency email (full details) ------------------------------------- //
  const row = (label: string, value: string) =>
    `<tr>
       <td style="padding:8px 12px;border:1px solid #e2e8f0;background:#f8fafc;font-weight:600;width:38%;vertical-align:top">${escapeHtml(
         label
       )}</td>
       <td style="padding:8px 12px;border:1px solid #e2e8f0;vertical-align:top">${
         escapeHtml(value) || "<span style='color:#94a3b8'>—</span>"
       }</td>
     </tr>`;

  const agencyHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:640px;margin:auto">
    <h2 style="margin:0 0 4px">🚀 New onboarding — ${escapeHtml(
      data.businessName
    )}</h2>
    <p style="color:#64748b;margin:0 0 16px">${escapeHtml(data.plan)} plan · £${escapeHtml(
    data.pricePerMonth
  )}/month · submitted ${escapeHtml(data.submittedAt)}</p>
    <table style="border-collapse:collapse;width:100%;font-size:14px">
      ${row("Full name", data.fullName)}
      ${row("Business name", data.businessName)}
      ${row("Trade type", data.tradeType)}
      ${row("Location / areas", data.location)}
      ${row("Phone", data.phone)}
      ${row("Email", data.email)}
      ${row("Plan", `${data.plan} (£${data.pricePerMonth}/month)`)}
      ${row("Has domain?", data.hasDomain)}
      ${row("Domain name", data.domainName)}
      ${row("Brand colours", data.colours)}
      ${row("Logo file", logoName)}
      ${row("About the business", data.about)}
      ${row("Services offered", data.services)}
      ${row("Social media", data.social)}
    </table>
    <p style="color:#64748b;font-size:13px;margin-top:16px">
      The client has been sent a confirmation with their Stripe payment link.
      Build starts once payment is received.
    </p>
  </div>`;

  // ---- Client confirmation email --------------------------------------- //
  const payButton = stripeLink
    ? `<a href="${escapeHtml(stripeLink)}"
          style="display:inline-block;background:linear-gradient(120deg,#6d5cff,#a78bfa);color:#fff;
                 text-decoration:none;font-weight:700;padding:14px 28px;border-radius:999px;margin:8px 0">
         Pay £${escapeHtml(data.pricePerMonth)}/month &amp; start my build →
       </a>`
    : `<p style="color:#b45309">We'll email you a secure Stripe payment link shortly.</p>`;

  const clientHtml = `
  <div style="font-family:Arial,Helvetica,sans-serif;color:#0f172a;max-width:560px;margin:auto;line-height:1.6">
    <h2 style="margin:0 0 8px">Thanks, ${escapeHtml(
      data.fullName.split(" ")[0] || "there"
    )} 👋</h2>
    <p>We've received the details for <strong>${escapeHtml(
      data.businessName
    )}</strong> and we're excited to build your new website.</p>

    <h3 style="margin:20px 0 6px">What happens next</h3>
    <ol style="padding-left:18px;margin:0">
      <li>Complete your first payment with the secure link below — this kicks off your build.</li>
      <li>We design and build your professional website around your details.</li>
      <li>Your site goes <strong>live within 24 hours</strong> of payment.</li>
    </ol>

    <div style="background:#f1f0ff;border:1px solid #ddd6fe;border-radius:12px;padding:14px 16px;margin:18px 0">
      <strong>⏱️ 24-hour delivery promise:</strong> once your first payment lands,
      your website will be live within 24 hours.
    </div>

    <div style="text-align:center;margin:20px 0">${payButton}</div>

    <p style="color:#64748b;font-size:13px">
      You selected the <strong>${escapeHtml(data.plan)}</strong> plan
      (£${escapeHtml(data.pricePerMonth)}/month). Payment is secure via Stripe and
      you can cancel any time with 30 days' notice. Full terms:
      ashforddigital.co.uk/terms
    </p>

    <p style="margin-top:20px">Speak soon,<br/>Ashford Digital</p>
  </div>`;

  try {
    // Agency email — replies go to the client.
    await sendEmail(env.RESEND_API_KEY, {
      from,
      to: agencyEmail,
      reply_to: data.email,
      subject: `New onboarding: ${data.businessName} (${data.plan})`,
      html: agencyHtml,
      attachments: attachments.length ? attachments : undefined,
    });

    // Client confirmation — replies go to the agency.
    await sendEmail(env.RESEND_API_KEY, {
      from,
      to: data.email,
      reply_to: agencyEmail,
      subject: "Your new website with Ashford Digital — next steps",
      html: clientHtml,
    });
  } catch (err) {
    return json(
      {
        error:
          "We couldn't send the confirmation emails. Please email us directly.",
        detail: err instanceof Error ? err.message : String(err),
      },
      502
    );
  }

  return json({ ok: true, plan: data.plan, stripeLink });
};
