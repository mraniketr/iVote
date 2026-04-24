# iVote Phone OTP Login

Simple mobile-first login page using Supabase Phone OTP auth.

## Configure Supabase (local)

1. Open `config.js` and set:
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

### Where to set `window.APP_CONFIG?.supabaseUrl` for GitHub deploys

For GitHub Pages, `config.js` is generated during CI from GitHub Actions **repository secrets**.

1. Go to your repo in GitHub.
2. Open **Settings → Secrets and variables → Actions**.
3. Add these **Repository secrets**:
   - `SUPABASE_URL` (example: `https://xyzcompany.supabase.co`)
   - `SUPABASE_ANON_KEY` (your Supabase anon/public key)
4. In repo **Settings → Pages**, set source to **GitHub Actions**.
5. Push to `main` (or run the workflow manually from Actions tab).

The workflow will fail fast if either secret is missing.
