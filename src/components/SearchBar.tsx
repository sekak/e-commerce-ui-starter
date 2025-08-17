import { Search } from 'lucide-react'
import React from 'react'

function SearchBar() {
  return (
    <div>
      <div className='hidden md:flex items-center gap-2 bg-white py-1.5 px-2 rounded-md shadow-sm'> 
        <Search width={16} height={16} color='gray' />
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md outline-none border-none"
        />
      </div>
    </div>
  )
}

export default SearchBar