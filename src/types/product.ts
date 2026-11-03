export interface Product {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  pricing: number;
  createdAt: string;
}

export interface ProductFormData {
  sku: string;
  name: string;
  quantity: number;
  pricing: number;
}
