import { Order } from "@/models/Order";
// import { buffer } from "micro";
import { NextRequest, NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SK);

// First of all, if you want to receive information from Stripe after checkout success. You need to run Stripe CLI with this command in your terminal.

// => stripe login

// and then you need to allow access and you will get api token for your computer, next we run command below to forward Stripe to our webhooks.

// => stripe listen --forward-to localhost:3001/api/webhook

// after run command you will get signing secret

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export const POST = async (req: NextRequest) => {
  let event;
  // Only verify the event if you have an endpoint secret defined.
  // Otherwise use the basic event deserialized with JSON.parse
  if (endpointSecret) {
    // Get the signature sent by Stripe
    const signature = req.headers.get("stripe-signature") as string | string[];
    try {
      event = stripe.webhooks.constructEvent(
        // Instead of using micro to buffer the body, simply use await req.text() to convert the raw body to a string, then pass the string to stripe.webhooks.constructEvent.
        await req.text(),
        signature,
        endpointSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return new NextResponse({ status: 400 });
    }
  }

  // Update paid in Order collection in mongodb
  switch (event.type) {
    case "checkout.session.completed":
      const data = event.data.object;
      // console.log(data);
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === "paid";
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId, {
          paid: true,
        });
      }
      break;

    // ... handle other event types
    case "payment_intent.payment_failed":
      // Handle failed payment intent event
      console.log("Payment failed:", event.data.object.metadata.orderId);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ status: 200 });
};
