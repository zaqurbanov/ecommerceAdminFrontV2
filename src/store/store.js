import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../reduxSlicers/ProductSlicer'
import categoryReducer from '../reduxSlicers/categorySlicer'
import typeReducer from "../reduxSlicers/typeSlicer"
import sizeReducer from "../reduxSlicers/sizeSlicer"
import brandReducer from "../reduxSlicers/brandSlicer"
import userReducer from "../reduxSlicers/authSlicer"
import imageReducer from "../reduxSlicers/imageSlicer"
import faqReducer from "../reduxSlicers/faqSlicer"
import testimonialReducer from "../reduxSlicers/testimonialSlicer"
import emailReducer from "../reduxSlicers/emailSlicer"
import orderReducer from "../reduxSlicers/orderSlice"
export const store = configureStore({
  reducer: {
    product:productReducer,
    category:categoryReducer,
    type:typeReducer,
    size:sizeReducer,
    brand:brandReducer,
    user:userReducer,
    images:imageReducer,
    faq:faqReducer,
    testimonial:testimonialReducer,
    email:emailReducer,
    order:orderReducer

  },
})