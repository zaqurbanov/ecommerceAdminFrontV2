import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeOption, changeOrderStatus, resetAllStatus } from "../reduxSlicers/orderSlice";
import Swal from "sweetalert2";

const OrderDetail = ({ order }) => {

    const dispatch = useDispatch()
    const changeStatus = useSelector(state=>state.order.changeStatus)
    const changeError = useSelector(state=>state.order.changeError)
    
    
    const selectedOption = useSelector(state=>state.order.selectedOrderOption)
 const handleChangeStatus = (e)=>{
    e.preventDefault()
    const data = {
        id:order._id,
        status:selectedOption || order.status
    }
    dispatch(changeOrderStatus(data))
}
 const handleChangeOption = (e)=>{
   

        const {value} = e.target
        dispatch(changeOption(value))
  

 }

 useEffect(()=>{

    if(changeError){
        Swal.fire({
            title:changeError,
            icon:"error"
        })
        dispatch(resetAllStatus())
    }
    if(changeStatus =="succeeded"){
        Swal.fire({
            title:"succeeded changed",
            icon:"success"
        })
        dispatch(resetAllStatus())
    }
 },[changeError,changeStatus])

 
  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-2">
        <div className="flex">
          <h1>
            Total Price <span>{order.totalPrice}$</span>
          </h1>
          <h2>
            Order Status{" "}
            <span className="text-red-800 font-bold">
              {order.status || order.status}...
            </span>
          </h2>

          <form className="max-w-sm mx-auto flex gap-6" onSubmit={(e)=>handleChangeStatus(e)}>
  <label htmlFor="underline_select" className="sr-only">Change Order status</label>
  <select id="underline_select" className="block  py-2.5 px-0 w-full text-sm text-gray-500 p-2 border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200  rounded-lg " value={selectedOption.toString() || order.status.toString()} onChange={(e)=>handleChangeOption(e)}>
      
      <option value="pending" >Pending</option>
      <option value="completed">Completed</option>
      <option value="cancelled">Cancelled</option>
      <option value="archived">Archived</option>


  </select>
  <button type="submit" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Change</button>

</form>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Our products
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              Browse a list of Flowbite products designed to help you work and
              play, stay organized, get answers, keep in touch, grow your
              business, and more.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Size
              </th>
              <th scope="col" className="px-6 py-3">
                Brand
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Type
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.products?.map((item) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={item._id}>
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    
                    {item.productId?.name}
                  </th>
                  {/* sizes */}
                  <td className="px-6 py-4 ">
                    {item.productId?.sizes?.map(size=>
                        <p key={size._id } className="text-nowrap text-[10px]">{size.name},</p>
                    )}
                  </td>
                  <td className="px-6 py-4">{item.productId?.brand?.name}</td>
                  <td className="px-6 py-4">{item.productId?.category?.name}</td>
                  <td className="px-6 py-4">{item.productId?.type?.name}</td>
                  <td className="px-6 py-4">{item.productId?.price}$</td>
                  <td className="px-6 py-4">{item.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetail;
