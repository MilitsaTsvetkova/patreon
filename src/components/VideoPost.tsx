"use client";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import uploadFile from "../lib/uploadFile";
import { api } from "../trpc/react";
import { createClient } from "../utils/supabase/client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const VideoPost = () => {
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
      type: "video",
      video_url: url,
    });
  };
  const uploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadFile(supabase, file, "videos");
      setUrl(url);
    }
  };
  return (
    <div>
      {url ? (
        <video src={url} controls className="pb-4" />
      ) : (
        <div className="mb-4 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 text-gray-500">
          <VideoIcon className="mb-4 size-12" />
          <p className="mb-2">Drag and drop a video file here</p>
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept="video/*"
            onChange={uploadVideo}
          />
          <Button>
            <label className="cursor-pointer" htmlFor="fileInput">
              Select video file
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

export default VideoPost;
