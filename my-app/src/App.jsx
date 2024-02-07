import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Catalog from "./pages/Catalog";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FavoritePage from "./pages/Favorites";
import NotFound from "./pages/NotFound/NotFound";
import AboutUs from "./pages/AboutUs/AboutUs";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="catalog/:Id" element={<ProductPage />}></Route>
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="admin/*" element={<AdminPage />}>
        <Route index element={<AddProduct />} />
      </Route> */}
    </Routes>
  );
}

export default App;
