import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import Catalog from "./pages/Catalog";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        {/* <Route
          path="/register"
          element={
            <RestrictedRoute
              component={<RegisterPage />}
              redirectTo="/"
            />
          }
        /> */}
        {/* <Route
          path="/login"
          element={
            <RestrictedRoute component={<LoginPage />} redirectTo="/" />
          }
        /> */}
        <Route path="/catalog" element={<Catalog />} />
        <Route path="catalog/:Id" element={<ProductPage />}>
          {/* <Route path="feature" element={<Feature />} />
          <Route path="reviews" element={<Reviews />} /> */}
        </Route>
      </Route>
      {/* <Route path="admin/*" element={<AdminPage />}>
        <Route index element={<AddProduct />} />
      </Route> */}
    </Routes>
  );
}

export default App;
