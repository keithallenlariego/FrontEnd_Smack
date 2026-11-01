# React + Vite

## Sentry setup

This app sends browser errors and sampled performance traces to Sentry when
`VITE_SENTRY_DSN` is configured. Without a DSN, Sentry remains disabled and the
app runs normally.

1. In Sentry, open the `keith-allen-lariego` organization and create a **React**
   project for this app (for example, `secure-web-chat-room`).
2. Copy the project's DSN from **Project Settings → Client Keys (DSN)**.
3. Copy `.env.example` to `.env.local` and set `VITE_SENTRY_DSN` to that DSN.
   Keep `.env.local` out of source control; it is ignored by `.gitignore`.
4. Restart the Vite dev server. Set `VITE_SENTRY_ENVIRONMENT` to `development`
   locally and to `production` in your deployment environment. Both can use
   the same project and DSN; Sentry separates events by environment.
5. To verify the setup, trigger a test event from the Sentry project setup page
   or temporarily call `Sentry.captureException(new Error('Sentry test'))`
   from the app, then confirm it appears in the project. Remove any temporary
   test call afterward.

`VITE_SENTRY_RELEASE` is optional and can identify the deployed build. Vite
exposes `VITE_` variables to browser code, so only put the Sentry DSN there;
never put an auth token or other secret in a `VITE_` variable.

## Development

- `npm run dev` starts the development server.
- `npm run build` creates the production build.
- `npm run lint` runs ESLint.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
