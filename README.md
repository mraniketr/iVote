# iVote Phone OTP Login

Simple mobile-first login page using Supabase Phone OTP auth.

## Configure Supabase

1. Copy your Supabase project settings into `config.js`:
   - `supabaseUrl`
   - `supabaseAnonKey`
2. In Supabase Dashboard → Authentication → Providers, enable **Phone**.
3. Configure an SMS provider in Supabase Auth settings.

## Local run

Because this is a static site, you can open `index.html` directly, or run:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Deploy (GitHub Pages)

A workflow is included at `.github/workflows/deploy.yml`.

1. Push this repository to GitHub.
2. In GitHub repo settings, enable **Pages** and select **GitHub Actions** as the source.
3. Push to `main` (or run the workflow manually from Actions tab).
4. GitHub will publish the site URL after deployment.
