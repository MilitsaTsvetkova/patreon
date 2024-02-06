import { redirect } from "next/navigation";
import Signout from "../components/Signout";
import { api } from "../trpc/server";
import { Avatar, AvatarImage } from "../components/ui/avatar";
import FanSubscription from "../components/FanSubscription";

export default async function Home() {
  const { profile, subscriptions } = await api.profile.getFanProfile.query();

  if (!profile) redirect("/signup");

  if (!profile.type) redirect("/welcome");

  if (profile.type === "creator") redirect("/creator/profile");

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="flex flex-col items-center">
        <Avatar className="mb-4 mt-2 size-20">
          <AvatarImage
            src={
              profile.avatar_url ??
              `https://avatar.vercel.sh/${profile.username}`
            }
          />
        </Avatar>
        <h1 className="pb-5 text-4xl font-bold">{profile.name}</h1>
        <Signout />
      </header>
      <section className="pb-20 pt-10">
        <h2 className="mb-6 text-center text-2xl font-semibold">
          Your Active Subscriptions
        </h2>
        <div>
          {subscriptions?.length === 0 && (
            <p className="text-center">No active subscriptions</p>
          )}
          {subscriptions?.map((subscription) => (
            <FanSubscription
              key={subscription.id}
              subscription={subscription}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
