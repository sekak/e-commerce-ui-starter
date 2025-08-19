import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function EmptyCart() {
    return (
        <div className='flex flex-col items-center justify-center py-16 px-4'>
            <div className='bg-gray-100 rounded-full p-6 mb-4'>
                <ShoppingCart width={48} height={48} className='text-gray-400' />
            </div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>Your cart is empty</h3>
            <p className='text-gray-600 text-center mb-6 max-w-md'>
                Looks like you haven&apos;t added anything to your cart yet. Start shopping to fill it up!
            </p>
            <Link
                href="/"
                className='bg-gray-800 text-white px-6 py-3 rounded-md hover:bg-gray-700 transition-colors duration-200 font-medium'
            >
                Continue Shopping
            </Link>
        </div>
    )
}

export default EmptyCart
