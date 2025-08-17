'use client'
import { CategoriesList } from '@/types'
import { Briefcase, Footprints, Glasses, Hand, Shirt, ShoppingBasket, Venus } from 'lucide-react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useCallback } from 'react'

const categories: CategoriesList = [
    { name: 'All', slug: 'all', icon: <ShoppingBasket className='h-4 w-4' /> },
    { name: 'T-shirts', slug: 't-shirts', icon: <Shirt className='h-4 w-4' /> },
    { name: 'Shoes', slug: 'shoes', icon: <Footprints className='h-4 w-4' /> },
    { name: 'Accessories', slug: 'accessories', icon: <Glasses className='h-4 w-4' /> },
    { name: 'Bags', slug: 'bags', icon: <Briefcase className='h-4 w-4' /> },
    { name: 'Dresses', slug: 'dresses', icon: <Venus className='h-4 w-4' /> },
    { name: 'Jackets', slug: 'jackets', icon: <Shirt className='h-4 w-4' /> },
    { name: 'Gloves', slug: 'gloves', icon: <Hand className='h-4 w-4' /> },
]

function Categories() {

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const handleClick = useCallback((slug: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('slug', slug)

        router.push(pathname + '?' + params.toString(), {scroll:false})
    }, [searchParams, pathname, router])


    return (
        <div>
            <div className='mt-4 w-full bg-gray-200 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 p-2 justify-between items-center rounded-lg'>
                {categories.map((category) => (
                    <div 
                        onClick={() => { handleClick(category.slug) }} 
                        key={category.slug} 
                        className={`flex justify-center items-center gap-2 p-2 rounded-md cursor-pointer
                            ${searchParams.get('slug') === category.slug ? 'bg-gray-100' : ''}`}
                    >
                        {category.icon}
                        <span className='text-sm font-medium'>{category.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Categories
