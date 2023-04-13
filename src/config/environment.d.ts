export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: string
      MONGODB_URL: string
      VERSION_TAG: string
      

    }
  }
}
