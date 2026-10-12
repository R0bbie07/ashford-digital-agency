# Ashford Digital — Agency Website

The Ashford Digital agency site. Built with **Vite + React + TypeScript +
Tailwind CSS v4 + Framer Motion**, deployed to **Cloudflare Pages** with Pages
Functions for the forms. Every page is pre-rendered to HTML at build time
(`scripts/prerender.mjs`) with its own title, description and schema.

Pages: `/` home · `/pricing` (Starter £29, Standard £49, Pro £89, founding Pro
£59) · `/how-it-works` · `/see-your-site-first` (demo request) · `/examples`
(clearly labelled demo sites) · `/about` · `/faq` · `/contact` · `/terms` ·
`/onboarding` (sign-up form for clients who have seen their demo). `/demo`
redirects to `/see-your-site-first` (handy for QR codes).

## Things to fill in

Open `src/lib/site.ts`:

- `phone` — your number. Empty = the Call buttons are hidden.
- `whatsapp` — e.g. `447123456789`. Empty = the WhatsApp buttons are hidden.
- `foundingProOpen` — set to `false` once 5 Pro clients have signed up.

Real reviews go in `REVIEWS` in `src/lib/content.ts` (leave empty until you
have real ones). Shared copy and FAQs also live there.

## Demo requests (See your site first)

`functions/api/demo.ts` **only saves** each request to the `ONBOARDING_KV`
namespace (keys start with `demo:`). It sends no emails or messages. Set up the
KV namespace (see below), then view requests in Cloudflare → Storage &
Databases → KV → ONBOARDING_KV, or:

```bash
npx wrangler kv key list --binding ONBOARDING_KV --prefix demo: --remote
```

If KV isn't set up, the form shows the visitor buttons to send their details
by email/WhatsApp themselves, so no request is lost.

## Quick start (local dev)

```bash
cd agency-website
npm install
cp .env.example .env        # add your Stripe payment links
npm run dev                 # http://localhost:5173
```

> The onboarding form posts to `/api/onboard`, a Cloudflare Pages Function. To
> test that endpoint locally with email sending, run it through Wrangler:
>
> ```bash
> npm run build
> npx wrangler pages dev dist --binding RESEND_API_KEY=re_xxx \
>     --binding STRIPE_STANDARD_LINK=https://buy.stripe.com/... \
>     --binding STRIPE_PRO_LINK=https://buy.stripe.com/...
> ```
>
> During plain `npm run dev` the form still validates and saves the local JSON
> backup; the email/Stripe step needs the Function (Wrangler or a deploy).

## Build

```bash
npm run build      # type-checks then builds to ./dist
npm run preview    # preview the production build
```

## Deploy to Cloudflare Pages

### Option A — Git integration (recommended)

1. Push this folder to a GitHub/GitLab repo.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Add the environment variables below (Settings → Variables).
5. Deploy. Every push auto-deploys; PRs get preview URLs.

### Option B — Direct upload with Wrangler

```bash
npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name ashford-digital
# or simply:  npm run deploy
```

## Environment variables

Set these in **Cloudflare Pages → Settings → Variables & Secrets**
(or via `wrangler pages secret put`):

| Name                   | Type   | Used by            | Notes                                                        |
|------------------------|--------|--------------------|-------------------------------------------------------------|
| `RESEND_API_KEY`       | secret | `/api/onboard`     | Resend API key — sends both emails                          |
| `FROM_EMAIL`           | var    | `/api/onboard`     | Verified Resend sender, e.g. `Ashford Digital <onboarding@ashforddigital.co.uk>` |
| `AGENCY_EMAIL`         | var    | `/api/onboard`     | Where leads are sent (default `ashforddigital10@gmail.com`) |
| `STRIPE_STARTER_LINK`  | var    | `/api/onboard`     | Stripe payment link for the £29 plan                        |
| `STRIPE_STANDARD_LINK` | var    | `/api/onboard`     | Stripe payment link for the £49 plan                        |
| `STRIPE_PRO_LINK`      | var    | `/api/onboard`     | Stripe payment link for Pro (£59 founding, then £89)        |
| `VITE_STRIPE_STARTER_LINK` | build var | client confirmation screen | Same £29 link, exposed to the front-end           |
| `VITE_STRIPE_STANDARD_LINK` | build var | client confirmation screen | Same £49 link, exposed to the front-end           |
| `VITE_STRIPE_PRO_LINK` | build var | client confirmation screen | Same Pro link, exposed to the front-end              |

### Resend setup

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your sending domain (e.g. `ashforddigital.co.uk`).
3. Create an API key → set it as `RESEND_API_KEY`.
4. Set `FROM_EMAIL` to an address on your verified domain.

### Stripe setup

1. In Stripe → **Payment Links**, create recurring links for £29, £49 and
   £59 (founding Pro; swap to £89 once the 5 places are gone).
2. Paste their URLs into the `STRIPE_*` and `VITE_STRIPE_*` variables.

### Optional — KV backup of submissions

```bash
wrangler kv namespace create ONBOARDING_KV
```

Paste the returned id into `wrangler.toml` (uncomment the `[[kv_namespaces]]`
block) and redeploy. Each submission is then stored as JSON in KV. The form also
saves a JSON backup to the client's device on submit, so backups work even
without KV.

## Customise the legal pages

`src/pages/Terms.tsx` and the onboarding emails use placeholders. Replace
`[YOUR NAME]`, `[YOUR EMAIL]` and `[YOUR ADDRESS]` in `src/pages/Terms.tsx` with
your real sole-trader details before going live.

## Tech notes

- Tailwind v4 via `@tailwindcss/vite` — theme tokens are defined in
  `src/index.css` under `@theme`.
- Brand files: `public/brand/` (logo SVGs), `public/favicon.*`,
  `public/og-image.png` (1200×630 share image). The logo component is
  `src/components/Logo.tsx`.
- Fonts (Inter, Bricolage Grotesque) are self-hosted via Fontsource.
- Pages are pre-rendered, so there is no SPA fallback; unknown URLs get
  `404.html`. `sitemap.xml` is generated at build; `robots.txt`, `llms.txt`
  and `pricing.md` live in `public/`.
