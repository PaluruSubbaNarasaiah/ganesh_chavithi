# Ganesh Chavithi 2026

A festive community website for celebrating Ganesh Chavithi in 2026. This project brings together the event schedule, pooja timings, gallery, volunteer information, donation details, and general festival updates in one clean mobile-first experience.

## About the project

This app is built with React, Vite, and Tailwind CSS. It is designed to feel warm, devotional, and welcoming, with orange-and-gold accents inspired by traditional festival visuals.

The website includes:

- Home page with an immersive festival hero section
- Pooja and event schedule
- Live stream section
- Gallery and stories
- Committee and volunteer information
- Donation and support details
- Localized English/Telugu content support

## Tech stack

- React
- Vite
- TypeScript
- Tailwind CSS
- Motion/animations for UI polish
- Lucide icons

## Run locally

### Prerequisites

- Node.js 18 or later
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Build for production

```bash
npm run build
```

## Supabase realtime setup

The app uses local storage when Supabase is not configured. To share committee profiles, payment QR, donations, gallery, announcements, timings, stories, live events, and volunteers across mobile devices:

1. Create a Supabase project.
2. In the Supabase SQL Editor, run `supabase/schema.sql`.
3. Add these variables to `.env.local` for local development and to the hosting provider for production:

```text
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

The public anon key is safe for browser use. Never add a Supabase service-role key to frontend environment variables. The SQL policy allows public reads and authenticated writes; configure Supabase Auth for admin accounts before enabling production updates.

## Project structure

```text
src/
  components/
  context/
  pages/
  assets/
  translations.ts
public/
server.ts
package.json
README.md
```

## Notes

This project is intended for a community festival website and can be customized with event details, images, committee names, timings, and donation information as needed.

If you want, this README can also be expanded with a full event overview, sponsorship section, and deployment instructions for GitHub Pages or a server-hosted setup.
