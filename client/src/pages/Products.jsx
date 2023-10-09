import "./Product.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../slices/cartSlice";
import { fetchProducts } from "../slices/productSlice";

import useApi from "../hooks/useApi";
import { URLS } from "../constants";

const Products = () => {
  const { error, data, list } = useApi();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    list({ url: URLS.PRODUCTS });
  }, [list]);

  useEffect(() => {
    if (data) {
      dispatch(fetchProducts(data));
    }
  }, [data, dispatch]);

  if (error) return <>{JSON.stringify(error)}</>;
  console.log({ products });
  return (
    <>
      <div className="productBody">
        <section className="section">
          <div className="container">
            <div className="row justify-content-center section-heading">
              <div className="col-lg-6 text-center">
                <h3 className="h2 mt-2">Latest Arrivals</h3>
              </div>
            </div>
            <div className="row g-3 g-lg-4">
              {products && products.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <div className="col-6 col-lg-3" key={product?.id || index}>
                      <div className="product-card-10">
                        <div className="product-card-image">
                          {/* <div className="badge-ribbon">
                              <span className="badge bg-danger">Sale</span>
                          </div> */}
                          <div className="product-media h-75">
                            <a href="#">
                              <img
                                loading="lazy"
                                className="img-fluid"
                                src={
                                  product?.image ||
                                  "https://www.bootdey.com/image/380x380/FF00FF/000000"
                                }
                                height="150px"
                                title={product?.name || ""}
                                alt={product?.name || ""}
                              />
                            </a>
                          </div>
                        </div>
                        <div className="product-card-info">
                          <h6 className="product-title">
                            <a href="#">{product?.name || product?.title}</a>
                          </h6>
                          <div className="product-price">
                            <span className="text-primary">
                              {/* 28.<small>50</small> */}
                              NPR {product?.price || ""}
                            </span>
                            {/* <del className="fs-sm text-muted">
                      $38.<small>50</small>
                    </del> */}
                          </div>
                          <div className="product-action">
                            <Link
                              className="btn"
                              to={`/products/${product?.id}`}
                            >
                              <i className="fa fa-eye"></i>
                            </Link>
                            <button
                              className="btn"
                              onClick={() => {
                                dispatch(addToCart(product));
                              }}
                            >
                              <i className="fa fa-shopping-cart"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="container">
                  <div className="p-5 text-center text-primary">
                    No Products Found...
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Products;
