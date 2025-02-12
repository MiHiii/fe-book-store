import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ContactPage from './pages/contact';
import LoginPage from './pages/login';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import RegisterPage from './pages/register';
import { callFetchAccount } from './services/api';
import { useDispatch, useSelector } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlice';
import Loading from './components/Loading';
import NotFound from './components/NotFound';
import AdminPage from './pages/admin';
import HomePage from './pages/HomePage';
import BookDetailPage from './pages/BookDetailPage';
import ProtectedRoute from './components/ProtectedRoute';
import UserTable from './components/Admin/User/UserTable';
import LayoutAdmin from './components/Admin/LayoutAdmin';
import AddUser from './components/Admin/User/AddUser';
import BookTable from './components/Admin/Book/BookTable';
import BookPage from './pages/BookPage';
import { SearchProvider } from './context/SearchContext';

const Layout = () => {
  return (
    <div className='layout-app min-h-screen flex flex-col'>
      <Header />
      <div className='flex-grow'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: any) => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === '/login' ||
      window.location.pathname === '/register'
    )
      return;
    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data.user));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: 'contact',
          element: <ContactPage />,
        },
        {
          path: 'book/:slug',
          element: <BookDetailPage />,
        },

        {
          path: 'book/',
          element: <BookPage />,
        },
      ],
    },

    {
      path: '/admin',
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: 'user',
          element: (
            <ProtectedRoute>
              <UserTable />
            </ProtectedRoute>
          ),
        },
        {
          path: 'user/add',
          element: (
            <ProtectedRoute>
              <AddUser />
            </ProtectedRoute>
          ),
        },
        {
          path: 'book/',
          element: (
            <ProtectedRoute>
              <BookTable />
            </ProtectedRoute>
          ),
        },
        {
          path: 'order',
          element: <ProtectedRoute>{/* <AdminOrderPage /> */}</ProtectedRoute>,
        },
      ],
    },

    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '/register',
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === '/login' ||
      window.location.pathname === '/register' ||
      window.location.pathname === '/' ||
      window.location.pathname.startsWith('/book') ? (
        <SearchProvider>
          <RouterProvider router={router} />
        </SearchProvider>
      ) : (
        <Loading />
      )}
    </>
  );
}
