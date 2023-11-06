import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoute } from "./components/Routes";
// Layout
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

// Default Routes
import About from "./pages/About";
import Cart from "./pages/Cart";
import { CheckoutPage } from "./components/CheckoutStatus";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

// Admin Routes
import Dashboard from "./pages/admin/Products";
import AdminProducts from "./pages/admin/Products";

export default function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<About />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/checkout/failed"
                element={
                  <CheckoutPage
                    type="failed"
                    msgHeader="Transaction Failed"
                    msg="Something went wrong. Try again."
                  />
                }
              />
              <Route path="/checkout/success" element={<CheckoutPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="*" element={<Error />} />
            </Route>
            <Route path="/admin" element={<AdminLayout />}>
              <Route
                path="/admin/dashboard"
                element={<PrivateRoute role={""}>{<Dashboard />}</PrivateRoute>}
              />
              <Route
                path="/admin/products"
                element={
                  <PrivateRoute role="admin">{<AdminProducts />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <PrivateRoute role="admin">{<AdminProducts />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/orders"
                element={
                  <PrivateRoute role="admin">{<AdminProducts />}</PrivateRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <PrivateRoute role="admin">{<AdminProducts />}</PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}
