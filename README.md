# Gate Shift Runner

A playable 3D lane-based runner prototype built with Vite, React, TypeScript, `three`, and `@react-three/fiber`. It uses simple low-poly placeholder geometry, deterministic lane logic, and a fully static build so it can deploy directly to GitHub Pages.

## Features

- 3-lane runner with automatic forward motion
- Desktop controls: Left/Right arrows or `A` / `D`
- Mobile controls: swipe left/right or tap the on-screen touch zones
- Gates with `+5`, `+10`, `-3`, `x2`, and `/2`
- Lane hazards that reduce unit count
- Finish line, win state, game over state, score, progress, and persistent best score
- 3 sample levels with increasing difficulty
- GitHub Pages-ready Vite base path support

## File Structure

```text
.
├── .github/workflows/deploy.yml
├── public/favicon.svg
├── src
│   ├── components
│   │   ├── GameOverModal.tsx
│   │   ├── HUD.tsx
│   │   └── StartScreen.tsx
│   ├── game
│   │   ├── components
│   │   │   ├── FinishLine.tsx
│   │   │   ├── Gate.tsx
│   │   │   ├── Hazard.tsx
│   │   │   ├── Player.tsx
│   │   │   └── Track.tsx
│   │   ├── constants.ts
│   │   ├── RunnerScene.tsx
│   │   ├── types.ts
│   │   └── useRunnerGame.ts
│   ├── styles/index.css
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md
```

## Local Development

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://localhost:5173`.

## Production Build

```bash
npm run build
```

The build output is written to `dist/`. That folder is fully static and ready for GitHub Pages.

## GitHub Pages Deployment

This project already includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

1. Push the project to a GitHub repository.
2. In GitHub, open `Settings > Pages`.
3. Set the source to `GitHub Actions`.
4. Push to `main` and GitHub will build and deploy `dist/` automatically.

If you prefer a manual deployment, run:

```bash
VITE_BASE_PATH=/your-repo-name/ npm run build
```

Then publish the generated `dist/` folder with your preferred Pages flow.

## Where To Set The Vite Base Path

The base path is normalized in `vite.config.ts`. You can set it in either of these ways:

- Temporary build override: `VITE_BASE_PATH=/your-repo-name/ npm run build`
- Persistent production setting: create `.env.production` with `VITE_BASE_PATH=/your-repo-name/`

For a repository named `gate-runner-3d`, the correct GitHub Pages base path is usually:

```bash
VITE_BASE_PATH=/gate-runner-3d/
```

## Notes

- No backend is required.
- No paid assets are required.
- The game uses only simple geometry and DOM labels for the first pass.
