import { profileRouter } from "@/server/api/routers/profile";
import { createTRPCRouter } from "@/server/api/trpc";
import { postRouter } from "./routers/post";
import { subscriptionRouter } from "./routers/subscription";
import { likeRouter } from "./routers/like";
import { commentRouter } from "./routers/comment";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  profile: profileRouter,
  post: postRouter,
  subscribe: subscriptionRouter,
  like: likeRouter,
  comment: commentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
