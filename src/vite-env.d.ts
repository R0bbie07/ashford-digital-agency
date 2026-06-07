/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STRIPE_STANDARD_LINK?: string;
  readonly VITE_STRIPE_PRO_LINK?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
