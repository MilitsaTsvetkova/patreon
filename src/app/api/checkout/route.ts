import { cookies, headers } from "next/headers";
import { createClient } from "../../../utils/supabase/server";
import { NextResponse } from "next/server";

import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const creatorProfileId = searchParams.get("creator_profile_id")!;
    const cookiesStore = cookies();
    const referer = headers().get("referer");
    const supabase = createClient(cookiesStore);
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const { data: profile } = await supabase
      .from("profile")
      .select("*")
      .eq("user_id", session?.user.id ?? "")
      .single();
    if (!profile || !creatorProfileId) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }
    const { data: subscription } = await supabase
      .from("subscription")
      .select("*")
      .eq("fan_profile_id", profile.id)
      .eq("creator_profile_id", creatorProfileId)
      .single();
    if (subscription) {
      const billingPortal = await stripe.billingPortal.sessions.create({
        customer: subscription.stripe_customer_id,
      });
      return NextResponse.json({ url: billingPortal.url });
    }
    const checkOutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: profile.email,
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      metadata: {
        fanProfileId: profile.id,
        creatorProfileId,
      },
      success_url: `${referer}?session_id={CHECKOUT_SESSION_ID}`,
    });
    return NextResponse.json({ url: checkOutSession.url });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
