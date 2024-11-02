import { Button, Card, Input, Typography } from '@material-tailwind/react'
import { useFormik } from 'formik'
import React, { useEffect } from 'react'
import { loginSchema } from '../yupSchema/loginFormSchem'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../reduxSlicers/authSlicer'
import Swal from 'sweetalert2'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userStatus = useSelector(state=>state.user.status)
    const userError = useSelector(state=>state.user.error)
    
    
    const formik = useFormik({

        initialValues:{
          username:"",
          password:""
        },
        validationSchema:loginSchema,
        onSubmit:(values)=>{
          dispatch(loginUser(values))
          resetForm()


        }
      })
      useEffect(() => {
        if (userStatus === "succeeded") {
            Swal.fire({
                title: "Successfully Login",
                icon: "success"
            })
            navigate('/products')
        }
    }, [userStatus, navigate])
      const {values,handleChange,errors,handleSubmit,resetForm} = formik
  return (

<div className='flex justify-center items-center h-screen'>
   <form className="max-w-sm mx-auto " onSubmit={handleSubmit}>
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
    {errors.username && <p className='text-red-700 text-[10px]'>{errors.username}</p> }
    <input type="name" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Username" required onChange={handleChange} value={values.username} />
  </div>
  <div className="mb-5">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
    {errors.password && <p className='text-red-700 text-[10px]'>{errors.password}</p> }
    <input type="password" id="password"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='******' required onChange={handleChange} value={values.password} />
  </div>
{/* Test */}
 
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
</form> 
</div>


  )
}

export default Login
