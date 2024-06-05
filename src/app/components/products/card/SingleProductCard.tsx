interface Card {
  title: string;
  price: number;
  description: string;
}

interface CardProps {
  item: Card;
}

export default function SingleProductCard({ item }: CardProps) {
  return (
    <section className="flex flex-col border border-gray-200 p-3">
      <h1>{item.title}</h1>
      <p>{item.price}</p>
      <p>{item.description}</p>
    </section>
  );
}
