"use client";

// import { userOrderExists } from "@/app/actions/orders";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Elements,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
import Image from "next/image";
import { FormEvent, useState } from "react";

interface CartItem {
  cart_id: number;
  product_id: number;
  quantity: number;
  added_at: string; // You may want to convert this to a Date type if needed
  image: string;
  numberofvotes: number;
  totalvotes: number;
  size: string;
  languages: {
    en: LanguageDetails;
    ka: LanguageDetails;
  };
}

interface LanguageDetails {
  title: string;
  category: string;
  country: string;
  brand: string;
  sdescription: string;
  ldescription: string;
  price: string; // You may want to convert this to a number type if needed
  currency: string;
}

interface CheckoutProps {
  product: CartItem[];
  clientSecret: string;
}

type CheckoutFormProps = {
  product: {
    id: string;
    image: string;
    title: string;
    priceInCents: number;
    category: string;
    description: string;
    price: number;
  };
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export function CheckoutForm({ product, clientSecret }: CheckoutProps) {
  return (
    <div>
      {product.map((item) => (
        <div className="flex gap-4 items-center" key={item.product_id}>
          <div className="aspect-video flex-shrink-0 w-1/3 relative">
            <Image
              src={item.image ? item.image : "/no-image.svg"}
              fill
              alt={item.languages.en.title}
              className="object-cover"
            />
          </div>
          <div>
            <h1>{item.languages.en.title}</h1>
            <p>{item.languages.en.category}</p>
          </div>
        </div>
      ))}
      <Elements
        options={{ clientSecret }}
        stripe={stripePromise}
        key={clientSecret}
      >
        <Form
          price={parseFloat(product[0]?.languages.en.price)}
          productId={product[0]?.product_id.toString()}
        />
      </Elements>
    </div>
  );
}

function Form({ price, productId }: { price: number; productId: string }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [email, setEmail] = useState<string>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (stripe == null || elements == null || email == null) return;

    setIsLoading(true);

    // const orderExists = await userOrderExists(email, productId);

    // if (orderExists) {
    //   setErrorMessage(
    //     "You have already purchased this product. Try downloading it from the My Orders page"
    //   );
    //   setIsLoading(false);
    //   return;
    // }

    stripe
      .confirmPayment({
        elements,
        confirmParams: {
          return_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/stripe/purchase-success`,
        },
      })
      .then(({ error }) => {
        if (error.type === "card_error" || error.type === "validation_error") {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred");
        }
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          {errorMessage && (
            <CardDescription className="text-destructive">
              {errorMessage}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <PaymentElement />
          <div className="mt-4">
            <LinkAuthenticationElement
              onChange={(e) => setEmail(e.value.email)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            size="lg"
            disabled={stripe == null || elements == null || isLoading}
          >
            {isLoading ? "Purchasing..." : `Purchase - ${price}`}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
