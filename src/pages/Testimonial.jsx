import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeTestimonialStatus, deleteTestimonial, getAllTestimonial } from "../reduxSlicers/testimonialSlicer";
import RatingStar from "../components/RatingStar";

const Testimonial = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector((state) => state.testimonial.testimonial);

  useEffect(() => {
    dispatch(getAllTestimonial());
  }, [testimonials]);
  const handleStatusChange = (id, currentStatus) => {
    const newStatus = currentStatus ? 0 : 1;
    dispatch(changeTestimonialStatus({ id, status: newStatus }));
  };
  const handleDeleteTestimonial = (id)=>{

dispatch(deleteTestimonial(id))
}
  return (
    <div className="mt-80">
      <div   className=" flex flex-wrap gap-5 justify-center items-center">
        {testimonials &&
          testimonials.map((item) => (
            <div key={item._id} className="w-1/4 max-md:w-full relative border p-1 bg-slate-200">
                <div className="flex">
                <button
                  onClick={() => handleStatusChange(item._id, item.status)}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  {item.status ? "Deactivate" : "Activate"}
                </button>

                    <div>
                    <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={()=>handleDeleteTestimonial(item._id)}>Delete</button>

                    </div>

                </div>
                <div>Current Status  
                    <p>{item.status ? "Active" : "Deactive"}</p>
                </div>
              <div className="w-full h-full bg-slate-200 shadow-lg custom-border-radius border border-blue-800 flex p-5 gap-5">
                <div className="w-1/4 flex justify-center items-center">
                  <img src={item.productId?.primaryImage} alt="" />
                </div>

                <div className="flex flex-col gap-4 w-full ">
                  <h1 className="text-2xl font-bold text-[#111111]">
                    {item.title}
                  </h1>
                  <p className="text-muted">{item.comment}</p>

                  <div className="flex justify-between">
                    <div className="flex items-center gap-10">
                      <div className="w-12 h-12 rounded-full">
                        <img
                          src={item.userId?.image}
                          alt=""
                          className="w-full h-full rounded-full object-cover "
                        />
                      </div>
                      <div>
                        <h2 className="text-orange-900">
                          {" "}
                          username{" "}
                          <span className=" font-bold">{item.userId?.name}</span>
                        </h2>
                        <h2 className="text-orange-950">
                          name{" "}
                          <span className="font-bold">
                            {item.userId.username}
                          </span>
                        </h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-7">
                      <RatingStar rating={item.rating} />

                      <p className="text-blue-900">
                        {item.rating}
                        <span className="text-black">/5</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>{" "}
    </div>
  );
};

export default Testimonial;
