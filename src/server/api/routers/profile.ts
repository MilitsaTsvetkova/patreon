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
    const { data: subscriptions } = await ctx.da
      .from("subscription")
      .select("*,profile!subscription_creator_profile_id_fkey(*)")
      .eq("fan_profile_id", profile?.id ?? "")
      .eq("active", true)
      .order("created_at", { ascending: false });
    return { profile, subscriptions };
  }),
  getProfileByUsername: publicProcedure
    .input(z.object({ username: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const { data: profile } = await ctx.da
        .from("profile")
        .select("*,post(*,like(*),comment(*,profile(*)))")
        .eq("username", input.username ?? "")
        .order("created_at", { ascending: false, referencedTable: "post" })
        .order("created_at", {
          ascending: false,
          referencedTable: "post.comment",
        })
        .single();
      const { data: authProfile } = await ctx.da
        .from("profile")
        .select("*")
        .eq("user_id", ctx.userId)
        .single();
      const { data: subscription } = await ctx.da
        .from("subscription")
        .select("*")
        .eq("fan_profile_id", authProfile?.id ?? "")
        .eq("creator_profile_id", profile?.id ?? "")
        .eq("active", true)
        .single();
      const isSubscribed = !!subscription || profile?.user_id === ctx.userId;
      return { profile, isSubscribed };
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
