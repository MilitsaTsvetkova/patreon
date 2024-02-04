import React from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import { api } from "../../../trpc/server";
import CreatorPost from "../../../components/CreatorPost";

const PostsPage = async () => {
  const posts = await api.post.getPosts.query();
  return (
    <Card>
      <CardHeader className="text-xl font-semibold">
        All published posts
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {posts?.map((post) => <CreatorPost key={post.id} post={post} />)}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostsPage;
