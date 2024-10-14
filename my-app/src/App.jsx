import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage/HomePage.jsx';
import Catalog from './pages/Catalog/Catalog.jsx';
import ProductPage from './pages/ProductPage/ProductPage.jsx';
import PersonalAccountLayout from './pages/PersonalAccount/PersonalAccountLayout.jsx';
import WishListPage from './pages/WishList/WishListPage.jsx';
import AboutUs from './pages/AboutUs/AboutUs';
import NotFound from './pages/NotFound/NotFound';
import OrderHistoryPage from './pages/OrderHistory/OrderHistoryPage.jsx';
import { Checkout } from '@/pages/Checkout/Checkout.jsx';
import OrderAndPay from './pages/OrderAndPay/OrderAndPay.jsx';
import Return from './pages/Return/Return.jsx';
import ConfirmEmailPage from './components/LoginAndRegistration/ConfirmEmail/ConfirmEmail.jsx';
import { AdminPage } from './Admin/AdminPage.jsx';
import { Orders } from './Admin/OrdersPage/Orders.jsx';
import { Products } from './Admin/ProductsPage/Products.jsx';
import { Questions } from './Admin/QuestionsPage/Questions.jsx';
import { EditProduct } from './Admin/ProductsPage/Edit/EditProduct.jsx';
import { AddProduct } from './Admin/ProductsPage/Add/AddProduct.jsx';
import { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import useCheckAdmin from './hooks/useCheckAdmin.js';
import { QuestionAnswer } from './Admin/QuestionsPage/QuestionAnswer/QuestionAnswer.jsx';
import { getWishListProductsIds } from './redux/wishListSlice.js';
import {SingleOrderPage} from "@/Admin/OrdersPage/SingleOrderPage/SingleOrderPage.jsx";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get('https://gamerize.ltd.ua/api/Login/check')
            .then(() => {
                Cookies.set('auth', 'true');
                dispatch(getWishListProductsIds());
            })
            .catch(() => Cookies.set('auth', 'false'));
    }, [dispatch]);

    const ProtectedAdminRoute = ({ element }) => {
        const { isAdmin, loading } = useCheckAdmin();

        if (!isAdmin && !loading) {
            return <Navigate to="/" />;
        }

        return element;
    };

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route
                    path="/personal-account"
                    element={<PersonalAccountLayout />}
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
            <Route
                path="/admin"
                element={<ProtectedAdminRoute element={<AdminPage />} />}
            >
                <Route index element={<Orders />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/:id" element={<SingleOrderPage />} />
                <Route path="products" element={<Products />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route
                    path="products/edit/:productID"
                    element={<EditProduct />}
                />
                <Route path="questions" element={<Questions />} />
                <Route path="questions/:id" element={<QuestionAnswer />} />
            </Route>
        </Routes>
    );
}

export default App;
