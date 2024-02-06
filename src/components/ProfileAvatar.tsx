import { cn } from "../lib/utils";
import { Avatar, AvatarImage } from "./ui/avatar";

type Props = {
  avatarUrl?: string;
  username?: string;
  className?: string;
};
const ProfileAvatar = ({ avatarUrl, username, className }: Props) => {
  return (
    <Avatar className={cn("mb-4 mt-2 size-20", className)}>
      <AvatarImage src={avatarUrl ?? `https://avatar.vercel.sh/${username}`} />
    </Avatar>
  );
};

export default ProfileAvatar;
