import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmail, handleSelectedEmail, sendMessageToMail } from '../reduxSlicers/emailSlicer'
import { useFormik } from 'formik'

const Subscribe = () => {
    const dispatch = useDispatch()
    const emails = useSelector(state=>state.email.email)
    const selectedEmail = useSelector(state=>state.email.selectedEmail)
    const sendStatus = useSelector(state=>state.email.sendStatus)
    const sendError = useSelector(state=>state.email.sendError)
    useEffect(()=>{
        dispatch(getAllEmail())

    },[])
console.log(sendError);
console.log(sendStatus);
    const selectEmail = (e)=>{
        dispatch(handleSelectedEmail(e.target.value))
    }
  

    const formik = useFormik({

        initialValues:{
            title:'',
            message:''
        },
        onSubmit:(values)=>{
            dispatch(sendMessageToMail({data:values,emails:selectedEmail}))
        }
    })




    const {handleSubmit,handleChange,values,initialValues} = formik
  return (
    <div className='mt-36 p-5'>
 <form className=" mx-auto" onSubmit={handleSubmit} >
        <div>
       
            
        <div className="mb-5">
      <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
      <input type="text" id="large-input" name='title' className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={values.title} onChange={handleChange} />
  </div>

  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
  <textarea id="message" rows="4" name='message' className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..."
  value={values.message} onChange={handleChange}></textarea>

        </div>
      

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onChange={()=>dispatch(handleSelectedEmail("all"))}
                        checked={selectedEmail.length == emails.length}/>
                        <label htmlFor="checkbox-all-search" className="sr-only" >checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Email
                </th>
                <th scope="col" className="px-6 py-3">
                    Date
                </th>
                
                
                
               
              
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
          
          
        
           
           
        {emails && emails.map(email=>

 <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={email._id}>
                <td className="w-4 p-4">
                    <div className="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" 
                        value={email.email} onChange={(e)=>selectEmail(e)}
                       checked={selectedEmail.includes(email.email)}
                        />
                        <label htmlFor="checkbox-table-search-3" className="sr-only" >checkbox</label>
                    </div>
                </td>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                   {email.email}
                </th>
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {email.createdAt}
                </th>
                <td className="flex items-center px-6 py-4">
                    <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline ms-3">Remove</a>
                </td>
            </tr>

        )}
           
  

           
        </tbody>
    </table>
</div>
           <button type="submit" className="text-white bg-green-700 text-nowrap hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Send Message</button>
           </form>
    </div>
  )
}

export default Subscribe
