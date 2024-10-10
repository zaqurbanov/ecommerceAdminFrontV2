import React from 'react'
import { NavLink } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (  
    <div >    
      

<div className="w-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <div className='p-3'>
    <img src={product.primaryImage} alt="" />

    </div>
    <div className="p-5">
        
            <NavLink to={`/products/${product._id}`}>
            <h5 className="mb-2 text-md font-bold tracking-tight text-gray-900 dark:text-white ">{product.name}</h5>

            </NavLink>
        
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-sm">{product.description && product.description.slice(0,50)}...</p>

        <div>
            <h2 className='text-md font-bold'>Category: <span className='text-[10px] italic text-blue-700'>{product.category.name}</span></h2>
            <h2 className='text-md font-bold'>Brand: <span className='text-[10px] italic text-blue-700'>{product.brand.name}</span></h2>
            <h2 className='text-md font-bold'>Type: <span className='text-[10px] italic text-blue-700'>{product.type.name}</span></h2>
        </div>
        <NavLink to={`/products/${product._id}`} className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </NavLink>
    </div>
</div>

    </div>
  )
}

export default ProductCard
         