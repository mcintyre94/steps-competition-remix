Initiate remix app:

$ npx create-remix@latest
Need to install the following packages:
  create-remix@latest
Ok to proceed? (y) y

R E M I X

💿 Welcome to Remix! Let's get you set up with a new project.

? Where would you like to create your app? steps-competition-remix
? Where do you want to deploy? Choose Remix if you're unsure, it's easy to change deployment targets. Cloudflare
Workers
? TypeScript or JavaScript? TypeScript
? Do you want me to run `npm install`? Yes

> postinstall
> remix setup cloudflare-workers

Successfully setup Remix for cloudflare-workers.

added 358 packages, and audited 359 packages in 13s

107 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
💿 That's it! `cd` into "steps-competition-remix" and check the README for development and deploy instructions!

--

Note: used Cloudflare Workers, kinda speculative, we'll see!

Check remix README:
- npm run dev
- AND npm start
- localhost:8787

--

Ensure we're on latest node (added .nvmrc for this)

--

- Install supabase
- npm install @supabase/supabase-js
- create supabase client: `export const supabase = createClient(supabaseUrl, supabaseAnonKey, {fetch: fetch.bind(globalThis)})`
  - custom fetch impl because cloudflare workers don't have XMLHttpRequest
- Update root:
  - Action: get session + create/delete cookie based on supabase event
  - useEffect: listen to supabase auth change + call action
- On a page:
  - Loader: get session + authed user (if any) on load
  - Action: supabase sign-in (send magic link)
  - On the page: transition shows sending message, action shows sent message (or error)
