import { Routes, Route, useNavigate } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import apiConfig from "./libs/api";
import React from "react";
import setAuthToken from "./libs/setAuthToken";
import { UserContext } from "./stores/userContext";
import {
  PrivateRoute,
  PrivateRouteAdmin,
  PrivateRouteUser,
} from "./hooks/privateRoute.jsx";
import HomePage from "./pages/productPage.jsx";
import HomeAdminPage from "./pages/adminPage/homeAdminPage.jsx";
import Product from "./pages/productPage.jsx";
import DetailProductPage from "./pages/detailProductPage.jsx";
import TransacationPage from "./pages/transactionPage.jsx";
import ProfilePage from "./pages/profilePage.jsx";
import HistoryTransactionPage from "./pages/historyTransactionPage.jsx";
import ContactMePage from "./pages/contactMePage.jsx";
import ListProductPage from "./pages/adminPage/listProductPage.jsx";
import ListCategoryPage from "./pages/adminPage/listCategoryPage.jsx";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = React.useContext(UserContext);
  const [isLoading, setIsLoading] = React.useState(true);

  const checkAuth = async () => {
    try {
      setAuthToken(localStorage.token);
      const response = await apiConfig.get("/auth/check");

      dispatch({
        type: "AUTH_CHECK",
        payload: response.data.Data,
      });
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  React.useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? null : (
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/products" element={<Product />} />
          <Route path="/detail-product/:id" element={<DetailProductPage />} />
          <Route path="/contact" element={<ContactMePage />} />

          <Route element={<PrivateRoute />}>
            <Route element={<PrivateRouteUser />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/transactions" element={<TransacationPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/history" element={<HistoryTransactionPage />} />
            </Route>

            <Route element={<PrivateRouteAdmin />}>
              <Route path="/product-admin" element={<HomeAdminPage />} />
              <Route path="/list-product" element={<ListProductPage />} />
              <Route path="/list-category" element={<ListCategoryPage />} />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
