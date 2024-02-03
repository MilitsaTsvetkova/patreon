"use client";
import { ExternalLinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { api } from "../trpc/react";
import { type RouterOutputs } from "../trpc/shared";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Input } from "./ui/input";

type Props = {
  profile: NonNullable<RouterOutputs["profile"]["getCreatorProfile"]>;
};

const CreatorProfile = ({ profile }: Props) => {
  const router = useRouter();
  const updateProfile = api.profile.updateProfile.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const username = String(formData.get("username")).replace(/\s+/g, "");
    const about = formData.get("about") as string;
    updateProfile.mutate({
      name,
      username,
      about,
    });
  };
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between text-xl font-semibold">
        <span>Customize your profile</span>
        <Button asChild>
          <Link href={`/${profile.username}`} target="_blank">
            <ExternalLinkIcon className="mr-1 size-4" />
            Preview
          </Link>
        </Button>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="name"
              >
                Name of Page
              </label>
              <Input
                name="name"
                id="name"
                placeholder="Your page name"
                defaultValue={profile.name}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <Input
                name="username"
                id="username"
                placeholder="Your username"
                defaultValue={profile.username}
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium text-gray-700"
                htmlFor="about"
              >
                What are you creating?
              </label>
              <Input
                name="about"
                id="about"
                placeholder="Your My page is for..."
                defaultValue={profile.about ?? ""}
              />
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700">
                Avatar image (400px x 400px)
              </p>
              <Avatar>
                <AvatarImage
                  src={
                    profile.avatar_url ??
                    `https://avatar.vercel.sh/${profile.username}`
                  }
                />
              </Avatar>
              <Input
                type="file"
                name="avatar_url"
                id="avatar_url"
                className="hidden"
                accept="image/*"
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="mt-2"
              >
                <label htmlFor="avatar_url" className="cursor-pointer">
                  Upload avatar
                </label>
              </Button>
            </div>
            <div>
              <p className="block text-sm font-medium text-gray-700">
                Cover image (1600px x 400px)
              </p>
              {profile.cover_url ? (
                <Image
                  src={profile.cover_url}
                  className="object-fit h-[200px] w-auto rounded-lg"
                  alt="cover image"
                />
              ) : (
                <div className="h-[200px] w-full rounded-lg bg-gray-100"></div>
              )}
              <Input
                type="file"
                name="cover_url"
                id="cover_url"
                className="hidden"
                accept="image/*"
              />
              <Button
                type="button"
                size="sm"
                variant="secondary"
                className="mt-2"
              >
                <label htmlFor="cover_url" className="cursor-pointer">
                  Upload cover
                </label>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={updateProfile.isLoading}>
            {updateProfile.isSuccess ? "Saved" : "Save"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreatorProfile;
