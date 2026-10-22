# Ather Portfolio — React + Vite

A single-page creative portfolio (Home, About, Selected Work, Education, Contact, Footer) built with
React, Vite, plain CSS and Lucide icons. The contact form sends real email through
[FormSubmit](https://formsubmit.co/). No backend, no database.

## 1. Create / run the project

If you are starting from scratch in VS Code:

```bash
npm create vite@latest ather-portfolio -- --template react
cd ather-portfolio
npm install
npm install lucide-react
```

Then replace the generated files with the files in this project (same names and folders).
If you already have this folder, just run:

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## 2. File structure

```
ather-portfolio/
  public/favicon.svg
  src/
    assets/projects/        <- put your project images here
    components/
      Navbar.jsx  Hero.jsx  About.jsx
      Projects.jsx  ProjectVisual.jsx  ProjectModal.jsx
      Education.jsx  Contact.jsx  Footer.jsx
    data/
      siteConfig.js         <- YOUR name, email, links, intro
      projects.js           <- YOUR project content
    App.jsx  main.jsx  index.css
  index.html  package.json  vite.config.js
```

## 3. Replace your name and introduction

Open `src/data/siteConfig.js` and edit:

- `name` (replace `[YOUR FULL NAME]`) and `initials` (replace `[YN]`)
- `intro` (the hero paragraph, already filled with the starter text)
- `personalStatement` (replace the `[PERSONAL STATEMENT ...]` placeholder)

Anything still in `[square brackets]` is treated as "not set yet".

## 4. Add or replace project images

1. Copy your image into `src/assets/projects/` (png, jpg, jpeg, webp, gif, svg or avif).
2. In `src/data/projects.js`, set `image: "your-file-name.jpg"` (file name only).
3. Write a descriptive `imageAlt`.

Use roughly 4:3 images (for example 1600 × 1200 px) so they fill the card without odd cropping.
If `image` is empty, the built-in CSS sample composition is shown.

## 5. Edit project information

Everything lives in `src/data/projects.js`: title, category, short description, tools, overview,
creative objective, design approach and outcome. When a project is your own finished work:

- set `isSample: false` (removes the "Sample concept" badge)
- set `url: "https://..."` only if you have a real link (otherwise no link is shown)

You can add a fourth project by copying one object in the list.

## 6. Replace email and social links

In `src/data/siteConfig.js`:

```js
email: "you@example.com",
linkedin: "https://www.linkedin.com/in/your-name",
github: "https://github.com/your-username",
```

The same email is used for the `mailto:` link and as the FormSubmit recipient.

## 7. Activate FormSubmit (first time only)

1. Put your real email in `siteConfig.js` and start the site (`npm run dev`).
2. Fill in the contact form and press **Send Message**.
3. FormSubmit sends an **activation email** to your address. Open it (check Spam / Promotions) and
   click the activation link.
4. Until you activate, messages are not delivered. After activation, every submission arrives as an
   email to you.

## 8. Test the contact form

Locally and again after deploying:

1. Submit the form with a real message (use a different email address in the "Email address" field
   if you want to test a reply).
2. You should see the green success message only after the service confirms it.
3. Check your inbox and Spam folder for the message.
4. Test an error: turn off your internet and submit. You should see a red error message and your
   text must still be in the form.
5. Test validation: submit an empty form and a bad email like `abc`.

Note: FormSubmit may require the site to be loaded from a real origin; `localhost` works for testing.

### Troubleshooting failed submissions

- **"The recipient email is not set yet"** — replace `[YOUR EMAIL]` in `siteConfig.js`.
- **Service message about activation** — complete step 7.
- **Nothing in the inbox** — check Spam, wait a few minutes, confirm the email has no typo.
- **Network error** — check your connection, ad blockers or privacy extensions that block `formsubmit.co`.
- **Still failing** — use the `mailto:` link as a fallback and check formsubmit.co's documentation.

### Privacy and spam notes

- The recipient address is placed in frontend code, so anyone who views the page source can see it.
  (A public email on a portfolio is normal, but do not use an address you want to keep private.)
- No secrets or API keys are used.
- A hidden "honeypot" field (`_honey`) catches simple bots.
- A third-party service handles submissions; delivery can be affected by spam filters or service outages.
- Do not collect sensitive personal information through the form.

## 9. Common errors

- `npm: command not found` — install Node.js (LTS) from nodejs.org.
- `Cannot find module` — run `npm install` inside the project folder.
- Blank page — open the browser console (F12) and read the first red error.
- Image not showing — check the file name in `projects.js` matches the file in `src/assets/projects/` exactly (including capitals and extension).
- Port already in use — Vite picks another port; use the address it prints.

## 10. Production build

```bash
npm run build      # creates the dist/ folder
npm run preview    # optional: preview the built site locally
```

Upload the `dist/` folder to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages).
