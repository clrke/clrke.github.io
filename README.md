# clrke.github.io

Personal portfolio of Clarke Plumo, live at https://clrke.github.io. Built with React 19 and Vite, and deployed to GitHub Pages by GitHub Actions.

## Develop

Requires Node 22 (see `.nvmrc`).

```bash
nvm use
npm ci
npm run dev        # local server
npm run build      # production build into dist/
```

## Checks

| Command          | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `npm run lint`   | ESLint on `src/`                                      |
| `npm run format` | Prettier check on `src/`, `scripts/` and `index.html` |
| `npm run test`   | Vitest (components, badges and the stats script)      |
| `npm audit`      | Dependency advisories                                 |

`npm run format:fix` and `npm run lint:fix` apply fixes. Run the checks with `NODE_ENV` unset: with `NODE_ENV=production`, npm skips devDependencies and React tests fail.

## Live project stats

`scripts/fetch-stats.mjs` collects the numbers shown on project cards (App Store and Meta store ratings, the OnChainMonkey floor price and the ETH price) and writes `public/stats.json`, with a `fetchedAt` timestamp for each source. When a source fails, the previous value is kept and the run shows a warning. The site hides any badge whose data is missing or more than 7 days old (`src/lib/badges.js`).

## Workflows

| Workflow          | Trigger                         | Purpose                                           |
| ----------------- | ------------------------------- | ------------------------------------------------- |
| `fetch-stats.yml` | Daily 08:00 UTC                 | Refreshes `public/stats.json` and commits it      |
| `deploy.yml`      | Push to master, after stats run | Lint, format, test, audit, build, deploy to Pages |
| `ci.yml`          | Pull requests                   | Same checks without deploying                     |
| `audit.yml`       | Mondays 09:00 UTC               | Full `npm audit`, including dev dependencies      |

Dependabot opens grouped update PRs weekly for npm and monthly for Actions. The stats bot commits to master daily, so run `git pull --rebase` before pushing.

## Other files

- `RESUME.md` and `Clarke_Plumo_Resume.pdf`: resume sources. `generate_resume_pdf.py` builds the PDF and needs `reportlab`.

## License

MIT, see [LICENSE](LICENSE).
