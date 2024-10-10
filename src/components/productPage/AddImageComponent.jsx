import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleShowImageModal, resetValues, uploadImages } from '../../reduxSlicers/imageSlicer'
import { useParams } from 'react-router-dom'
import { getAllSize } from '../../reduxSlicers/sizeSlicer'
import { useFormik } from 'formik'
import Swal from 'sweetalert2'

const AddImageComponent = ({product}) => {
    const [selectedFile, setSelectedFile] = useState([]);
    const [selectSizes, setSelectSizes] = useState([]);
    
    const uploadMessage = useSelector(state=>state.images.uploadMessage)
  const imageStatus = useSelector(state=>state.images.imageStatus)
  const error = useSelector(state=>state.images.error)
  const status = useSelector(state=>state.images.status)
    const {id} = useParams()
    
    const dispatch  = useDispatch()
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files);
        formik.setFieldValue("images", e.target.files); 
      };
      const handleSizeInputChange = (e) => {
        const { checked, value } = e.target;
    
        let updatedSizes = [];
        if (checked) {
          updatedSizes = [...selectSizes, value];
        } else {
          updatedSizes = selectSizes.filter((size) => size !== value);
        }
        setSelectSizes(prev=>prev=updatedSizes);
    
        formik.setFieldValue("sizes", updatedSizes);
      };

      useEffect(()=>{
        dispatch(getAllSize())
        dispatch(resetValues())
      },[])


      useEffect(()=>{
        if(error){
          Swal.fire({
            title:error || "image upload error",
            icon:"error"
          })

        }
        if(imageStatus=='succeeded'){

          Swal.fire({
            title:"Image upload success",
            icon:"success"
          })
          dispatch(handleShowImageModal())
          dispatch(resetValues())
        }
      },[error,imageStatus,status])
      const formik = useFormik({    
        initialValues:{
            sizes:[],
            images:[]
        },
            onSubmit:(values)=>{
                const formData = new FormData()
                formData.append('sizes',values.sizes)
                for (let i = 0; i < selectedFile.length; i++) {
                    formData.append('images', selectedFile[i]);
                  }
                if (values.sizes.length > 0) {
                    formData.append("sizes", values.sizes);
                  }
                  formData.append('productId',id)
                dispatch(uploadImages(formData))



            }
      })
      const {values,handleSubmit,handleReset,handleChange} = formik
useEffect(()=>{
     if(imageStatus =='succeeded'){

        Swal.fire({
          title:uploadMessage,
          text:uploadMessage,
          icon:"success"
        })
      }
      if(error){
        Swal.fire({
          title:error,
          text:error,
          icon:"error"
        })
      }
},[imageStatus])
   
      
  return (
  <form action="" onSubmit={handleSubmit}>
<div id="default-modal"  className="  max-md:mt-32 max-sm:mt-60">
    <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"  onClick={()=>dispatch(handleShowImageModal())}>
                    <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                <input type="file" multiple onChange={handleFileChange} />
                </p>
               <div >
                <p>Selected Size </p>
                <div className='flex flex-wrap gap-2'>

                        {product.sizes?.map((size) => (
                      <div
                        key={size._id}
                        className="flex    w-max gap-1 bg-slate-200 p-1 rounded-md cursor-pointer " 
                        
                      >
                        <input
                          type="checkbox"
                          value={size._id}
                          id={size._id}
                          checked={selectSizes.includes(size._id)}
                          onChange={(e) => handleSizeInputChange(e)}
                        />
                        <label htmlFor={size._id} className='text-[10px] cursor-pointer'>{size.name}</label>
                      </div>
                    ))}
                </div>
            
               </div>
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button  type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Upload Images</button>
               
            </div>
        </div>
    </div>
</div>
</form>
  )
}

export default AddImageComponent
