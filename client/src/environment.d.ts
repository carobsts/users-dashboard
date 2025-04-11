declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly APP_NAME: string;
    readonly BASE_URL: string;
    readonly API_URL: string;
  }
}
