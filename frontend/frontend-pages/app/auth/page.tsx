"use client"


import { Background } from "@/components/ui/background";
import { API_BASE_URL, sleep } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function AuthPage() {
  const router = useRouter();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });
      const result = await response.json();

      const { user, tokens } = result;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("accessToken", tokens?.access?.token);
      localStorage.setItem("refreshToken", tokens?.refresh?.token);

      Cookies.set("accessToken", tokens?.access?.token, {
        expires: new Date(tokens?.access?.expires),
        secure: true,
        sameSite: "Strict",
      });

      Cookies.set("refreshToken", tokens?.refresh?.token, {
        expires: new Date(tokens?.refresh?.expires),
        secure: true,
        sameSite: "Strict",
      });

      if (response.ok) {
        toast.success("Login successfully");
        router.push("/");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      toast.error("Login error");
    }
  };

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerData),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success("Registration successfully");
        await sleep(1500);
        window.location.reload();
      } else {
        toast.error(result.message || "Registration failed");
      }
    } catch (error) {
      toast.error("Registration failed");
    }
  };


  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Custom Background */}
      <div className="absolute inset-0 -z-10">
        <Background imagePath="/bg.jpg" />
      </div>

      <div className="relative w-full max-w-4xl rounded-lg bg-white/50 p-8 shadow-lg backdrop-blur-sm">
        {/* Settings Icon */}
        <button className="absolute left-4 top-4 rounded-full bg-pink-100/50 p-2 transition-colors hover:bg-pink-200/50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-pink-700"
          >
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Login Section */}
          <div className="space-y-6 border-b-2 border-pink-100 pb-6 md:border-b-0 md:border-r-2 md:pb-0 md:pr-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-pink-700">LOG IN</h2>
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div className="space-y-2">
                <label htmlFor="loginEmail" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="loginEmail"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  type="email"
                  required
                  className="flex h-10 w-full rounded-full border border-pink-200 bg-pink-100/50 px-3 py-2 text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="loginPassword" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="loginPassword"
                  type="password"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  className="flex h-10 w-full rounded-full border border-pink-200 bg-pink-100/50 px-3 py-2 text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-pink-600 px-4 py-2 text-lg font-bold text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:opacity-50"
              >
                LOG IN
              </button>
            </form>
          </div>

          {/* Sign Up Section */}
          <div className="space-y-6 pt-6 md:pl-8 md:pt-0">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-pink-700">SIGN UP</h2>
            </div>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-2">
                <label htmlFor="signupEmail" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="signupEmail"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  type="email"
                  required
                  className="flex h-10 w-full rounded-full border border-pink-200 bg-pink-100/50 px-3 py-2 text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signupPassword" className="text-sm font-medium">
                  Password
                </label>
                <input
                  id="signupPassword"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  type="password"
                  required
                  className="flex h-10 w-full rounded-full border border-pink-200 bg-pink-100/50 px-3 py-2 text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="signupName" className="text-sm font-medium">
                  Name
                </label>
                <input
                  id="signupName"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  type="text"
                  required
                  className="flex h-10 w-full rounded-full border border-pink-200 bg-pink-100/50 px-3 py-2 text-sm focus:border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-10 w-full items-center justify-center rounded-full bg-pink-600 px-4 py-2 text-lg font-bold text-white transition-colors hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 disabled:opacity-50"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
