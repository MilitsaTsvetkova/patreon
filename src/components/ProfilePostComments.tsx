import { useState } from "react";
import { RouterOutputs } from "../trpc/shared";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Props = {
  post: NonNullable<
    RouterOutputs["profile"]["getProfileByUsername"]["profile"]
  >["post"][0];
};
const ProfilePostComments = ({ post }: Props) => {
  const [comment, setComment] = useState("");
  return (
    <section className="w-full">
      <div className="flex items-center space-x-2">
        <Input
          className="flex-1"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button>Submit</Button>
      </div>
      <div className="space-y-5 pt-5">
        {post.comment.map((comment) => (
          <ProfilePostComment key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
};

export default ProfilePostComments;

function ProfilePostComment({
  comment,
}: {
  comment: NonNullable<
    RouterOutputs["profile"]["getProfileByUsername"]["profile"]
  >["post"][0]["comment"][0];
}) {
  const postedAt = dayjs().to(comment.created_at);
  return (
    <div className="flex items-start gap-4 text-sm">
      <Avatar className="size-10 border">
        <AvatarImage
          src={`https://avatar.vercel.sh/${comment.profile?.username}`}
        />
      </Avatar>
      <div className="grid gap-1.5">
        <div className="flex items-center gap-2">
          <div className="font-semibold">{comment.profile?.username}</div>
          <div className="text-xs text-gray-500">{postedAt}</div>
        </div>
      </div>
    </div>
  );
}
