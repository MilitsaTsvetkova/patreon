"use client";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { api } from "../trpc/react";
import { useState } from "react";

const WelcomeTwo = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();
  const updateProfile = api.profile.updateProfile.useMutation();
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Let&apos;s name your Patreon</CardTitle>
        <CardDescription>You can always change this later.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Page Name</Label>
            <Input
              id="name"
              placeholder="Your page name"
              required
              onChange={(e) => setName(e.target.value)}
            ></Input>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Your  username"
              required
              onChange={(e) => setUsername(e.target.value)}
            ></Input>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full"
          onClick={() => {
            updateProfile.mutate({
              name,
              username,
            });
            router.push("/creator/profile");
          }}
        >
          Next
        </Button>
        <Button
          variant="ghost"
          className="w-full"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WelcomeTwo;
