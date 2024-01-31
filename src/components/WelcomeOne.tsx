"use client";
import { DollarSignIcon, InboxIcon, SparkleIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";

import { useRouter } from "next/navigation";
import { api } from "../trpc/react";

const WelcomeOne = () => {
  const router = useRouter();
  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      router.push("/welcome?step=2");
    },
  });
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Welcome to Patreon</CardTitle>
        <CardDescription>
          There are already more than 250,000 creators on Patreon and
          there&apos;s about to be one more
        </CardDescription>
      </CardHeader>
      <CardContent className="border-t-2 pt-3">
        <ul className="spae-y-3 my-4 text-sm">
          <li className="flex items-center space-x-4">
            <span className="w-6 text-gray-400">
              <SparkleIcon />
            </span>
            <span>Start your own Patreon in just a few steps.</span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="w-6 text-gray-400">
              <InboxIcon />
            </span>
            <span>Invite fans and connect with them for free.</span>
          </li>
          <li className="flex items-center space-x-4">
            <span className="w-6 text-gray-400">
              <DollarSignIcon />
            </span>
            <span>Easy to offer paid memberships.</span>
          </li>
        </ul>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full"
          onClick={() => {
            updateProfile.mutate({
              type: "creator",
            });
          }}
          disabled={updateProfile.isLoading}
        >
          Continue
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          disabled={updateProfile.isLoading}
          onClick={() => {
            updateProfile.mutate({
              type: "fan",
            });
          }}
        >
          Not a creator? Join as a fan
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeOne;
