"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (authError) {
      setError("بيانات الدخول غير صحيحة.");
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  const inputClass =
    "w-full p-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent";

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dark to-primary px-4"
      dir="rtl"
    >
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md space-y-4"
      >
        <div className="text-center mb-6">
          <i className="fas fa-lock text-5xl text-primary mb-3"></i>
          <h1 className="text-2xl font-bold text-primary">لوحة تحكم المسؤول</h1>
          <p className="text-sm text-slate-500 mt-1">
            مؤسسة السملالي لتعليم السياقة
          </p>
        </div>

        <div>
          <label className="block mb-1 font-medium">البريد الإلكتروني</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            autoComplete="email"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">كلمة المرور</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputClass}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <p className="text-red-500 text-center text-sm bg-red-50 p-2 rounded-lg">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent text-primary-dark p-3 rounded-full font-bold hover:bg-accent-hover transition-all disabled:opacity-50"
        >
          {loading ? "جار الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}
