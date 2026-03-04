# KyberNode — AI-Powered Marketing Agency Landing Page

A showcase project for **KyberNode**, an AI-automation service that scales brands through intelligent marketing. Built pixel-perfect from a Stitch design, deployed on Netlify with serverless API functions that connect to n8n for automated data processing.

## Live Architecture

```
Browser → Netlify CDN (static React app)
       → /api/contact   → Netlify Function → n8n Webhook → Excel Sheet
       → /api/subscribe → Netlify Function → n8n Webhook → Excel Sheet
```

## Features

- **Pixel-perfect design** from Stitch (NovaPulse Marketing V2)
- **Page load entrance** — staged animations: background fade, navbar slide, hero stagger
- **Custom cursor** (desktop) — dot + follower with hover states, magnetic CTAs, click squish
- **Smooth scroll** — JS lerp (0.08) on desktop, native on touch
- **Smart navbar** — glass effect, hides on scroll down, reappears on scroll up
- **Scroll reveals** — section fade-in with stagger and IntersectionObserver
- **Stats count-up** — 0 → value with easeOutExpo when in viewport
- **Hero orbs** — gradient blobs with mouse parallax and slow drift
- **Case studies** — full-width horizontal cards with texture overlays and gradient badges
- **3-row testimonial marquee** — real profile photos, alternating scroll directions
- **Contact form** — validates and submits to API, loading spinner, success state with checkmark animation
- **Newsletter subscribe** — footer email form submits to API
- **FAQ** — 2-column accordion with gradient icons
- **Footer** — 4-column layout with newsletter signup and social links
- **Accessibility** — respects `prefers-reduced-motion`, touch device detection

## Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React 18, TypeScript, Vite 5 |
| Styling   | Custom CSS (no framework)   |
| API       | Netlify Functions (serverless TypeScript) |
| Automation| n8n (webhook → Excel sheet) |
| Hosting   | Netlify                     |

## Local Development

```bash
npm install
npm run dev
```

For the full stack with serverless functions locally, use [Netlify CLI](https://docs.netlify.com/cli/get-started/):

```bash
npm install -g netlify-cli
netlify dev
```

This runs Vite + functions together and routes `/api/*` correctly.

## Deployment on Netlify

1. Push this repo to GitHub
2. In Netlify, create a new site → import from Git
3. Build settings are auto-detected from `netlify.toml`:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Functions directory:** `netlify/functions`
4. Set environment variables in **Site settings → Environment variables**:

| Variable                     | Description                         |
|------------------------------|-------------------------------------|
| `N8N_CONTACT_WEBHOOK_URL`   | n8n webhook URL for contact form    |
| `N8N_SUBSCRIBE_WEBHOOK_URL` | n8n webhook URL for newsletter      |

5. Deploy. Done.

## n8n Webhook Setup

### Contact Form Webhook
Create an n8n workflow with a **Webhook** node:
- Method: `POST`
- Copy the production webhook URL → set as `N8N_CONTACT_WEBHOOK_URL` in Netlify

Incoming payload:
```json
{
  "name": "John Doe",
  "email": "john@company.com",
  "spend": "$20k - $100k",
  "message": "Tell us about your goals...",
  "submitted_at": "2026-03-05T10:30:00.000Z",
  "source": "kybernode-contact-form"
}
```

### Newsletter Subscribe Webhook
Create another n8n workflow with a **Webhook** node:
- Method: `POST`
- Copy the production webhook URL → set as `N8N_SUBSCRIBE_WEBHOOK_URL` in Netlify

Incoming payload:
```json
{
  "email": "user@example.com",
  "subscribed_at": "2026-03-05T10:30:00.000Z",
  "source": "kybernode-newsletter"
}
```

Connect each webhook to a **Google Sheets** or **Microsoft Excel** node to save data in organized columns.

## API Endpoints

| Method | Path             | Body Fields                        | Response              |
|--------|------------------|------------------------------------|-----------------------|
| POST   | `/api/contact`   | `name`, `email`, `spend`, `message`| `{ ok, message }`    |
| POST   | `/api/subscribe` | `email`                            | `{ ok, message }`    |

Both validate input server-side and return `400` for invalid data, `502` if the n8n webhook is unreachable.

## Project Structure

```
kybernode-project-1/
├── netlify.toml              # Netlify build & redirect config
├── netlify/functions/        # Serverless API functions
│   ├── contact.ts            # Contact form → n8n webhook
│   └── subscribe.ts          # Newsletter → n8n webhook
├── src/
│   ├── api/client.ts         # Frontend fetch wrapper
│   ├── components/           # React components
│   ├── hooks/                # useReducedMotion, useIsTouch
│   ├── utils/                # lerp, easeOutExpo
│   ├── App.tsx               # Main app orchestrator
│   ├── App.css               # All styles
│   └── main.tsx              # Entry point
├── index.html
└── package.json
```
