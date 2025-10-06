# KaziSecure

[![Vercel Production](https://vercel.com/<YOUR_ORG>/<YOUR_PROJECT>/badge)](https://vercel.com/<YOUR_ORG>/<YOUR_PROJECT>)

**Empowering Kenya's Gig Economy Workers with AI-Powered Financial Management**
 
[![Vercel Staging](https://vercel.com/<YOUR_STAGE_ORG>/<YOUR_STAGE_PROJECT>/badge)](https://vercel.com/<YOUR_STAGE_ORG>/<YOUR_STAGE_PROJECT>)

## Overview

KaziSecure is an AI-enabled, secure digital financial management platform designed specifically for gig economy workers in Kenya who face the challenge of managing irregular income. The platform combines artificial intelligence, cybersecurity, and fintech to provide accessible financial planning tools that work on smartphones, web browsers, and even basic feature phones via USSD.

### The Problem

Gig workers in Kenya face unique financial challenges:
- Irregular and unpredictable income streams
- Difficulty budgeting and saving with inconsistent earnings
- Limited access to traditional banking and credit services
- Need for accessible tools that work on basic mobile phones
- Concerns about data security and financial fraud

### Our Solution

KaziSecure addresses these challenges through:
- **AI-Powered Predictions**: Machine learning algorithms forecast income patterns and provide personalized financial recommendations
- **Smart Budgeting**: Intelligent budget allocation based on income history and spending patterns
- **Secure Platform**: Multi-factor authentication, fraud detection, and end-to-end encryption
- **Universal Access**: Full functionality via web, mobile app, and USSD codes for feature phones
- **Financial Inclusion**: Tools designed specifically for the gig economy context

## Key Features

### 1. Financial Dashboard
- Real-time income and expense tracking
- Visual analytics with charts and graphs
- Quick access to key financial metrics
- Mobile-first responsive design

### 2. AI Income Prediction System
- 6-month income forecasting with confidence intervals
- Pattern recognition from historical data
- Personalized optimization strategies
- Risk assessment and mitigation recommendations
- Smart goal setting and achievement tracking

### 3. Secure Authentication
- Multi-step registration with phone verification
- Two-factor authentication (2FA)
- Biometric login support
- Security activity monitoring
- M-Pesa integration for payments

### 4. USSD Integration
- Complete financial management via USSD codes
- Works on any mobile phone (no internet required)
- Check balance, track income, view AI insights
- Set financial goals and manage security
- Accessible to users without smartphones

### 5. Cybersecurity Features
- Real-time fraud detection with AI
- End-to-end data encryption
- Threat monitoring and alerts
- Security score tracking
- Compliance with data protection standards

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript
# KaziSecure

Empowering Kenya's gig economy workers with AI-powered, secure financial management.


## Overview

KaziSecure is an AI-enabled, secure digital financial management platform built for gig economy workers in Kenya. It provides income forecasting, smart budgeting, security features, and accessibility via web and USSD for feature phones.

## Highlights
- AI-driven income prediction and budgeting
- USSD support for feature phones (no internet required)
- Security-first design: fraud detection, encryption, and account protections
- Responsive Next.js + React app with reusable components

## Tech stack
- Frontend: Next.js 14 (app router), React, TypeScript
- Styling: Tailwind CSS v4
- Charts & visualizations: Recharts
- State & forms: react-hook-form, zod
- UI primitives: Radix + shadcn-style components
- Tests: Vitest + Testing Library
- Package manager: pnpm (pnpm-lock.yaml present), npm or yarn also supported

The dependencies come from the project's `package.json` — run `pnpm install` (recommended) or `npm install` if you don't use pnpm.

## Getting started (local development)

Prerequisites:
- Node.js 18+
- pnpm (recommended) or npm

Install dependencies:

```bash
# recommended (uses pnpm lockfile present in the repo)
pnpm install

# or, if you don't have pnpm
npm install
```

Run the development server:

```bash
pnpm dev
# or
npm run dev
```

Open http://localhost:3000 in your browser.

Available scripts (from package.json):
- dev: next dev
- build: next build
- start: next start
- test: vitest
- lint: next lint

Run tests:

```bash
pnpm test
# or
npm run test
```

Run the linter:

```bash
pnpm lint
# or
npm run lint
```

## USSD & API

- The USSD endpoints live under `app/api/ussd` (see `app/api/ussd/route.ts`).
- There's a USSD simulator at the route `/ussd-demo` for manual testing of flows and menu interactions.

Try the USSD demo page in the running app to simulate common USSD commands.

## Project structure (partial)

```
KaziSecure/
├─ app/                    # Next.js app (app router)
│  ├─ api/                 # API routes (includes ussd, budgets, etc.)
│  ├─ ai-insights/         # AI prediction pages
│  ├─ auth/                # auth pages (login, register)
│  └─ ussd-demo/           # USSD simulator UI
├─ components/             # React components (ui, auth, security, etc.)
├─ lib/                    # helper libs (budgeting, utils)
├─ public/                 # static assets
├─ styles/                 # global styles
├─ tests/                  # unit / integration tests
├─ package.json
└─ pnpm-lock.yaml
```

## Key features

- Financial dashboard: income/expense tracking and charts
- AI income predictions and planning suggestions
- Smart budgeting and goal tracking
- USSD access for feature phones
- Security features: fraud detection, encryption, security score

## How this repo maps to the project

- `components/` contains UI building blocks used across pages.
- `app/` is the Next.js app router where the pages and API routes live.
- `lib/budget.ts` and `lib/utils.ts` contain core budgeting logic and helpers used by the UI and tests.

## Tests

Run the test suite with `pnpm test` (uses Vitest). See `tests/` for example unit tests.

## Deployment

This project is ready for deployment to platforms that support Next.js (for example, Vercel). You can deploy via the Vercel web UI, the Vercel CLI, or using the included GitHub Actions workflow.

Deployment options

1) Vercel web UI (recommended for quick start)
	- Go to https://vercel.com and sign in
	- Import the GitHub repository and select the `main` branch
	- Vercel auto-detects Next.js — use the defaults (Build Command: `pnpm build` or `npm run build`, Install Command: `pnpm install`)

2) Vercel CLI
	- Install Vercel: `pnpm add -g vercel` (or `npm i -g vercel`)
	- Run `vercel` in the project root and follow prompts

3) GitHub Actions (CI) — automatic deploy on push to `main`
	- A GitHub Actions workflow is included at `.github/workflows/deploy-to-vercel.yml`.
	- Add the following repository secrets in GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
	  - `VERCEL_TOKEN`: a personal token created in your Vercel account (Settings → Tokens).
	  - `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID`: available in the Vercel project settings or from the Vercel API.
	- Push to `main` and the workflow will build and trigger a deployment.

Notes
- The repo contains `vercel.json` and a `.vercelignore` to help control the deployment configuration and which files are uploaded.
- If you use pnpm, GitHub Actions and Vercel should use `pnpm install`/`pnpm build`. If you prefer npm, change those commands in the Vercel project settings or the workflow.

Add a production badge

1. After you import the repository into Vercel and create a project, Vercel provides a badge URL in the format:

	`https://vercel.com/<YOUR_ORG>/<YOUR_PROJECT>/badge`

2. Replace `<YOUR_ORG>` and `<YOUR_PROJECT>` in the badge link at the top of this README with your actual values so the badge points to the real project and shows the latest production deployment status.

Staging / preview badge

If you maintain a separate staging project in Vercel you can add a staging badge using the same pattern. Replace `<YOUR_STAGE_ORG>` and `<YOUR_STAGE_PROJECT>` with the staging project slugs.

## Contributing

Small contributions, bug reports, and improvements are welcome. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Add tests for new behavior
4. Open a pull request describing the change

## Contact

Team Lead: Silvia Mutete

Contact: +254758079542

Email: silviamutetekisoi@gmail.com

## License

MIT — see the `LICENSE` file if present.

---

KaziSecure — securing the financial future of Kenya's gig economy workers, one transaction at a time.
