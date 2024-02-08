import { cookies, headers } from "next/headers";
import { createClient } from "../../../utils/supabase/server";
import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY!);
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature")!;
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error: any) {
    return NextResponse.json("Webhook error : " + error.message, {
      status: 400,
    });
  }
  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string,
    );
    if (
      !session?.metadata?.fanProfileId ||
      !session?.metadata?.creatorProfileId
    ) {
      return NextResponse.json("Metadata is required", { status: 400 });
    }

    await supabase.from("subscription").insert({
      fan_profile_id: Number(session?.metadata?.fanProfileId),
      creator_profile_id: Number(session?.metadata?.creatorProfileId),
      stripe_customer_id: subscription.customer as string,
      amount: session.amount_total!,
      active: true,
    });
  } else if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    await supabase
      .from("subscription")
      .update({ active: subscription.status === "active" })
      .eq("stripe_customer_id", subscription.customer as string);
  }
  return NextResponse.json(null, { status: 200 });
}
