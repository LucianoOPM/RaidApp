/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_host: string
  readonly MAIN_VITE_port: number
  readonly MAIN_VITE_username: string
  readonly MAIN_VITE_password: string
  readonly MAIN_VITE_database: string
  readonly MAIN_VITE_dialect: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
