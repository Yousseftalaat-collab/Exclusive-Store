import { supabase } from "./supabaseClient";

export interface Product {
  id: string;
  product_id: string;
  title: string;
  description?: string;
  price: number;
  old_price?: number;
  discount?: number;
  rating: number;
  reviews_count: number;
  image: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  category: string;
  subcategory?: string;
  badge_type?: "new" | "discount";
  in_stock: boolean;
  featured: boolean;
  flash_sale: boolean;
  best_selling: boolean;
  free_delivery: boolean;
  return_policy: string;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
  description?: string;
  parent_id?: string;
  display_order: number;
  active: boolean;
}

// Fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }

  return data || [];
};

// Fetch product by ID
export const getProductById = async (
  productId: string,
): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("product_id", productId)
    .single();

  if (error) {
    console.error("Error fetching product:", error);
    return null;
  }

  return data;
};

// Fetch products by category
export const getProductsByCategory = async (
  category: string,
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }

  return data || [];
};

// Fetch flash sale products
export async function getFlashSaleProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("flash_sale", true)
    .eq("in_stock", true);

  if (error) {
    console.error("Flash sale error:", error);
    return [];
  }

  return data || [];
}
// Fetch best selling products
export const getBestSellingProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("best_selling", true)
    .eq("in_stock", true)
    .order("reviews_count", { ascending: false })
    .limit(10);

  if (error) {
    console.error("Error fetching best selling products:", error);
    return [];
  }

  return data || [];
};

// Fetch featured products
export const getFeaturedProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .eq("in_stock", true)
    .order("created_at", { ascending: false })
    .limit(28);

  if (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }

  return data || [];
};

// Fetch all categories
export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return data || [];
};

// Search products
export const searchProducts = async (query: string): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .eq("in_stock", true)
    .limit(20);

  if (error) {
    console.error("Error searching products:", error);
    return [];
  }

  return data || [];
};

// Get related products
export const getRelatedProducts = async (
  productId: string,
  category: string,
  limit: number = 4,
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category)
    .neq("product_id", productId)
    .eq("in_stock", true)
    .limit(limit);

  if (error) {
    console.error("Error fetching related products:", error);
    return [];
  }

  return data || [];
};

// Fetch products by subcategory (for SmartWatch, Phones, Gaming, etc)
export const getProductsBySubCategory = async (
  subcategory: string,
): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .ilike("subcategory", subcategory)
    .eq("in_stock", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products by subcategory:", error);
    return [];
  }

  return data || [];
};
