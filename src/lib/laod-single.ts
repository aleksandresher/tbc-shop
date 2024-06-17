const URL = process.env.NEXT_PUBLIC_BASE_URL;

export async function loadSingle({ id }: { id: string }) {
  console.log("id from fetch", id);
  try {
    const response = await fetch(`${URL}/api/single/${id}`);
    const { product } = await response.json();
    console.log("item from fetch", product);

    return product;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
