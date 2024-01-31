"use client";
import { LogOutIcon } from "lucide-react";
import { createClient } from "../utils/supabase/client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const Signout = () => {
  const supabase = createClient();
  const router = useRouter();

  async function signout() {
    await supabase.auth.signOut();
    router.refresh();
    router.push("/login");
  }

  return (
    <Button variant="ghost" size="sm" onClick={signout}>
      <LogOutIcon className="mr-2 size-5" />
      Sign out
    </Button>
  );
};

export default Signout;
