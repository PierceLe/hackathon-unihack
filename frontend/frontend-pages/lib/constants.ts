export const API_BASE_URL = "http://localhost:3000";

export const AI_API_URL = "http://localhost:8000";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
