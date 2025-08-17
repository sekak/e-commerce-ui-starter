"use client";
import { Product, ProductTypes } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

function ProductCart({ product }: { product: Product }) {

    const [productTypes, setProductTypes] = useState<ProductTypes>({
        color: product.colors[0],
        size: product.sizes[0],
    })
    
    return (
        <div className="shadow-xl rounded-lg overflow-hidden">
            <Link href={`/product/${product.id}`}>
                <div className="relative aspect-[2/3]">
                    <Image
                        src={product.images[productTypes.color]}
                        alt={product.name}
                        fill
                        className="hover:scale-105 transition-transform duration-200"
                    />
                </div>
            </Link>
            <div className="p-4">
                <span className="text-gray-800 text-md font-semibold">{product.name}</span>
                <p className="text-gray-600/60 text-sm my-2">{product.description}</p>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col justify-between">
                        <span className="text-gray-600/60 text-xs my-2 font-medium">Size</span>
                        <select className="border border-gray-300 rounded-md pr-4 pl-1 py-1 outline-green-200 text-sm text-gray-800" value={productTypes.size} onChange={(e) => setProductTypes({...productTypes, size: e.target.value})}>
                            {product.sizes.map((size) => (
                                <option key={size} value={size}>
                                    {size}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col justify-between">
                        <span className="text-gray-600/60 text-xs my-2 font-medium">Color</span>
                        <div className="flex gap-2">
                            {product.colors.map((color) => (
                                <div key={color} className={`border ${color === productTypes.color ? 'border-gray-400' : 'border-gray-200'} rounded-full p-0.5`} onClick={() => setProductTypes({...productTypes, color})}>
                                    <div
                                        className="w-4.5 h-4.5 rounded-full cursor-pointer hover:scale-110 transition-transform duration-200"
                                        style={{ backgroundColor: color }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-gray-800 text-md font-semibold">${product.price.toFixed(2)}</span>
                    <button className="flex items-center gap-2 px-3 py-1.5 border-1 border-gray-200 shadow-sm rounded-md text-sm hover:bg-black hover:text-white cursor-pointer transition-colors duration-300">
                        <ShoppingCart width={20} height={20} strokeWidth={2}/> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCart;
