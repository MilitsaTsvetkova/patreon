import { notFound } from "next/navigation";
import { api } from "../../../trpc/server";
import CreatorProfile from "../../../components/CreatorProfile";

const CreatorProfilePage = async () => {
  const profile = await api.profile.getCreatorProfile.query();
  if (!profile) {
    notFound();
  }
  return <CreatorProfile profile={profile} />;
};

export default CreatorProfilePage;
