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

export type ShippingType = zod.infer<typeof shippingSchema>;

export const PaymentsSchema = zod.object({
  name: zod
    .string("Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(100, "Name cannot exceed 100 characters"),
  cardNumber: zod
    .string("Card number is required")
    .min(19, "Card number must be at least 19 characters")
    .max(19, "Card number must be exactly 19 characters")
    .regex(/^\d{4} \d{4} \d{4} \d{4}$/, "Card number must be in format XXXX XXXX XXXX XXXX"),
  expiryDate: zod
    .string("Expiry date is required")
    .min(5, "Expiry date must be in MM/YY format")
    .max(5, "Expiry date must be in MM/YY format")
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: zod
    .string("CVV is required")
    .min(3, "CVV must be at least 3 characters")
    .max(4, "CVV cannot exceed 4 characters")
    .regex(/^\d{3,4}$/, "CVV must be a 3 or 4 digit number"),
});

export type PaymentType = zod.infer<typeof PaymentsSchema>;

export type DataPropsType = {
  onSubmit: (
    data: ShippingType | PaymentType | null,
    isValid: boolean,
    step?: "payment" | "shipping"
  ) => void;
};


export type CardItemsType =  Omit<Product, 'shortDescription' | 'sizes' | 'colors'> & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CardStoreStateType = {
  count: number;
  Cart: CardItemsType[];
}

export type CartStoreActionsType = {
    addToCart: (item: CardItemsType) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    updateCardItem: (id: number, updatedItem: CardItemsType) => void;
    // getTotalPrice: () => number;
    // getItemCount: (id: number, selectedColor: string, selectedSize: string) => number;
}
