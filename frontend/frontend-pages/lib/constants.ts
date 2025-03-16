export const API_BASE_URL = "https://hackathon-unihack.onrender.com/";

export const AI_API_URL = "http://localhost:8000";

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getAccessToken = (): string | void => {
  const cookies = document?.cookie?.split(";");

  const tokenCookie = cookies?.find((cookie) =>
    cookie?.trim()?.startsWith("accessToken=")
  );

  const accessToken = tokenCookie ? tokenCookie.split("=")[1] : null;

  if (accessToken) {
    return accessToken;
  } else {
    window.location.href = "/auth";
  }
};
