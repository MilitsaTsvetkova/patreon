import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const subscriptionRouter = createTRPCRouter({
  getSubscriptions: protectedProcedure.query(async ({ ctx }) => {
    const { data: profile } = await ctx.da
      .from("profile")
      .select("*")
      .eq("user_id", ctx.userId)
      .single();
    const { data: subscriptions } = await ctx.da
      .from("subscription")
      .select("*,profile!subscription_fan_profile_id_fkey(*)")
      .eq("creator_profile_id", profile?.id!)
      .order("created_at", { ascending: false });
    return subscriptions ?? [];
  }),
});
