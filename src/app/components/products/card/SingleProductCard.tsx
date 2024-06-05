import AddToCart from "../../cart/AddToCart";

interface Card {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
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
      <AddToCart productId={item.id} userId={12} product_type={item.category} />
    </section>
  );
}
