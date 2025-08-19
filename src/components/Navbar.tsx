import Image from 'next/image'
import Link from 'next/link'
import React, { use } from 'react'
import SearchBar from './SearchBar'
import { Bell, Home } from 'lucide-react'
import ShoppingCart from './ShoppingCart'

function Navbar() {
  return (
    <nav className='flex items-center justify-between pb-4 border-b border-gray-200'>
      <Link href='/' className='flex items-center'>
        <Image 
            src='/logo.png'
            alt='Logo'
            width={36}
            height={36}
            className='w-6 h-6 md:w-9 md:h-9'
        />
        <span className='hidden md:block Btext-md font-medium tracking-wider'>E-Commerce</span>
      </Link>
      <div className='flex items-center gap-6'>
        <SearchBar />
        <Home width={16} height={16} color='gray' />
        <Bell width={16} height={16} color='gray' />
        <ShoppingCart />
        <Link href='/signin' className='text-md'>Sign in</Link>
      </div>
    </nav>
  )
}

export default Navbar
