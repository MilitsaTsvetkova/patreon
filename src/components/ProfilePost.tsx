import {
  HeartIcon,
  ImageIcon,
  Link,
  LockIcon,
  MessageCircleIcon,
  TextIcon,
  VideoIcon,
} from "lucide-react";
import { RouterOutputs } from "../trpc/shared";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";

type Props = {
  post: NonNullable<
    RouterOutputs["profile"]["getProfileByUsername"]["profile"]
  >["post"][0];
  isSubscribed: boolean;
};

const ProfilePost = ({ post, isSubscribed }: Props) => {
  return (
    <Card>
      {post.image_url && isSubscribed && (
        <img className="w-full rounded-md bg-slate-300" src={post.image_url} />
      )}
      {post.video_url && isSubscribed && (
        <video
          controls
          className="w-full rounded-md bg-slate-300"
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
        <div className="mt-4 flex w-full flex-col items-start space-y-4">
          {!isSubscribed && (
            <Link href="/signup">
              <Button variant="secondary">
                <LockIcon className="mr-1 size-4" />
                Join to unlock
              </Button>
            </Link>
          )}
          {isSubscribed && (
            <div className="flex space-x-4">
              <Button
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <HeartIcon className="size-5 text-gray-500" />
                <span className="text-gray-700">{post.like.length}</span>
              </Button>
              <Button
                variant="secondary"
                className="flex items-center space-x-2"
              >
                <MessageCircleIcon className="size-5 text-gray-500" />
                <span className="text-gray-700">{post.comment.length}</span>
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProfilePost;
