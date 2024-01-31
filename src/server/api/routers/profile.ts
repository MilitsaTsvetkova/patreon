import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const profileRouter = createTRPCRouter({
  getFanProfile: publicProcedure.query(async ({ ctx }) => {
    const { data: profile } = await ctx.da
      .from("profile")
      .select("*")
      .eq("user_id", ctx.userId)
      .single();
    return profile;
  }),
});
