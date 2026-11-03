import { z } from "zod";

export const productFormSchema = z.object({
  sku: z.string().min(1, "SKU is required"),
  name: z.string().min(1, "Name is required"),
  quantity: z
    .number({ invalid_type_error: "Quantity must be a number" })
    .positive("Quantity must be greater than 0")
    .int("Quantity must be an integer"),
  pricing: z
    .number({ invalid_type_error: "Pricing must be a number" })
    .positive("Pricing must be greater than 0"),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
