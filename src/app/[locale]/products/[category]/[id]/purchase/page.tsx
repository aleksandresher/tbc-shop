import { CheckoutForm } from "@/app/components/checkout/CheckoutForm";
import { loadSingle } from "@/lib/laod-single";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({ params }: { params: any }) {
  const { id, category } = params;

  const item = await loadSingle({ id, category });
  //   const price = Number(item.price);
  const price = 450;

  //   if (isNaN(price)) {
  //     throw new Error("Invalid price value");
  //   }
  //   const amountInCents = Math.round(price * 100);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: price,
    currency: "USD",
    metadata: { productId: item.id },
  });

  if (paymentIntent.client_secret == null) {
    throw Error("Stripe failed to create payment intent");
  }
  return (
    <CheckoutForm
      product={item[0]}
      clientSecret={paymentIntent.client_secret}
    />
  );
}
