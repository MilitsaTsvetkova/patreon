import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const commentRouter = createTRPCRouter({
  createComment: protectedProcedure
    .input(z.object({ postId: z.number(), text: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { data: profile } = await ctx.da
        .from("profile")
        .select("*")
        .eq("user_id", ctx.userId)
        .single();
      if (!profile) return false;
      await ctx.da.from("comment").insert({
        text: input.text,
        post_id: input.postId,
        profile_id: profile.id,
      });
      return true;
    }),
});
