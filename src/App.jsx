import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import FrontLayout from "./components/layout/front";
import AdminLayout from "./components/layout/admin";

import HomePage from "./pages/public/HomePage";
import CategoryPage from "./pages/public/CategoryPage";
import BlogsPage from "./pages/public/BlogsPage";
import BlogPage from "./pages/public/BlogPage";
import AboutPage from "./pages/public/AboutPage";
import RegisterPage from "./pages/public/RegisterPage";
import LoginPage from "./pages/public/LoginPage";
import NotFoundPage from "./pages/public/NotFoundPage";

import MyBlogsPage from "./pages/user/MyBlogsPage";
import AccountPage from "./pages/common/AccountPage";

import { AuthContext } from "./context/AuthContext";
import DashboardPage from "./pages/admin/dashboard";
import CategoriesPage from "./pages/admin/categories";
import UsersPage from "./pages/admin/users";

function App() {
  const { isAuthenticated, role } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<FrontLayout />}>
          <Route index element={<HomePage />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="blogs/:blogId" element={<BlogPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />

          {/* {isAuthenticated ? (
            <Route path="my-blogs" element={<MyBlogsPage />} />
          ) : null}
          {isAuthenticated ? (
            <Route path="account" element={<AccountPage />} />
          ) : null} */}

          <Route
            path="my-blogs"
            element={
              isAuthenticated ? <MyBlogsPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="account"
            element={
              isAuthenticated ? <AccountPage /> : <Navigate to="/login" />
            }
          />
        </Route>
        {isAuthenticated && role === "admin" ? (
          <Route path="/" element={<AdminLayout />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="users" element={<UsersPage />} />
          </Route>
        ) : null}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
