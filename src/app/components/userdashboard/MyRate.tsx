"use client";

import { Rating } from "react-simple-star-rating";

export default function MyRate({
  amount,
  total,
}: {
  amount: number;
  total: number;
}) {
  const avarageRating = total / amount;

  return (
    <section className="flex items-center">
      <div className="App">
        <Rating initialValue={avarageRating} className="hidden" />
      </div>
      <span className="flex gap-1">
        <p>{total}</p>
        <p>({amount})</p>
      </span>
    </section>
  );
}
