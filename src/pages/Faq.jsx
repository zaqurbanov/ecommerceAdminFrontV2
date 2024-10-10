import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteFaq, getAllFaq, handleShowFaqModal, resetFaqFilter } from '../reduxSlicers/faqSlicer';
import FaqModal from '../components/FaqModal';

const Faq = () => {
    const navigate = useNavigate();
  const dispatch = useDispatch();
  const [faqq, setFaqq] = useState("");
  const faqs = useSelector((state) => state.faq.faq);
  const showFaqModal = useSelector((state) => state.faq.showFaqModal);
  const deleteStatus = useSelector((state) => state.faq.deleteStatus);
  const deleteMessage = useSelector((state) => state.faq.deleteMessage);
  const deleteError = useSelector((state) => state.faq.deleteError);
console.log(faqs);
  useEffect(() => {
    if (deleteStatus ==  "succeeded") {
      Swal.fire({ title: deleteMessage, icon: "success" });
      dispatch(resetFaqFilter());
      dispatch(getAllFaq());
    }
    if (deleteError) {
      Swal.fire({ title: deleteMessage, icon: "error" });
      dispatch(resetFaqFilter())
    }
  }, [deleteStatus]);

  const handleUpdateFaq = (faq) => {
    dispatch(handleShowFaqModal());
    setFaqq(faq);
  };
  const handleAddFaq = () => {
    setFaqq(null);
    dispatch(handleShowFaqModal());
  };

  useEffect(() => {
    dispatch(getAllFaq());
  }, []);
  const handleDeleteFaq = (id) => {
    dispatch(deleteFaq(id));
  };
  return (
    <div className="mt-32 p-12 relative">
      <button
        type="button"
        className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={() => handleAddFaq()}
      >
        Add
      </button>

      <div className=" flex flex-wrap gap-3 ">
        {showFaqModal && (
          <div className="absolute top-0 left-0 z-50 backdrop-blur-md flex justify-center items-center w-full h-full">
            <FaqModal faq={faqq} />
          </div>
        )}
        {faqs &&
          faqs.map((faq) => (
            <div
              className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              key={faq._id}
            >
              <a href="#">
                <h5 className="mb-2 text-2xl max-md:text-sm font-bold tracking-tight text-red-900 dark:text-white">
                  {faq.question}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 max-md:text-sm dark:text-gray-400">
                {faq.answer}
              </p>
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => handleDeleteFaq(faq._id)}
              >
                Delete
              </button>

              <button
                type="button"
                className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={() => handleUpdateFaq(faq)}
              >
                Update
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default Faq

