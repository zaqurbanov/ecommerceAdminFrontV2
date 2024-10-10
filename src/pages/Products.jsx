import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProduct, handleshowFilter, handleShowProduct } from "../reduxSlicers/ProductSlicer";
import { PacmanLoader } from "react-spinners";
import FilterSide from "../components/productPage/FilterSide";
import { resetBrandFilter } from "../reduxSlicers/brandSlicer";
import { resetCategoryFilter } from "../reduxSlicers/categorySlicer";
import { resetSizeFilter } from "../reduxSlicers/sizeSlicer";
import { resetTypeFilter } from "../reduxSlicers/typeSlicer";
import ProductCard from "../components/productPage/ProductCard";
import AddProductModalForm from "../components/productPage/AddProductModalForm";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { GrClose } from "react-icons/gr";

const Products = () => {
  const products = useSelector((state) => state.product.products);
  const status = useSelector((state) => state.product.status);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const createStatus = useSelector(state=>state.product.createStatus)
  const addModalFormShow =useSelector(state=>state.product.productModalShow)
  const showFilter = useSelector(state=>state.product.showFilter)
  useEffect(() => {
    dispatch(getAllProduct());
    
  }, [createStatus]);
  const handleResetFilter = ()=>{
    dispatch(resetBrandFilter())
    dispatch(resetCategoryFilter())
    dispatch(resetSizeFilter())
    dispatch(resetTypeFilter())
  }

  const handleModalFormShow= ()=>{
    dispatch(handleShowProduct())
  }
  
  return (
    <div>

   

      
      
      
      <div className="container mx-auto p-4 mt-24">
      <NavLink   to={'/add'} className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add New Product</NavLink>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 ">


            {/* filter Hissesi */}
 
 
            <div className="col-span-1  max-md:col-span-5  bg-white  shadow-lg rounded-lg ">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold mb-4 cursor-pointer"  onClick={()=>dispatch(handleshowFilter())}>Filters</h2>
                <button onClick={()=>handleResetFilter()} type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Reset</button>

            </div>
            
             <div className={ `max-md:text-[10px] ${showFilter ? " left-0  top-0 ":"left-[-100%]"}  z-50 max-md:w-2/3 h-auto p-4  min-h-full max-md:absolute  max-md:bg-white shadow-lg`  }>
                <div className="ml-auto font-bold  border w-fit p-3 text-xl shadow-2xl rounded-full border-blue-700  cursor-pointer hidden max-md:flex" onClick={()=>dispatch(handleshowFilter())}>
              <GrClose className="" />

                </div>

                <FilterSide />

              </div>
            
            
             
            </div>
              <div className="col-span-3 max-md:col-span-12  bg-slate-200 flex flex-wrap gap-4 p-3 max-md:p-2 justify-between ">
                {products && products?.map((product)=>
                <div key={product._id} className="h-max max-h-max w-[30%]  max-md:w-[45%] max-sm:w-[100%]">
                  <ProductCard product={product}/>

                </div>
                
                )}
                
              </div>
        </div>
        

       
      </div>
      
    <Outlet/> 
    </div>
    
  );
};

export default Products;
