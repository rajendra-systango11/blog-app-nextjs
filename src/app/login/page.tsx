"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    if (res?.ok) {
      console.log("Login successful");
       setTimeout(() => {
    router.push('/');
  }, 300); // 300ms delay
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <main className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          onChange={handleChange}
          value={form.username}
          placeholder="Username"
          className="w-full border p-2 rounded"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={form.password}
          placeholder="Password"
          className="w-full border p-2 rounded"
        />
        {error && <p className="text-red-600">{error}</p>}
        <button className="bg-blue-600 text-white p-2 rounded w-full">
          Login
        </button>
      </form>
    </main>
  );
}
