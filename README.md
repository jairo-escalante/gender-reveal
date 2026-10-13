# Alexander Escalante · Bilingual Gender Reveal

A free, mobile-friendly Spanish/English website that collects predictions in Supabase and reveals Alexander's name + two family photos **after Supabase confirms the submission**. The same browser remembers a successful submission and opens the reveal on return visits.

## What you need

- Free GitHub account (for GitHub Pages hosting).
- Free Supabase account (for database). Existing Supabase account works fine.
- Two family photos (ultrasound; firstborn with ultrasound).
- No account is needed for any guest.

## 1. Set up Supabase (one-time)

1. Go to https://supabase.com/dashboard and create a project (or select a project that you own). Keep the database password private.
2. Go to **SQL Editor** → **New query**. Open `supabase.sql`, paste it, and press **Run**.
3. Go to **Project Settings** → **API Keys** (or **Connect** in newer interfaces). Find your **Project URL** and the **Publishable key** (starts `sb_publishable_`; a legacy public `anon` key also works).
4. Open `config.js` and replace `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` with your values. **Never use a secret key or service_role key in the HTML!**
5. Test by submitting one sample response after publishing, then in Supabase open **Table Editor → predictions**. You should see the sample row.

### Privacy

After a successful save, the website stores only a completion/language marker in the browser, without storing the guest's answers there. Returning guests see the reveal in their submission language, and the form avoids another submission from that browser. Clearing browser data or using another browser/device allows another prediction. People sharing a browser also share this marker. If browser storage is blocked, repeat prevention lasts only for the current visit. This is a convenience feature, not a database-enforced limit; simultaneous submissions from separate tabs can still both save. The organizer accepted the existing basic spam protection on October 13, 2026.

The included SQL allows only anonymous **INSERT**. Guests cannot use the public API to SELECT, UPDATE or DELETE saved answers. Your publishable key is intentionally visible in a public frontend; Row Level Security (RLS) protects the data. The form is public, so anyone with the link may submit; simple honeypot and length checks do not stop determined spam. Do not use this for sensitive personal information. The photos are publicly downloadable from GitHub Pages once uploaded; they are not technically secret before reveal. GitHub's free Pages hosting requires a public repo, so people can inspect the HTML and see the baby's name in the source. This is a **surprise reveal**, not a secure embargo.

## 2. Add the two photos

The supplied family photos are already included and configured. The reveal frames the ultrasound to hide the phone controls and displays Jere's full portrait. Photos stack on narrow screens and have Spanish and English alternative descriptions.

To replace them later:

1. Replace Alexander's ultrasound in `/images/ultrasound.jpg`. If the replacement is not the same phone screenshot, adjust or remove the `.ultrasound-window` framing in `styles.css`.
2. Replace Jere's photo in `/images/big-brother.jpg`.
3. If the filenames change, update `config.js`:
   - `ULTRASOUND_IMAGE: './images/ultrasound.jpg'`
   - `BROTHER_IMAGE: './images/big-brother.jpg'`

You can use `.png` instead; update the paths to match. For mobile performance, images around 1200 px wide and under 1 MB each are a good target. Don't upload anything you aren't comfortable making public.

## 3. Publish the HTML free with GitHub Pages

1. Log in to https://github.com and create a new **public** repository named e.g. `alexander-reveal`.
2. Upload the **contents** of this folder (keep `index.html`, `styles.css`, `app.js`, `config.js`, `supabase.sql`, `README.md`, `.nojekyll` and `images/` with the same relative paths). You may omit `supabase.sql` from the public repo; it is only needed during setup.
3. Open repository **Settings → Pages → Build and deployment → Deploy from a branch**.
4. Choose `main` and `/(root)`, then click **Save**.
5. GitHub will show the public link, usually `https://YOUR-USERNAME.github.io/alexander-reveal/`.
6. Open that link on your phone, choose both languages in separate tests, and submit sample predictions. Verify the sample rows in Supabase, then delete your sample data **from the Supabase dashboard** if desired.
7. Share the GitHub Pages link through WhatsApp once photos and tests are complete.

GitHub Pages instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 4. Export the messages to Excel

In Supabase: **Table Editor → predictions → Export → CSV** (menu wording can vary). Open the downloaded `.csv` file in Excel. The database keeps updating as guests submit; your downloaded CSV is a snapshot, not a live-sync OneDrive Excel file.

Columns: `name`, `prediction` (`boy` / `girl`), `name_guess` (optional baby-name prediction), `message`, `birth_guess` (YYYY-MM-DD), `language` (`es` / `en`), `created_at` (UTC timestamp).

The questionnaire includes “¿Cómo crees que se va a llamar?” immediately after the boy-or-girl prediction, with an English translation. If the database was already set up before this field was added, rerun `supabase.sql` to add `name_guess` and update INSERT permissions and the submission policy.

## Bible passage

The questionnaire displays **Salmo 127:3–5** in full, using the Spanish LBLA text supplied by the organizer, with the pasted footnote link removed. The English page uses an original translation of that supplied Spanish text, rather than a quoted NASB edition. Each verse is displayed separately for readability. There are no external passage links.

## Due date

The displayed estimated due date is **March 16, 2027**. Date predictions can be selected from **February 15 through March 31, 2027**, inclusive. Adjust the bounds consistently in `index.html` and `supabase.sql` if desired.

## Files

The Supabase browser library is pinned to version **2.117.3** in `index.html` so future library releases do not automatically change the website. The CDN download and submission request shape were checked locally; verify loading and a real submission again on the published site.

- `index.html` — three screens, photos, form.
- `styles.css` — all visual styling, responsive design and effects.
- `app.js` — English/Spanish text and saves to Supabase.
- `config.js` — only the public Supabase URL/key and photo filenames.
- `supabase.sql` — the database table and minimum permissions.
- `images/` — illustrations, family photos, and unused original photo placeholders.

## Troubleshooting

- If you see 'not connected to Supabase', verify `config.js` and the public key.
- If submission fails, verify `supabase.sql` was run, the `public.predictions` table is available via Data API, and only the intended RLS policies exist.
- Open the browser developer console for detailed submission errors. Do not share passwords or secret keys.
- The reveal screen deliberately does not appear when a submission fails. Double-clicks are blocked while saving.
- If guests have no internet or the database is paused, submission cannot complete until the service is available.
