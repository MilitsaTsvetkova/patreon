import Link from "next/link";
import { type RouterOutputs } from "../trpc/shared";
import ProfileAvatar from "./ProfileAvatar";
import { Button } from "./ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type Props = {
  subscription: NonNullable<
    RouterOutputs["profile"]["getFanProfile"]["subscriptions"]
  >[0];
};
const FanSubscription = ({ subscription }: Props) => {
  return (
    <section className="w-fill space-y-5">
      <Card className="mx-auto flex w-[450px] items-center p-2">
        <ProfileAvatar
          className="mx-4"
          avatarUrl={subscription.profile?.avatar_url!}
          username={subscription.profile?.username!}
        />
        <div className="flex-grow">
          <CardHeader className="p-2">
            <CardTitle>{subscription.profile?.name}</CardTitle>
            <CardDescription>Access to premium content</CardDescription>
          </CardHeader>
        </div>
        <CardFooter className="flex flex-none flex-col items-center space-y-2 p-2">
          <Button asChild className="w-full">
            <Link href={`/${subscription.profile?.username}`}>View</Link>
          </Button>
          <Button variant="outline" className="w-full">
            <Link href={`/${subscription.profile?.username}`}>Manage</Link>
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
};

export default FanSubscription;
