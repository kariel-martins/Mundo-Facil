/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_BACKEND: string;
  readonly VITE_STRIPE_PUBLIC_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
