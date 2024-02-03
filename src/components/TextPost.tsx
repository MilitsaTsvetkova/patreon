"use client";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { api } from "../trpc/react";

const TextPost = () => {
  const router = useRouter();
  const createPost = api.post.createPost.useMutation({
    onSuccess: () => {
      router.push("/creator/posts");
      router.refresh();
    },
  });
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    const text = formData.get("text") as string;
    createPost.mutate({
      title,
      text,
      type: "text",
    });
  };
  return (
    <form onSubmit={onSubmit}>
      <Input
        id="title"
        name="title"
        className="mb-4 p-4 text-xl"
        placeholder="Add a title"
        required
      />
      <Textarea
        id="text"
        name="text"
        className="h-60 p-4 text-base"
        placeholder="Tell a story"
      />
      <div className="mt-4 flex items-center justify-between">
        <span />
        <Button disabled={createPost.isLoading}>
          {createPost.isLoading ? "Publishing..." : "Publish"}
        </Button>
      </div>
    </form>
  );
};

export default TextPost;
