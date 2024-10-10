import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createFaq, getAllFaq, handleShowFaqModal, resetFaqFilter, updateFaq } from '../reduxSlicers/faqSlicer'
import Swal from 'sweetalert2'

const FaqModal = ({faq}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [question,setQuestion] = useState(faq?.question || "")
    const [answer,setAnswer] = useState(faq?.answer || "")
    const updateStatus = useSelector(state=>state.faq.updateStatus)
    const updateMessage = useSelector(state=>state.faq.updateMessage)
    const createStatus = useSelector(state=>state.faq.createStatus)
    const createMessage = useSelector(state=>state.faq.createMessage)
    
    const error = useSelector(state=>state.faq.error)
    const handleSubmit = (e)=>{
        e.preventDefault()
        let data = {}
        if(faq){

            data = {question,answer,id:faq._id}

            dispatch(updateFaq(data))
        }else{
            data ={question,answer} 
            dispatch(createFaq(data))
          } 
          
    }

    useEffect(()=>{
        if(updateStatus =="succeeded" || createStatus == "succeeded"){
            Swal.fire({title:updateMessage || createMessage,icon:'success'})
            dispatch(handleShowFaqModal())
            navigate('/faq')
            dispatch(resetFaqFilter())
            dispatch(getAllFaq())

        }

        

        if(error){
            Swal.fire({title:updateMessage || createMessage ,icon:"error",text:error})
            dispatch(resetFaqFilter())
        }
    },[updateStatus,createStatus])

   
const handleCloseModal = ()=>{

   setQuestion(prev=>prev="")
    setAnswer(prev=>prev="")
    dispatch(handleShowFaqModal())
   
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
                {faq ? "Update faq" : "Add new faq"}
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
                   faq Question
                  </label>
                  <input
                    type="text"
                    name="question"
                    id="question"
                    onChange={(e)=>setQuestion(e.target.value)}
                    value={question}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
        

                <div className="col-span-2">
                  <label
                    htmlFor="answer"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Faq Answer
                  </label>
                  <textarea
                    id="answer"
                    rows="4"
                    onChange={(e)=>setAnswer(e.target.value)}
                    value={answer}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product answer here"
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

export default FaqModal
