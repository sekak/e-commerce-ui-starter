import { ProductsList } from "@/types";
import React from "react";
import ProductCart from "./ProductCart";
import Categories from "./Categories";
import Link from "next/link";
import Filter from "./Filter";

// Temporary product data
const products: ProductsList = [
  {
    id: 1,
    name: "Product 1",
    title: "Amazing Product 1",
    description: "This is the description for product 1",
    shortDescription: "Short description for product 1",
    price: 29.99,
    sizes: ["S", "M", "L"],
    colors: ["gray", "purple", "green"],
    images: {
      purple: "/products/1p.png",
      gray: "/products/1g.png",
      green: "/products/1gr.png",
    },
  },
  {
    id: 2,
    name: "Product 2",
    title: "Amazing Product 2",
    description: "This is the description for product 2",
    shortDescription: "Short description for product 2",
    price: 39.99,
    sizes: ["M", "L", "XL"],
    colors: ["white", "gray"],
    images: {
      white: "/products/6w.png",
      gray: "/products/6g.png",
    },
  },
  {
    id: 3,
    name: "Product 3",
    title: "Amazing Product 3",
    description: "This is the description for product 3",
    shortDescription: "Short description for product 3",
    price: 49.99,
    sizes: ["S", "M"],
    colors: ["red", "orange", "blue"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      blue: "/products/5bl.png",
    },
  },
  {
    id: 4,
    name: "Product 4",
    title: "Amazing Product 4",
    description: "This is the description for product 4",
    shortDescription: "Short description for product 4",
    price: 59.99,
    sizes: ["L", "XL"],
    colors: ["white", "purple"],
    images: {
      white: "/products/4w.png",
      purple: "/products/4p.png",
    },
  },
  {
    id: 5,
    name: "Product 5",
    title: "Amazing Product 5",
    description: "This is the description for product 5",
    shortDescription: "Short description for product 5",
    price: 69.99,
    sizes: ["S", "M", "L", "XL"],
    colors: ["blue", "gray", "green"],
    images: {
      blue: "/products/3b.png",
      gray: "/products/3bl.png",
      green: "/products/3gr.png",
    },
  },
  {
    id: 6,
    name: "Product 6",
    title: "Amazing Product 6",
    description: "This is the description for product 6",
    shortDescription: "Short description for product 6",
    price: 79.99,
    sizes: ["S", "M"],
    colors: ["gray", "purple"],
    images: {
      gray: "/products/2g.png",
      purple: "/products/2p.png",
    },
  },
];

function ProductList({ slug, filter }: { slug: string; filter: 'productsPage' | 'homePage' }) {
  //fetch data inside server components

  return (
    <div className="w-full">
      <Categories />
      {filter === 'productsPage' && <Filter/>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductCart key={product.id} product={product} />
        ))}
      </div>
      <Link
        href={slug ? `/products?slug=${slug}` : "/products"}
        className="flex justify-end text-sm mt-4 text-gray-500 underline"
      >
        View All Products
      </Link>
    </div>
  );
}

export default ProductList;
