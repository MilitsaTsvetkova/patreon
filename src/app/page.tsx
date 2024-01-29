import { unstable_noStore as noStore } from "next/cache";

import { api } from "@/trpc/server";

export default async function Home() {
  noStore();
  const hello = await api.post.hello.query({ text: "from tRPC" });

  return <div>home</div>;
}
