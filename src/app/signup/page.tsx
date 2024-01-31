import React, { use } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import Link from "next/link";

import { cookies, headers } from "next/headers";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
type Props = {
  searchParams: {
    message?: string;
  };
};

const SignupPage = ({ searchParams }: Props) => {
  async function signup(formData: FormData) {
    "use server";
    const origin = headers().get("origin")!;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    const userId = data?.user?.id;
    if (userId) {
      // Create supabase profile with "profile" table
      await supabase
        .from("profile")
        .insert({ user_id: userId, name: "", email, username: "" });
    }
    if (error) {
      const message = error.message ?? "Something went wrong";
      return redirect(`/signup?message=${message}`);
    }
    return redirect("/signup?message=Check email to continue sign in process");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-8">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Signup
        </h2>
        <form className="mt-8 space-y-6" action={signup}>
          <Input
            required
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
          <Input
            required
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
          <Button className="w-full">Signup</Button>
        </form>
        <Link href="/login" className="mt-2 block text-center text-blue-600">
          Click here to login
        </Link>
        {searchParams.message && (
          <p className="bg-foregroud/10 mt-4 p-4 text-center text-foreground">
            {searchParams.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignupPage;
