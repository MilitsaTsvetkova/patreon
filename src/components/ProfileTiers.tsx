import { RouterOutputs } from "../trpc/shared";
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
          <Button className="w-full">Join</Button>
          <p>
            Get complete access o all text, media and video posts for just
            $5/month
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default ProfileTiers;
