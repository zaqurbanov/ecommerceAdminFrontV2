import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { getAllCategory } from "../reduxSlicers/categorySlicer";
import { getAllType } from "../reduxSlicers/typeSlicer";
import { getAllSize } from "../reduxSlicers/sizeSlicer";
import { getAllBrand } from "../reduxSlicers/brandSlicer";
import { ProductFormSchema } from "../yupSchema/productFormSchema";
import { getProductById, resetUpdateStatus, updateProductById } from "../reduxSlicers/ProductSlicer";

const UpdateProduct = () => {
  const [selectSizes, setSelectSizes] = useState([]);
  const { id } = useParams(); // Product ID from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = useSelector((state) => state.category.category);
  const types = useSelector((state) => state.type.type);
  const brands = useSelector((state) => state.brand.brand);
  const sizes = useSelector((state) => state.size.size);
  const product = useSelector((state) => state.product.product); // Product from Redux state
  const updateStatus = useSelector((state) => state.product.updateStatus);
  const productError = useSelector((state) => state.product.error);
  const updateError = useSelector(state=>state.product.updateError)
console.log(updateStatus);
console.log(updateError);
  // Fetch product data and necessary lists
  useEffect(() => {
    dispatch(getProductById(id));
    dispatch(getAllCategory());
    dispatch(getAllType());
    dispatch(getAllSize());
    dispatch(getAllBrand());
  }, [dispatch, id]);

  // Set default sizes for the product
  useEffect(() => {
    if (product && product.sizes) {
      setSelectSizes(product.sizes.map((size) => size._id));
    }
  }, [product]);

  // Show alerts based on update status or errors
  useEffect(() => {
    if (productError) {
      Swal.fire({
        title: "Error",
        text: productError,
        icon: "error",
      });
    }

    if (updateStatus === "succeeded") {
      Swal.fire({
        title: "Successfully updated!",
        icon: "success",
      });
      dispatch(resetUpdateStatus())
      navigate("/products");
    }
  }, [productError, updateStatus, navigate]);

  const formik = useFormik({
    enableReinitialize: true, 
    initialValues: {
      name: product?.name || "",
      price: product?.price || 0,
      stock: product?.stock || 0,
      category: product?.category?._id || "",
      type: product?.type?._id || "",
      brand: product?.brand?._id || "",
      sizes: selectSizes || [],
      image: null,
      description: product?.description || "",
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
      formData.append("description", values.description);

      if (values.sizes.length > 0) {
        formData.append("sizes", values.sizes);
      }

      if (values.image) {
        formData.append("image", values.image);
      }

      dispatch(updateProductById( {id, formData} )); // Dispatch update action
    },
  });

  // Handle size checkbox changes
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

  // Handle image file input change
  const handleImageChange = (e) => {
    formik.setFieldValue("image", e.target.files[0]);
  };

  const { values, handleChange, handleSubmit } = formik;

  return (
    <div className="update-product-form">
      <form onSubmit={handleSubmit} className="p-4 md:p-5">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={values.name}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            placeholder="Type product name"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            value={values.price}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            placeholder="$2999"
            required
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            value={values.stock}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            placeholder="23"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Category
          </label>
          <select
            id="category"
            name="category"
            onChange={handleChange}
            value={values.category}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
          >
            {categories.map((category) => (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label htmlFor="type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Type
          </label>
          <select
            id="type"
            name="type"
            onChange={handleChange}
            value={values.type}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
          >
            {types.map((type) => (
              <option value={type._id} key={type._id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Brand */}
        <div>
          <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Brand
          </label>
          <select
            id="brand"
            name="brand"
            onChange={handleChange}
            value={values.brand}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
          >
            {brands.map((brand) => (
              <option value={brand._id} key={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sizes */}
        <div>
          <h2 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sizes</h2>
          <div className="flex flex-wrap gap-3">
            {sizes.map((size) => (
              <div key={size._id} className="flex items-center gap-1 bg-slate-200 p-3 rounded-md">
                <input
                  type="checkbox"
                  value={size._id}
                  id={size._id}
                  checked={selectSizes.includes(size._id)}
                  onChange={handleSizeInputChange}
                />
                <label htmlFor={size._id}>{size.name}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            value={values.description}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5"
            placeholder="Write product description here"
          ></textarea>
        </div>

        {/* Image */}
        <div>
          <h2>Add image</h2>
          <input type="file" onChange={handleImageChange} />
        </div>

        {/* Submit Button */}
        <button type="submit" className="bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg p-2.5">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
