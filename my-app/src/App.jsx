import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Catalog from "./pages/Catalog";
import ProductPage from "./pages/ProductPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import FavoritePage from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import OrderHistoryPage from "./pages/OrderHistoryPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="catalog/:Id" element={<ProductPage />}>
          {/* <Route path="feature" element={<Feature />} />
          <Route path="reviews" element={<Reviews />} /> */}
        </Route>
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/order/history" element={<OrderHistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      {/* <Route path="admin/*" element={<AdminPage />}>
        <Route index element={<AddProduct />} />
      </Route> */}
    </Routes>
  );
}

export default App;
