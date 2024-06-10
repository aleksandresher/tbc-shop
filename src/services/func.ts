import { Url } from "next/dist/shared/lib/router/router";

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
      `http://localhost:3000/api/get-products?id=${id}`,
      { cache: "no-cache" }
    );
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getAllProduct() {
  try {
    const response = await fetch("http://localhost:3000/api/allproduct");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products || []; // Return an empty array if data.products is undefined
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function loadProductsByCategory({
  category,
}: {
  category: string;
}) {
  try {
    const response = await fetch(`http://localhost:3000/api/${category}/all`);
    const { items } = await response.json();

    return items;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCart() {
  const response = await fetch(`/api/cart/get`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return response.json();
}

export async function getFaceProducts() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get-products/face`,
      { cache: "no-cache" }
    );
    const { products } = await response.json();
    console.log("products", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getBodyProducts() {
  try {
    const response = await fetch(
      `http://localhost:3000/api/get-products/body`,
      { cache: "no-cache" }
    );
    const { products } = await response.json();
    console.log("products", products);
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function updateUser({ avatar }: { avatar: Url }) {
  try {
    const res = await fetch(`${URL}/api/user/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(avatar),
    });

    if (!res.ok) {
      throw new Error("Failed to update user");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// export async function loadSingle({
//   category,
//   id,
// }: {
//   category: string;
//   id: string;
// }) {
//   try {
//     const response = await fetch(
//       `http://localhost:3000/api/${category}/single/${id}`
//     );
//     const { items } = await response.json();

//     return items;
//   } catch (error) {
//     console.error("Error fetching products:", error);
//     return [];
//   }
// }
