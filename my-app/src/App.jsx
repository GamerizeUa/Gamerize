import {Navigate, Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import Catalog from './pages/Catalog/Catalog.jsx';
import ProductPage from './pages/ProductPage';
import RegisterPage from './pages/RegisterPage';
import PersonalAccountPage from './pages/PersonalAccount/PersonalAccountPage.jsx';
import WishListPage from './pages/WishListPage.jsx';
import AboutUs from './pages/AboutUs/AboutUs';
import NotFound from './pages/NotFound/NotFound';
import OrderHistoryPage from './pages/OrderHistoryPage.jsx';
import { Checkout } from './components/Checkout/Checkout.jsx';
import OrderAndPay from './pages/OrderAndPay/OrderAndPay.jsx';
import Return from './pages/Return/Return.jsx';
import ConfirmEmailPage from './components/LoginAndRegistration/ConfirmEmail/ConfirmEmail.jsx';
import {AdminPage} from "./Admin/AdminPage.jsx";
import {Orders} from "./Admin/OrdersPage/Orders.jsx";
import {Products} from "./Admin/ProductsPage/Products.jsx";
import {Questions} from "./Admin/QuestionsPage/Questions.jsx";
import {Edit} from "./Admin/EditPage/Edit.jsx";

function App() {

    const ProtectedAdminRoute = ({ element }) => {
        //TO DO admin check

        return element;
    };

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/personal-account"
                    element={<PersonalAccountPage />}
                />
                <Route path="/catalog" element={<Catalog />} />
                <Route
                    path="catalog/:productID"
                    element={<ProductPage />}
                ></Route>
                <Route path="/wish-list" element={<WishListPage />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/order/history" element={<OrderHistoryPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-pay" element={<OrderAndPay />} />
                <Route path="/return" element={<Return />} />
                <Route path="/confirm-email" element={<ConfirmEmailPage />} />
                <Route path="/reset-password" element={<HomePage />} />
                <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/admin" element={<ProtectedAdminRoute element={<AdminPage />} />}>
                <Route index element={<Orders />} />
                <Route path="/admin/orders" element={<Orders />} />
                <Route path="/admin/products" element={<Products />} />
                <Route path="/admin/questions" element={<Questions />} />
                <Route path="/admin/edit" element={<Edit />} />
             </Route>
        </Routes>
    );
}

export default App;
