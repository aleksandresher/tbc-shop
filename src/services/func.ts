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

export async function loadSingle({ id }: { id: string }) {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/single/${id}`
    );
    const { items } = await response.json();

    return items;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function checkUserAuthentication() {
  try {
    const response = await fetch("/api/checkuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return "unauthenticated";
  }
}

export async function getMyProducts() {
  try {
    const response = await fetch("http://localhost:3000/api/products/all");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log("data", data);
    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getUser() {
  const response = await fetch(`/api/user/get`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function getStripeProducts() {
  try {
    const response = await fetch(`http://localhost:3000/api/getproducts`);
    const { data } = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getStripeProdutsList() {
  const response = await fetch(`/api/stripeproductlist`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function getOrders() {
  const response = await fetch(`/api/orders/get`);
  if (!response.ok) {
    throw new Error("Failed to fetch order items");
  }
  return response.json();
}

export async function getAllBlog() {
  try {
    const response = await fetch("http://localhost:3000/api/blog/getall");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    console.log("data from blogs", data);
    return data.blogs;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}
