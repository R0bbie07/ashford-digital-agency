# Ashford Digital — Agency Website

The site your trades clients land on. Built with **Vite + React + TypeScript +
Tailwind CSS v4 + Framer Motion**, deployed to **Cloudflare Pages** with a
Pages Function for the onboarding form.

Pages:

- `/` — hero, services, pricing (Standard £80/mo, Pro £120/mo), social proof, CTA
- `/terms` — full UK legal Terms & Conditions
- `/onboarding` — client onboarding form (emails + Stripe + JSON backup)

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
| `STRIPE_STANDARD_LINK` | var    | `/api/onboard`     | Stripe payment link for the £80 plan                        |
| `STRIPE_PRO_LINK`      | var    | `/api/onboard`     | Stripe payment link for the £120 plan                       |
| `VITE_STRIPE_STANDARD_LINK` | build var | client confirmation screen | Same £80 link, exposed to the front-end           |
| `VITE_STRIPE_PRO_LINK` | build var | client confirmation screen | Same £120 link, exposed to the front-end             |

### Resend setup

1. Create an account at [resend.com](https://resend.com).
2. Add and verify your sending domain (e.g. `ashforddigital.co.uk`).
3. Create an API key → set it as `RESEND_API_KEY`.
4. Set `FROM_EMAIL` to an address on your verified domain.

### Stripe setup

1. In Stripe → **Payment Links**, create one recurring £80/month link and one
   recurring £120/month link.
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
- All imagery is CSS gradients + inline SVG icons (`src/components/Icons.tsx`) —
  no placeholder images.
- Routing is client-side (React Router); `public/_redirects` provides the SPA
  fallback while `/api/*` is served by the Pages Function.
