const URL = process.env.NEXT_PUBLIC_BASE_URL;

interface UserProps {
  name: string;
  email: string;
  password: string;
}

export async function createUser(userData: UserProps) {
  try {
    const res = await fetch(`${URL}/api/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error("Failed to create user");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function getProducts({ id }: { id: string }) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get-products?id=${id}`
    );
    const { products } = await response.json();
    console.log("products", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
