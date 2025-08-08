# Pet Adoption Platform (Client)

**Live URL:** https://pet-adoption-tailwag.surge.sh/

## Project Purpose
A responsive, user-friendly single-page application (SPA) built with React that lets people browse adoptable pets, submit adoption requests, and donate to pet campaigns. The client communicates with a secure Node/Express API and integrates Firebase Authentication, Stripe payments, and third-party image hosting for uploads.

## Key Features
- Responsive homepage with banner, pet categories, call-to-action, and featured sections.
- Pet listing with infinite scrolling and search/filter by name & category.
- Pet details page with Adopt modal (pre-filled user info) and adoption request submission.
- Donation campaigns listing and donation flow with Stripe Checkout (card input inside modal).
- Authentication: Email/password + at least two OAuth providers (Google, GitHub, Facebook, etc.).
- User dashboard (protected): Add Pet, My Added Pets (paginated & sortable table with TanStack Table), Adoption Requests, Create Donation Campaign, My Donation Campaigns, My Donations.
- Admin dashboard (protected): Manage users, all pets, and all donation campaigns.
- Dark & Light mode toggle.
- Skeleton loaders (react-loading-skeleton) instead of spinners.
- WYSIWYG editor (Tiptap/React-Quill/Slate) for long descriptions.
- TanStack Query for all GET data fetching (with React Query patterns).

## Tech Stack / Packages (Client)

- React 
- React Router 
- TanStack Query 
- react-hook-form 
- Tailwind CSS , flowbite , headlessUI 
- react-loading-skeleton
- react-intersection-observer 
- axios or fetch 
- react-select 
- Tiptap 
- Stripe 
- Firebase 
- imgbb API helper for image uploads
- jwt

## Environment Variables (Client)
Create a `.env.local` file at the project root (do NOT commit this file):

- REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
- REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
- REACT_APP_FIREBASE_PROJECT_ID=your_project_id
- REACT_APP_FIREBASE_APP_ID=your_app_id
- REACT_APP_API_BASE_URL=https://your-server-domain.com
- REACT_APP_STRIPE_PUBLISHABLE_KEY=pk_test_XXXX


**Security note:** Never expose sensitive keys in the repo. Use environment variables and keep `.env*` files in `.gitignore`.

## Setup (Local)
1. `git clone <client-repo-url>`
2. `cd client`
3. `npm install` or `pnpm install`
4. Create `.env.local` with the variables above.
5. `npm run dev` or `npm start`
