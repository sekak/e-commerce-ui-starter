import ProductList from '@/components/ProductList'
import React from 'react'

async function page({ searchParams }: { searchParams: Promise<{ [key: string]: string }> }) {
  const slug = (await searchParams).slug

  return (
    <div>
      <ProductList slug={slug} filter='productsPage'/>
    </div>
  )
}

export default page
