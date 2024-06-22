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
    const response = await fetch(`${URL}/api/get-products?id=${id}`, {
      cache: "no-cache",
    });
    const { products } = await response.json();
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getAllProduct() {
  try {
    const response = await fetch(`${URL}/api/allproduct`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();
    return data.products || [];
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
    const response = await fetch(`${URL}/api/${category}/all`);
    const { items } = await response.json();

    return items;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getCart() {
  const response = await fetch(`${URL}/api/cart/get`);
  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return response.json();
}

export async function getFaceProducts() {
  try {
    const response = await fetch(`${URL}/api/get-products/face`, {
      cache: "no-cache",
    });
    const { products } = await response.json();

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getBodyProducts() {
  try {
    const response = await fetch(`${URL}/api/get-products/body`, {
      cache: "no-cache",
    });
    const { products } = await response.json();

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
    const response = await fetch(`${URL}/api/single/${id}`);
    const data = await response.json();

    return data.product;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function checkUserAuthentication() {
  try {
    const response = await fetch(`${URL}/api/checkuser`, {
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
    const response = await fetch(`${URL}/api/products/all`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const data = await response.json();

    return data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getUser() {
  const response = await fetch(`${URL}/api/user/get`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function getStripeProducts() {
  try {
    const response = await fetch(`${URL}/api/getproducts`);
    const { data } = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getStripeProdutsList() {
  const response = await fetch(`${URL}/api/stripeproductlist`);
  if (!response.ok) {
    throw new Error("Failed to fetch user");
  }
  return response.json();
}

export async function getOrders() {
  const response = await fetch(`${URL}/api/orders/get`);
  if (!response.ok) {
    throw new Error("Failed to fetch order items");
  }
  return response.json();
}

export async function getAllBlog() {
  try {
    const response = await fetch(`${URL}/api/allblog`);
    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }
    const data = await response.json();

    return data.blogs;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export async function loadSingleBlog({ id }: { id: string }) {
  try {
    const response = await fetch(`${URL}/api/blog/single/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch blog with id ${id}`);
    }
    const data = await response.json();

    return data.blog;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
}

export async function getByCategory({ category }: { category: string }) {
  try {
    const response = await fetch(
      `${URL}/api/products/group?category=${category}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getMostPopular() {
  try {
    const response = await fetch(`${URL}/api/products/popular`);

    if (!response.ok) {
      throw new Error("Failed to fetch popular products");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching popular products:", error);
    throw error;
  }
}
