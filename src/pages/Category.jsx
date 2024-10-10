import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCategory, getAllCategory, handleShowCategoryModal, resetCategoryFilter } from '../reduxSlicers/categorySlicer'
import ModalForm from '../components/productPage/ModalForm'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const navigate = useNavigate()
const dispatch = useDispatch()
const [categoryy,setCategoryy] = useState('')
const categories = useSelector(state=>state.category.category)
const showCategoryModal = useSelector(state=>state.category.showCategoryModal)
const deleteStatus = useSelector(state=>state.category.deleteStatus)
const deleteMessage = useSelector(state=>state.category.deleteMessage)
const deleteError = useSelector(state=>state.category.deleteError)


useEffect(()=>{
    if(deleteStatus == 'succeeded'){

        Swal.fire({title:deleteMessage,icon:"success"})
        dispatch(resetCategoryFilter())
        dispatch(getAllCategory())
      
    }
    if(deleteError){
        Swal.fire({title:deleteMessage,icon:"error"})
    }



},[deleteStatus])

const handleUpdateCategory = (category)=>{
    dispatch(handleShowCategoryModal())
    setCategoryy(category)
}
const handleAddCategory =()=>{
    setCategoryy(null)
    dispatch(handleShowCategoryModal())
}

useEffect(()=>{
    dispatch(getAllCategory())

},[])
const handleDeleteCategory = (id)=>{
    dispatch(deleteCategory(id))
}
  return (

    <div className='mt-32 p-12 relative'>
        <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" onClick={()=>handleAddCategory()}>Add</button>


    <div className=' flex flex-wrap gap-3 '>
    

        {showCategoryModal &&  
                <div className='absolute top-0 left-0 z-50 backdrop-blur-md flex justify-center items-center w-full h-full'>
                    <ModalForm category={categoryy}/>
                </div>
                
                }
{categories && categories.map(category=>

    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={category._id}>
    <a href="#">
        <h5 className="mb-2 text-2xl max-md:text-sm font-bold tracking-tight text-red-900 dark:text-white">{category.name}</h5>
    </a>
    <p className="mb-3 font-normal text-gray-700 max-md:text-sm dark:text-gray-400">{category.description}</p>
    <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700" onClick={()=>handleDeleteCategory(category._id)}>Delete</button>


    <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={()=>handleUpdateCategory(category)}>Update</button>

</div>
   

)


}


    </div>
    </div>
  )
}

export default Category
