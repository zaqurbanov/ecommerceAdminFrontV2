import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrder } from "../reduxSlicers/orderSlice";
import OrderDetail from "../components/OrderDetail";

const Order = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.order);
    const error = useSelector(state=>state.order.error)
    const[query,setQuery] = useState({status:""})
    const changeStatus = useSelector(state=>state.order.changeStatus)
    const [selectedStatus,setSelectedStatus] = useState('pending')
  useEffect(() => {
    
    dispatch(getAllOrder(query));
  }, [query,changeStatus]);
const handleChangeQuery = (e)=>{
    const selectedQuery = e.target.value
    setQuery({status:selectedQuery})
    setSelectedStatus(selectedQuery)
}
  
  return (
    <div className="mt-36 p-16">
        <div className=" flex justify-center items-center gap-6">
            <div>
                <input type="radio"
                className="hidden"
                id="pending" name="query" value={"pending"} onChange={(e)=>handleChangeQuery(e)} />
                <label htmlFor="pending" className= {`${selectedStatus=='pending' ? " bg-blue-600 px-2 py-1 rounded-md text-white":"bg-slate-200 text-black px-2 py-1"} `}>Pending</label>
            </div>
            <div>
                <input type="radio" className="hidden" id="completed"  name="query" value={"completed"} onChange={(e)=>handleChangeQuery(e)}/>
                <label htmlFor="completed" className= {`${selectedStatus=='completed' ? " bg-blue-600 px-2 py-1 rounded-md text-white":"bg-slate-200 text-black px-2 py-1"} `}>Completed</label>
            </div>
            <div>
                <input type="radio" className="hidden" id="cancelled" name="query" value={"cancelled"} onChange={(e)=>handleChangeQuery(e)}/>
                <label htmlFor="cancelled" className= {`${selectedStatus=='cancelled' ? " bg-blue-600 px-2 py-1 rounded-md text-white":"bg-slate-200 text-black px-2 py-1"} `}>Cancelled</label>
            </div>
            <div>
                <input type="radio" className="hidden" id="archived" name="query" value={"archived"} onChange={(e)=>handleChangeQuery(e)}/>
                <label htmlFor="archived" className= {`${selectedStatus=='archived' ? " bg-blue-600 px-2 py-1 rounded-md text-white":"bg-slate-200 text-black px-2 py-1"} `}>Archived</label>
            </div>
        </div>
      <div className="p-16 flex flex-col gap-5">
        {orders &&
          orders.map((order) => (
            <div key={order._id} className="bg-slate-400 p-3">
              <div>
                {" "}
                <h1>User Detail</h1>
                <p>
                  Name : <span className="font-bold text-green-700">{order.user?.name}</span>
                </p>
                <p>
                  Username : <span className="font-bold text-green-700">{order.user?.username}</span>
                </p>
                <p>
                  Email : <span className="font-bold text-green-700">{order.user?.email}</span>
                </p>
              </div>

              <div className="bg-slate-300 p-1">
                <h2>Order Detail</h2>
                    <OrderDetail order={order}/>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Order;
