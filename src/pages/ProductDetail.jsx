import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { deleteProduct, getProductById } from "../reduxSlicers/ProductSlicer";
import Swal from "sweetalert2";
import { deleteImage, handleShowImageModal, resetValues } from "../reduxSlicers/imageSlicer";
import AddImageComponent from "../components/productPage/AddImageComponent";
import { FcFullTrash } from "react-icons/fc";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.product);
  const productError = useSelector((state) => state.product.error);
  const showImageModal = useSelector(state=>state.images.showImageModal)
  const imageUploadStatus = useSelector(state=>state.images.imageStatus)
  const imageDeleteStatus = useSelector(state=>state.images.imageDeleteStatus)
  const imageError = useSelector(state=>state.images.error)
  const uploadMessage =useSelector(state=>state.images.uploadMessage)
  useEffect(() => {
    dispatch(getProductById(id));

  }, [imageDeleteStatus,imageUploadStatus]);

useEffect(()=>{
  if(imageDeleteStatus == 'succeeded'){
    Swal.fire({
      title:uploadMessage,
      text:uploadMessage,
      icon:'success'
    })
    dispatch(resetValues())

  }else if(imageError){
    Swal.fire({
      title:imageError,
      text:imageError,
      icon:'error'

    })
  }


},[imageDeleteStatus,imageUploadStatus])
  const handleDeleteItem = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id)).then(() => {
          if (productError  ) {
            Swal.fire({
              title: "Error!",
              text: productError || "File has dont been deleted",
              icon: "error",
            });
            
          } else {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            navigate('/products')
          }
        });
      }
    });
  };
  const handleDeleteImage = (imgId)=>{
          dispatch(deleteImage(imgId))
  }
const handleBackClik = ()=>{
  navigate(-1)
}
  return (
    <div className="p-16 my-10 mt-40">
      <button onClick={()=>handleBackClik()}>Back to previus page</button>
      <h1 className="text-3xl font-bold text-center">Product Detail</h1>
      <div>
        <h2>Primary Image</h2>
        <img src={product?.primaryImage} alt="" />
      </div>

      <div>
        <h1 className="font-bold text-xl ">
          Name: <span className="italic text-blue-800">{product?.name}</span>
        </h1>
      </div>
      <div>
        <h1 className="font-bold text-xl ">
          Brand:{" "}
          <span className="italic text-blue-800">{product?.brand?.name}</span>
        </h1>
      </div>
      <div>
        <h1 className="font-bold text-xl ">
          Category:{" "}
          <span className="italic text-blue-800">{product?.category?.name}</span>
        </h1>
      </div>

      <div>
        <h1 className="font-bold text-xl ">
          Type:{" "}
          <span className="italic text-blue-800">{product?.type?.name}</span>
        </h1>
      </div>
      <div>
        <div>
          <h1 className="font-bold text-xl ">
            Size:
            {product?.sizes?.map((size) => (
              <span
                className="italic text-blue-800 text-sm p-1 bg-slate-400 mx-1 rounded-md"
                key={size?._id}
              >
                {size?.name}{" "}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-5 mt-7">
        {product?.productImages?.map((image) => (
          <div key={image?._id} className="max-w-[25%] border relative  ">

            <FcFullTrash className="absolute right-0 top-3 cursor-pointer" onClick={()=>handleDeleteImage(image._id)} />

            <img src={image?.url} alt="" className="w-full h-full" />
          </div>
        ))}
      </div>
      <button
        type="button"
        className="focus:outline-none mt-10 text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        onClick={() => handleDeleteItem(product?._id)}
      >
        Delete
      </button>

      <button type="button" onClick={()=>dispatch(handleShowImageModal())} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add Images</button>
      
      <NavLink to={`/update/${id}`} className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Update</NavLink>

        { showImageModal &&

        <div className="backdrop-blur-lg flex justify-center items-center absolute top-0 left-0 w-full h-full ">
          <AddImageComponent product={product}/>

        </div>
        
        }
    </div>
  );
};

export default ProductDetail;
