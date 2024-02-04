import React from "react";
import { Card, CardContent, CardHeader } from "../../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import TextPost from "../../../components/TextPost";
import ImagePost from "../../../components/ImagePost";
import VideoPost from "../../../components/VideoPost";

const PostPage = () => {
  return (
    <Card>
      <Tabs defaultValue="text">
        <header className="flex items-center justify-between pr-6">
          <CardHeader className="text-xl font-semibold">
            Create your Post
          </CardHeader>
          <TabsList>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="image">Image</TabsTrigger>
            <TabsTrigger value="video">Video</TabsTrigger>
          </TabsList>
        </header>
        <CardContent>
          <TabsContent value="text">
            <TextPost />
          </TabsContent>
          <TabsContent value="image">
            <ImagePost />
          </TabsContent>
          <TabsContent value="video">
            <VideoPost />
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default PostPage;
