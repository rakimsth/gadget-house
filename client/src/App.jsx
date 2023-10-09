import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Error from "./pages/Error";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NavBar from "./layouts/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
// Admin Routes
import Dashboard from "./pages/admin/Products";
import AdminProducts from "./pages/admin/Products";

import { PrivateRoute } from "./components/Routes";

const adminRoutes = [
  { path: "/dashboard", component: <Dashboard />, role: "admin" },
  { path: "/products", component: <AdminProducts />, role: "admin" },
  { path: "/orders", component: <AdminProducts />, role: "admin" },
  { path: "/users", component: <AdminProducts />, role: "admin" },
];

export default function App() {
  return (
    <>
      <div className="">
        <BrowserRouter>
          <NavBar />
          <main className="flex-shrink-0 d-flex flex-column min-vh-100">
            <div className="container mt-2 mb-5">
              <Routes>
                <Route path="/" element=<Home /> />
                <Route path="/login" element=<Login /> />
                <Route path="/about" element=<About /> />
                <Route path="/cart" element=<Cart /> />
                <Route path="/contact" element=<Contact /> />
                <Route path="/products" element=<Products /> />
                <Route path="/products/:id" element=<ProductDetail /> />

                {adminRoutes
                  ? adminRoutes.map((route, index) => {
                      return (
                        <Route
                          key={index}
                          path={`/admin${route?.path}`}
                          element={
                            <PrivateRoute role={route?.role ?? ""}>
                              {route?.component}
                            </PrivateRoute>
                          }
                        />
                      );
                    })
                  : null}
                <Route path="*" element=<Error /> />
              </Routes>
            </div>
          </main>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

//Public Route: anybody can access
//Private Route: public route + access token check
//Protected Route: private route + role check
