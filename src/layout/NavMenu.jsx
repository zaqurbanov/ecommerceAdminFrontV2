import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logOutUser } from '../reduxSlicers/authSlicer'

const NavMenu = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [show,setShow]= useState(false)
  const isActiveUser = useSelector(state=>state.user.isActiveUser)

    useEffect(()=>{

        
    },[])
    const handleShowResponsiveMenu =()=>{
        setShow(prev=>prev=!prev)
    }

    const handleLogoutUser = ()=>{
      dispatch(logOutUser())
      navigate('/login')
    }
  return (
    <div>
      

<nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
  <NavLink to={"/products"}  className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Ecommerce</span>
  </NavLink>
  <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">

{isActiveUser ? 
  <button type="button" className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={()=>handleLogoutUser()}>Log out</button>


: <NavLink to={"/login"} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</NavLink>}
      
      <button onClick={()=>{handleShowResponsiveMenu()}} type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"  >
        <span className="sr-only">Open maisasn menu</span>
        <svg className="w-5 h-5" aria-hidden="" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
  </div>
 
  
    <div className={`items-center justify-between ${show ? "" : "hidden"}  w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 text-[14px] md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <NavLink to={'/products'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md": "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"} aria-current="">Products</NavLink>
      </li>
      <li>
        <NavLink to={'/category'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md": "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Category</NavLink>
      </li>
      <li>
        <NavLink to={'/brand'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Brand</NavLink>
      </li>
      <li>
        <NavLink to={'/size'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Size</NavLink>
      </li>

      <li>
        <NavLink to={'/type'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Type</NavLink>
      </li>
      <li>
        <NavLink to={'/faq'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Faq</NavLink>
      </li>
      <li>
        <NavLink to={'/testimonial'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Testimonial</NavLink>

        </li>

        <li>


        <NavLink to={'/subscribe'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Subscribe</NavLink>
        </li>
<li>


        <NavLink to={'/order'} className={({isActive})=>isActive ? "text-white bg-blue-700 px-1 py-2 rounded-md":"block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"}>Order</NavLink>
</li>
    </ul>
  </div>
  

  </div>
</nav>

    </div>
  )
}

export default NavMenu
