import { useEffect, useState } from "react";

import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NavMenu from "./layout/NavMenu";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectRoute";
import { setUserActive } from "./reduxSlicers/authSlicer";
import AddProductModalForm from "./components/productPage/AddProductModalForm";
import UpdateProduct from "./pages/UpdateProduct";
import Category from "./pages/Category";
import Brand from "./pages/Brand";
import Size from "./pages/Size";
import Type from "./pages/Type";
import Faq from "./pages/Faq";
import Testimonial from "./pages/Testimonial";
import Subscribe from "./pages/Subscribe";
import Order from "./pages/Order";

function App() {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const imageStatus = useSelector((state) => state.images.status);
  const userStatus = useSelector((state) => state.user.status);
  const orderStatus = useSelector((state) => state.order.status);
  const emailStatus = useSelector((state) => state.email.status);
  const categoryStatus = useSelector((state) => state.category.status);
  const sizeStatus = useSelector((state) => state.size.status);
  const brandStatus = useSelector((state) => state.brand.status);
  const typeStatus = useSelector((state) => state.type.status);
  const status = useSelector((state) => state.product.status);
  const faqStatus = useSelector((state) => state.faq.status);
  const testimonialStatus = useSelector(state=>state.testimonial.status)
  const isActiveUser = useSelector((state) => state.user.isActiveUser);
  const addModalFormShow = useSelector(
    (state) => state.product.productModalShow
  );
  console.log(imageStatus);
  const showImageModal = useSelector(state=>state.images.showImageModal)

  const deleteCategoryStatus = useSelector(
    (state) => state.category.deleteStatus
  );
  const productDetailStatus = useSelector(
    (state) => state.product.productDetailStatus
  );
  const createStatus = useSelector((state) => state.product.createStatus);

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (token) {
      dispatch(setUserActive());
    } else {
      navigate("/login");
    }
  }, [dispatch, isActiveUser]);
  return (
    <div
      className= { 
        status == "loading" ||
        createStatus == "loading" ||
        imageStatus == "loading" ||
        deleteCategoryStatus == "loading" ||
        orderStatus == "loading" ||
        emailStatus == "loading" ||
        categoryStatus == "loading" ||
        brandStatus == "loading" ||
        typeStatus == "loading" ||
        faqStatus == "loading" ||
        sizeStatus == "loading"||
        showImageModal
          ? "overflow-hidden h-screen "
          : ""
      }
    >
      {status == "loading" ||
      userStatus == "loading" ||
      createStatus == "loading" ||
      imageStatus == "loading" ||
      deleteCategoryStatus == "loading" ||
      orderStatus == "loading" ||
      emailStatus == "loading" ||
      categoryStatus == "loading" ||
      brandStatus == "loading" ||
      sizeStatus == "loading" ||
      typeStatus == "loading" ||
      faqStatus == "loading" 
    ? (
        <Loader />
      ) : (
        ""
      )}
      <NavMenu />
      <Routes>
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddProductModalForm />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetail />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/category"
          element={
            <ProtectedRoute>
              <Category />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/brand"
          element={
            <ProtectedRoute>
              <Brand />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/size"
          element={
            <ProtectedRoute>
              <Size />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/type"
          element={
            <ProtectedRoute>
              <Type />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/faq"
          element={
            <ProtectedRoute>
              <Faq />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/testimonial"
          element={
            <ProtectedRoute>
              <Testimonial />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/subscribe"
          element={
            <ProtectedRoute>
              <Subscribe />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="/order"
          element={
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          }
        ></Route>
        <Route path={"/login" || "/"}  element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
