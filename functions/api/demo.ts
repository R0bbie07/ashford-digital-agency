/**
 * Cloudflare Pages Function — POST /api/demo
 * ------------------------------------------
 * Saves a "See your site first" demo request so Robbie can build the demo.
 *
 * It ONLY stores the request. It does not send any email, text or message.
 * Requests are saved in the ONBOARDING_KV namespace under keys starting
 * with "demo:". View them in Cloudflare → Storage & Databases → KV →
 * ONBOARDING_KV, or run:
 *   npx wrangler kv key list --binding ONBOARDING_KV --prefix demo:
 *
 * If ONBOARDING_KV is not set up, this returns 503 and the page shows the
 * visitor buttons to send their details themselves (email / WhatsApp).
 */

interface KVNamespaceLike {
  put(key: string, value: string, options?: Record<string, unknown>): Promise<void>;
}

interface Env {
  ONBOARDING_KV?: KVNamespaceLike;
}

interface EventContext {
  request: Request;
  env: Env;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8" },
  });

const clean = (v: unknown, max = 200) => String(v ?? "").trim().slice(0, max);

export const onRequestPost = async ({ request, env }: EventContext): Promise<Response> => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Honeypot: bots fill the hidden "website" field. Pretend it worked.
  if (clean(body.website)) return json({ ok: true });

  const data = {
    name: clean(body.name, 100),
    business: clean(body.business, 150),
    town: clean(body.town, 100),
    phone: clean(body.phone, 40),
    link: clean(body.link, 500),
    plan: clean(body.plan, 20),
    submittedAt: new Date().toISOString(),
    status: "new",
  };

  if (!data.name || !data.business || !data.town || !/^[0-9+()\s-]{10,}$/.test(data.phone)) {
    return json({ error: "Please fill in your name, business, town and phone." }, 400);
  }

  if (!env.ONBOARDING_KV) {
    return json({ error: "Storage not set up." }, 503);
  }

  const slug = data.business.replace(/[^a-z0-9]+/gi, "-").toLowerCase().slice(0, 60);
  try {
    await env.ONBOARDING_KV.put(`demo:${data.submittedAt}:${slug}`, JSON.stringify(data), {
      metadata: { business: data.business, town: data.town, plan: data.plan },
    });
  } catch {
    return json({ error: "Could not save your request." }, 503);
  }

  return json({ ok: true });
};
