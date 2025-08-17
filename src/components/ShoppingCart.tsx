import { ShoppingCart as ShoppingIcon} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function ShoppingCart() {
  return (
    <Link href='/cart' className='relative'>
      <ShoppingIcon width={16} height={16} color='gray' />
      <span className='absolute -top-3 -right-3 bg-yellow-500 text-white text-xs font-medium w-4 h-4  flex justify-center items-center rounded-full'>0</span>
    </Link>
  )
}

export default ShoppingCart
