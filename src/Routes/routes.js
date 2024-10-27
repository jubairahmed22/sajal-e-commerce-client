import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import ErrorPage from '../Pages/Shared/ErrorPage'
import Login from '../Pages/Login/Login'
import Signup from '../Pages/Login/Signup'
import Main from '../Layout/Main'
import ComingSoon from '../Pages/Shared/ComingSoon'
import Details from '../Pages/Details'
import SearchResult from '../Pages/SearchResult'
import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../Layout/DashboardLayout'
import MyBookings from '../Pages/Dashboard/MyBookings'
import BecomeAHost from '../Pages/Dashboard/BecomeAHost'
import Welcome from '../Pages/Dashboard/Welcome'
import AllUsers from '../Pages/Dashboard/AllUsers'
import AddHome from '../Pages/Dashboard/AddHome'
import ManageHomes from '../Pages/Dashboard/ManageHomes'
import AllBookings from '../Pages/Dashboard/AllBookings'
import AdminRoute from './AdminRoute'
import HostRoute from './HostRoute'
import HomeAll from '../Pages/HomeAll'
import ThemeChange from '../Pages/Dashboard/Admin/ThemeChange/ThemeChange'
import ProductDetails from '../Pages/ProductDetails'
import ProductsList from '../Pages/ProductsList'
import Cart from '../Pages/Cart/Cart'
import AdminDashboard from '../Components/Dashboard/AdminAllPage/AdminDashboard/AdminDashboard'
import MyProducts from '../Components/Dashboard/AdminAllPage/MyProducts/MyProducts'
import AddProducts from '../Components/Dashboard/AdminAllPage/AddProducts/AddProducts'
import Orders from '../Components/Dashboard/AdminAllPage/Orders/Orders'
import AllUsersAdmin from '../Components/Dashboard/AdminAllPage/AllUsersAdmin/AllUsersAdmin'
import ElectricalCart from '../Pages/Cart/ElectricalCart'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomeAll></HomeAll>,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/cart',
        element: <PrivateRoute><ElectricalCart /></PrivateRoute>,
      },
     
      {
        path: '/coming-soon',
        element: <ComingSoon />,
      },
      {
        path: '/service-details/:id',
        element: <Details />,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/home/${params.id}`),
      },
      {
        path: '/search-result',
        element: <SearchResult />,
      },
      {
        path: '/products',
        element: <ProductsList />,
        loader: ({ request }) => {
          const url = new URL(request.url);
          const page = url.searchParams.get('page') || 1; // Get page from URL query params
          return fetch(`http://localhost:8000/products?page=${page}&limit=5`);
        },
      },
      
      {
        path: '/product-details/:id',  // Product details page route
        element: <ProductDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:8000/products/${params.id}`),  // Fetch product details using ID
      },
 
    ],
  },
  {
    path: '/dashboard',
    errorElement: <ErrorPage />,
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: (
          <PrivateRoute>
            <Welcome />
          </PrivateRoute>
        ),
      },
      {
        path: 'admin-dashboard',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: 'my-product',
        element: (
          <AdminRoute>
            <MyProducts />
          </AdminRoute>
        ),
      },
      {
        path: 'add-product',
        element: (
          <AdminRoute>
            <AddProducts />
          </AdminRoute>
        ),
      },
      {
        path: 'orders',
        element: (
          <AdminRoute>
            <Orders />
          </AdminRoute>
        ),
      },
      {
        path: 'all-users',
        element: (
          <AdminRoute>
            <AllUsersAdmin />
          </AdminRoute>
        ),
      },
      // E-END
      
    ],
  },
])

export default router
