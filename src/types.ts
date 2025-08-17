import * as zod from "zod";

export interface Product {
  id: number;
  name: string;
  title: string;
  description: string;
  shortDescription: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
}

export type ProductsList = Product[];

export interface Category {
  slug: string;
  name: string;
  icon: React.ReactElement;
}

export type CategoriesList = Category[];

export interface ProductTypes {
  color: string;
  size: string;
}

export type cartItemsType = Product & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsList = cartItemsType[];

export const shippingSchema = zod.object({
  name: zod
    .string("Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(100, "Name cannot exceed 100 characters"),
  email: zod.string("Email is required").email("Invalid email format"),
  phone: zod
    .string("Phone number is required")
    .min(10, "Phone number must be at least 10 characters")
    .max(15, "Phone number cannot exceed 15 characters"),
  address: zod
    .string("Address is required")
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),
  city: zod
    .string("City is required")
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters"),
});


export type ShippingFormData = zod.infer<typeof shippingSchema>;