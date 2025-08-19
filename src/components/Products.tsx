import useCartStore from '@/zustand/cartStore';
import { TrashIcon, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { toast } from 'react-toastify';
import Link from 'next/link';
import EmptyCart from './EmptyCart';

function Products() {
    const {Cart, removeFromCart} = useCartStore((state) => state);
    
    const handleRemoveFromCart = (id: number) => {
        removeFromCart(id);
        toast.success('Product removed from cart!');
    };

    if (Cart.length === 0) 
        return <EmptyCart />

    return (
        <div className='flex flex-col gap-4'>
            {Cart.map((item) => (
                <div key={item.id} className='border border-gray-200 rounded-lg p-4 flex gap-4'>
                    <div className='relative w-34 h-34'>
                        <Image
                            src={item.images[item.selectedColor]}
                            alt={item.name}
                            fill
                            className='rounded-md object-contain'
                        />
                    </div>
                    <div className='w-full flex flex-col justify-between'>
                        <div className='w-full flex flex-col'>
                            <h2>{item.title}</h2>
                            <div className='flex items-center justify-between'>
                                <div className='flex flex-col gap-1 text-sm text-gray-600 mt-2'>
                                    <span>Quantity: {item.quantity}</span>
                                    <span>Size: {item.selectedSize}</span>
                                    <span>Color: {item.selectedColor}</span>
                                </div>
                                <button onClick={() => handleRemoveFromCart(item.id)} className='bg-red-50 hover:bg-red-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors mt-2'>
                                    <TrashIcon width={14} height={14} className='text-red-500' />
                                </button>
                            </div>
                        </div>
                        <span className='font-medium'>${item.price.toFixed(2)}</span>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Products
