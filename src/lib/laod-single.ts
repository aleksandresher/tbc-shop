export async function loadSingle({
  category,
  id,
}: {
  category: string;
  id: string;
}) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/${category}/single/${id}`
    );
    const { items } = await response.json();

    return items;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
