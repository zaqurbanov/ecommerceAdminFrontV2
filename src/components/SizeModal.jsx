import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createSize, getAllSize, handleShowSizeModal, resetSizeFilter, updateSize } from '../reduxSlicers/sizeSlicer'
import Swal from 'sweetalert2'

const SizeModal = ({size}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [name,setName] = useState(size?.name || "")
    const [description,setDescription] = useState(size?.description || "")
    const updateStatus = useSelector(state=>state.size.updateStatus)
    const updateMessage = useSelector(state=>state.size.updateMessage)
    const createStatus = useSelector(state=>state.size.createStatus)
    const createMessage = useSelector(state=>state.size.createMessage)
    
    const error = useSelector(state=>state.size.error)
    const handleSubmit = (e)=>{
        e.preventDefault()
        let data = {}
        if(size){

            data = {name,description,id:size._id}

            dispatch(updateSize(data))
        }else{
            data ={name,description} 
            dispatch(createSize(data))
          } 
          
    }

    useEffect(()=>{
        if(updateStatus =="succeeded" || createStatus == "succeeded"){
            Swal.fire({title:updateMessage || createMessage,icon:'success'})
            dispatch(handleShowSizeModal())
            navigate('/size')
            dispatch(resetSizeFilter())
            dispatch(getAllSize())

        }

        

        if(error){
            Swal.fire({title:updateMessage || createMessage ,icon:"error",text:error})
            dispatch(resetSizeFilter())
        }
    },[updateStatus,createStatus])

   
const handleCloseModal = ()=>{

   setName(prev=>prev="")
    setDescription(prev=>prev="")
    dispatch(handleShowSizeModal())
   
}
  return (
    <div>
      <div
        id="crud-modal"
       
        className=""
      >
        <div className="relative p-4 w-full max-w-md max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {size ? "Update Size" : "Add new Size"}
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
              onClick={()=>handleCloseModal()} >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={(e)=>handleSubmit(e)}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e)=>setName(e.target.value)}
                    value={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
        

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Size Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    onChange={(e)=>setDescription(e.target.value)}
                    value={description}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                
              >
                <svg
                  className="me-1 -ms-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Update{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SizeModal
