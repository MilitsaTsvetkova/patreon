"use client";
import { useRouter } from "next/navigation";
import { RouterOutputs } from "../trpc/shared";
import { createClient } from "../utils/supabase/client";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  profile: NonNullable<
    RouterOutputs["profile"]["getProfileByUsername"]["profile"]
  >;
};

const ProfileTiers = ({ profile }: Props) => {
  const supabase = createClient();
  const router = useRouter();
  const handleJoin = async () => {
    const { data: session } = await supabase.auth.getSession();
    if (!session) {
      router.push("/signup");
    } else {
      const response = await fetch(
        `/api/checkout?creator_profile_id=${profile.id}`,
      );
      const data = await response.json();
      router.push(data.url);
    }
  };
  return (
    <section className="pb-20 pt-10">
      <h2 className="mb-6 text-center text-2xl font-semibold">
        Choose your membership
      </h2>
      <Card className="mx-auto w-full max-w-[500px]">
        <CardHeader>
          <CardTitle>Subscribe</CardTitle>
          <CardDescription>$5/month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button className="w-full" onClick={handleJoin}>
            Join
          </Button>
          <p>
            Get complete access of all text, media and video posts for just
            $5/month
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfileTiers;
