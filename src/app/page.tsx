import { redirect } from "next/navigation";
import Signout from "../components/Signout";
import { api } from "../trpc/server";

export default async function Home() {
  const profile = await api.profile.getFanProfile.query();

  if (!profile) redirect("/signup");

  if (!profile.type) redirect("/welcome");

  if (profile.type === "creator") redirect("/creator/profile");

  return <Signout />;
}
