export const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3000";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
