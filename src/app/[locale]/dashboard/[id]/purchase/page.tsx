import { CheckoutForm } from "@/app/components/checkout/CheckoutForm";
import { loadSingle } from "@/services/func";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
// const client_secret = process.env.STRIPE_SECRET_KEY as string;
export default async function PurchasePage({
  params,
}: {
  params: { id: string };
}) {
  console.log("params", params);
  const { id } = params;
  console.log("id", id);

  const item = await loadSingle({ id });

  //   const price = Number(item.price);

  const price = 450;

  if (isNaN(price)) {
    throw new Error("Invalid price value");
  }
  const amountInCents = Math.round(price * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "USD",
    metadata: { productId: id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }
  return (
    <CheckoutForm clientSecret={paymentIntent.client_secret} product={item} />
  );
}
