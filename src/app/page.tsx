import ProductList from "@/components/ProductList"
import Image from "next/image"

const Homepage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>
}) => {
  
  const slug = (await searchParams).slug

  return (
    <div className=''>
      <div className="relative aspect-[3/1]">
        <Image src='/featured.png' alt="feature.png" fill />
      </div>
      <ProductList slug={slug} filter='homePage'/>
    </div>
  )
}

export default Homepage