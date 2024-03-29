"use client";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { api } from "../trpc/react";
import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { createClient } from "../utils/supabase/client";
import uploadFile from "../lib/uploadFile";

const ImagePost = () => {
  const [url, setUrl] = useState("");
  const supabase = createClient();
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
      type: "image",
      image_url: url,
    });
  };
  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(supabase, file, "images");
      setUrl(url);
    }
  };
  return (
    <div>
      {url ? (
        <img src={url} className="pb-4" alt="image" />
      ) : (
        <div className="mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-500">
          <ImageIcon className="mb-4 size-12" />
          <p className="mb-2">Drag and drop an image file here</p>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="image/*"
            onChange={uploadImage}
          />
          <Button>
            <label className="cursor-pointer" htmlFor="fileInput">
              Select image file
            </label>
          </Button>
        </div>
      )}
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
    </div>
  );
};

export default ImagePost;
