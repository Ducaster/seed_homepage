"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTH_CREDENTIALS, AUTH_COOKIE_NAME, AUTH_TOKEN } from "@/lib/auth";

export async function login(
  _prevState: { error: string } | null,
  formData: FormData
) {
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  if (id !== AUTH_CREDENTIALS.id || password !== AUTH_CREDENTIALS.password) {
    return { error: "아이디 또는 비밀번호가 올바르지 않습니다." };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE_NAME, AUTH_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
  redirect("/");
}
