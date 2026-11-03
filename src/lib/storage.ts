import { Product, ProductFormData } from "@/types/product";

const STORAGE_KEY = "vyrak-products";

function generateId(): string {
  return crypto.randomUUID();
}

export function getProducts(): Product[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Product[];
  } catch (error) {
    console.error("Error reading products from localStorage:", error);
    return [];
  }
}

export function saveProduct(formData: ProductFormData): Product {
  const newProduct: Product = {
    id: generateId(),
    ...formData,
    createdAt: new Date().toISOString(),
  };

  try {
    const products = getProducts();
    products.push(newProduct);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    return newProduct;
  } catch (error) {
    console.error("Error saving product to localStorage:", error);
    throw new Error("Failed to save product");
  }
}

export function clearProducts(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing products from localStorage:", error);
  }
}
