"use client";

import { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";
import { SIGNUP_API } from "@/constants/endpoints";

const SignUp = () => {
  const router = useRouter();
  const [authData, setAuthData] = useState({
    email: "",
    password: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key: keyof typeof authData, value: string) => {
    setAuthData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(SIGNUP_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      router.push("/login");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-screen">
      <AuthForm
        type="signup"
        values={authData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
    </main>
  );
};

export default SignUp;
