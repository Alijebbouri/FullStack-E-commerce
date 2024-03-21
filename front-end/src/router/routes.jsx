import React from 'react';
import Home from './../components/frontend/Home';
import Login from './../components/frontend/auth/Login';
import Register from './../components/frontend/auth/Register';
import AdminProtectedRoute from './../AdminProtectedRoute';
import MasterLayout from './../layouts/admin/MasterLayout';
import Dashboard from './../components/admin/Dashboard';
import Profile from './../components/admin/Profile';
import Category from './../components/admin/category/Category';
import ViewCategory from './../components/admin/category/ViewCategory';
import EditCategory from './../components/admin/category/EditCategory';
import Product from './../components/admin/Products/Product';
import AddProduct from './../components/admin/Products/AddProduct';
import EditProduct from './../components/admin/Products/EditProduct';
import ShowCollections from './../components/frontend/collections/ShowCollections';
import ShowProduct from '../components/frontend/collections/ShowProduct';
import ProductDetail from './../components/frontend/collections/ProductDetail';
import Cart from './../components/frontend/collections/Cart';
import Checkout from './../components/frontend/collections/Checkout';
import Wishlist from './../components/frontend/collections/Wishlist';
import ThankYou from './../components/frontend/collections/ThankYou';
// import MyOrderDetail from '../components/frontend/orders/MyOrderDetail';
// import Order from './../components/frontend/orders/Order';
import MyOrderDetail from './../components/frontend/orders/MyOrderDetail';
import Order from '../components/frontend/orders/Order';
import AdminOrder from './../components/admin/orders/AdminOrder';
import AdminOrderDetail from './../components/admin/orders/AdminOrderDetail';
import History from './../components/admin/orders/History';

const routes = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/collections',
    element: <ShowCollections />,
  }
  ,{
    path: '/collections/:slug',
    element: <ShowProduct />,
  },
  {
    path: '/collections/:category_slug/:product_slug',
    element: <ProductDetail />,
  },
  {
    path: '/carts',
    element: <Cart />,
  },
  {
    path: '/wishlist',
    element: <Wishlist />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/thankyou',
    element: <ThankYou />,
  },
  {
    path: '/my-order',
    element: <Order />,
  },
  {
    path: '/my-order/:id',
    element: <MyOrderDetail />,
  },
  {
    path: '/admin',
    element: (
      <AdminProtectedRoute>
        <MasterLayout />
      </AdminProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'profile', element: <Profile /> },
      { path: 'add-category', element: <Category /> },
      { path: 'view-category', element: <ViewCategory /> },
      { path: 'edit-category/:id', element: <EditCategory /> },
      { path: 'view-produtcs', element: <Product /> },
      { path: 'add-produtcs', element: <AddProduct /> },
      { path: 'edit-produtcs/:id', element: <EditProduct /> },
      { path: 'order', element: <AdminOrder /> },
      { path: 'order/:id', element: <AdminOrderDetail /> },
      { path: 'order-history', element: <History /> },
    ],
  },
];

export default routes;
