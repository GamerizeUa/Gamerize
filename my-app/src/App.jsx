import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Catalog from "./pages/Catalog/Catalog.jsx";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import WishListPage from "./pages/WishListPage.jsx";
import AboutUs from "./pages/AboutUs/AboutUs";
import NotFound from "./pages/NotFound/NotFound";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="catalog/:Id" element={<ProductPage />}></Route>
        <Route path="/wish-list" element={<WishListPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/order/history" element={<OrderHistoryPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="admin/*" element={<AdminPage />}>
        <Route index element={<AddProduct />} />
      </Route> */}
    </Routes>
  );
}

export default App;
