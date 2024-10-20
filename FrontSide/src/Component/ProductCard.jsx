import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    
    <div className='group relative w-100 border border-teal-500 hover:border-2 h-[350px] overflow-hidden rounded-lg transition-all'>
      <Link to={`/product/${product.slug}`}>
        <img
          src={product.image}
          className='h-[260px] object-cover group-hover:h-[200px] transition-all duration-300 z-20'
        />
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-xl font-semibold line-clamp-2'>{product.title}</p>
        <span className='italic text-lg'>{product.category}</span>
      </div>
      </Link>
    </div>
  )
}
