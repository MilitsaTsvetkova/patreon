import {
  HeartIcon,
  ImageIcon,
  MessageCircleIcon,
  TextIcon,
  VideoIcon,
} from "lucide-react";
import { type RouterOutputs } from "../trpc/shared";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";

type Props = {
  post: NonNullable<RouterOutputs["post"]["getPosts"]>[0];
};

const CreatorPost = ({ post }: Props) => {
  return (
    <Card>
      {post.image_url && (
        <img className="w-fill rounded-md bg-slate-300" src={post.image_url} />
      )}
      {post.video_url && (
        <video
          controls
          className="w-fill rounded-md bg-slate-300"
          src={post.video_url}
        />
      )}
      <CardHeader className="flex flex-row items-center pb-4 text-xl font-semibold">
        <span className="mr-2 mt-1.5">
          {post.type === "text" && <TextIcon className="size-5" />}
          {post.type === "image" && <ImageIcon className="size-5" />}
          {post.type === "video" && <VideoIcon className="size-5" />}
        </span>
        <span>{post.title}</span>
      </CardHeader>
      <CardContent className="pb-0">
        <CardDescription>{post.text}</CardDescription>
      </CardContent>
      <CardFooter>
        <div className="mt-4 flex flex-col items-start space-y-4">
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <HeartIcon className="size-5 text-gray-500" />
              <span className="text-gray-700">{post.like.length}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircleIcon className="size-5 text-gray-500" />
              <span className="text-gray-700">{post.comment.length}</span>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreatorPost;
