import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getFanProfile: publicProcedure.query(async ({ ctx }) => {
    const { data: profile } = await ctx.da
      .from("profile")
      .select("*")
      .eq("user_id", ctx.userId)
      .single();
    return profile;
  }),

  updateProfile: protectedProcedure
    .input(
      z.object({
        name: z.string().optional(),
        about: z.string().optional(),
        type: z.string().optional(),
        cover_url: z.string().optional(),
        avatar_url: z.string().optional(),
        username: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.da
        .from("profile")
        .update({
          name: input.name,
          about: input.about,
          type: input.type,
          cover_url: input.cover_url,
          avatar_url: input.avatar_url,
          username: input.username,
        })
        .eq("user_id", ctx.userId);
      return true;
    }),

  getCreatorProfile: protectedProcedure.query(async ({ ctx }) => {
    const { data: profile } = await ctx.da
      .from("profile")
      .select("*")
      .eq("user_id", ctx.userId)
      .single();
    return profile;
  }),
});
