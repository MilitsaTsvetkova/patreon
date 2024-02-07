import { notFound } from "next/navigation";
import { api } from "../../trpc/server";
import ProfileHeader from "../../components/ProfileHeader";
import ProfileTiers from "../../components/ProfileTiers";
import ProfilePost from "../../components/ProfilePost";

type Props = {
  params: {
    username: string;
  };
};

const ProfilePage = async ({ params: { username } }: Props) => {
  const { profile, isSubscribed } =
    await api.profile.getProfileByUsername.query({ username });
  if (!profile) {
    notFound();
  }
  return (
    <div>
      <div
        className="w-fill h-[25vw] bg-gray-200 bg-cover bg-center bg-no-repeat p-4"
        style={{ backgroundImage: `url(${profile.cover_url})` }}
      />
      <div className="mx-auto max-w-4xl px-4 py-8">
        <ProfileHeader profile={profile} />
        {!isSubscribed && <ProfileTiers profile={profile} />}
        <section>
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Recent posts by {profile.name}
          </h2>
          <div className="space-y-6">
            {profile.post.map((post) => (
              <ProfilePost
                post={post}
                key={post.id}
                isSubscribed={isSubscribed}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
