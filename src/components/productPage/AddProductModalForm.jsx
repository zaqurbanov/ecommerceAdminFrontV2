import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ProductFormSchema } from "../../yupSchema/productFormSchema";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  handleShowProduct,
  resetUpdateStatus,
} from "../../reduxSlicers/ProductSlicer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { getAllCategory } from "../../reduxSlicers/categorySlicer";
import { getAllType } from "../../reduxSlicers/typeSlicer";
import { getAllSize } from "../../reduxSlicers/sizeSlicer";
import { getAllBrand } from "../../reduxSlicers/brandSlicer";

const AddProductModalForm = () => {
  const [selectSizes, setSelectSizes] = useState([]);
  const fileInputRef = useRef(null);
const navigate = useNavigate()
  const categories = useSelector((state) => state.category.category);
  const dispatch = useDispatch();
  const types = useSelector((state) => state.type.type);
  const brands = useSelector((state) => state.brand.brand);
  const sizes = useSelector((state) => state.size.size);
  const productError = useSelector((state) => state.product.error);
  const updateStatus = useSelector((state) => state.product.updateStatus);
const createStatus = useSelector(state=>state.product.createStatus)
const createError = useSelector(state=>state.product.createError)
  useEffect(() => {
    dispatch(getAllCategory());
    dispatch(getAllType());
    dispatch(getAllSize());
    dispatch(getAllBrand())
  }, []);  
  useEffect(()=>{

    if(productError || createError){
      Swal.fire({
        title:productError || createError,
        text:productError || createError,
        icon:"error"
      })

      dispatch(resetUpdateStatus())
    }
    if(createStatus =="succeeded"){
      Swal.fire({
        title:"successfully",
        icon:"success"
        
      })
      formik.resetForm()
      dispatch(resetUpdateStatus())
      dispatch(handleShowProduct())
      navigate('/products')
    }
  },[ ,createStatus,createError])

  const handleSizeInputChange = (e) => {
    const { checked, value } = e.target;

    let updatedSizes = [];
    if (checked) {
      updatedSizes = [...selectSizes, value];
    } else {
      updatedSizes = selectSizes.filter((size) => size !== value);
    }
    setSelectSizes(updatedSizes);

    formik.setFieldValue("sizes", updatedSizes);
  };

  const handleImageChange = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      stock: 0,
      category: categories.length>0 ? categories[0]._id : "" ,
      type: types.length>0 ? types[0]._id :"",
      brand: brands.length >0? brands[0]._id :"",
      sizes: [],
      image: null,
      description: "",
    },
    validationSchema: ProductFormSchema,
    onSubmit: (values) => {
      
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("category", values.category);
      formData.append("type", values.type);
      formData.append("brand", values.brand);
      formData.append("image", values.image);
      formData.append("description", values.description);
      if (values.sizes.length > 0) {
        formData.append("sizes", values.sizes);
      }
      
      dispatch(createProduct(formData));
    },
  });

  const { values, handleChange, handleSubmit, errors,resetForm } = formik;

  // selectler defaultolaraq ilkdeyeri verilir
useEffect(()=>{

  if (types) {
    formik.setFieldValue("type", types[0]?._id);
  }
  if (categories) {
    formik.setFieldValue("category", categories[0]?._id);
  }

  if(brands){

    formik.setFieldValue("brand", brands[0]?._id);
  }


},[])


  return (
    <div className="">
      <div
        id="crud-modal"
        className="  overflow-y-auto   justify-center items-center w-full  max-h-full"
      >
        <div className="relative mx-auto mt-36 w-[80%]  max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Create New Product
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="crud-modal"
                onClick={() => dispatch(handleShowProduct())}
              >
                <svg
                  className="w-3 h-3"
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
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
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
                    value={values.name}
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                    required=""
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    value={values.price}
                    onChange={handleChange}
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="$2999"
                    required=""
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="stock"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    value={values.stock}
                    onChange={handleChange}
                    name="stock"
                    id="stock"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="23"
                    required=""
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    onChange={handleChange}
                    value={values.category?._id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {categories &&
                      categories.map((category) => (
                        <option
                          value={category._id}
                          id={category._id}
                          key={category._id}
                        >
                          {category.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    onChange={handleChange}
                    value={values.type?._id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {types &&
                      types.map((type) => (
                        <option value={type._id} id={type._id} key={type._id}>
                          {type.name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Brand
                  </label>
                  <select
                    id="category"
                    value={values.brand?._id}
                    name="brand"
                    onChange={handleChange}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    {brands &&
                      brands.map((brand) => (
                        <option value={brand._id} key={brand._id}>
                          {brand.name}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-span-2 sm:col-span-2">
                  <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Size
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {sizes?.map((size) => (
                      <div
                        key={size._id}
                        className="flex   w-max gap-1 bg-slate-200 p-3 rounded-md "
                      >
                        <input
                          type="checkbox"
                          value={size._id}
                          id={size._id}
                          checked={selectSizes.includes(size._id)}
                          onChange={(e) => handleSizeInputChange(e)}
                        />
                        <label htmlFor={size._id}>{size.name}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write product description here"
                  ></textarea>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h2>Add image</h2>
                  <input
                    type="file"
                    onChange={(e) => handleImageChange(e)}
                    ref={fileInputRef}
                  />
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
                Add new product
              </button>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModalForm;
