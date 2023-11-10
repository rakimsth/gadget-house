import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Row,
  Stack,
  Table,
} from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { fetchProducts } from "../../../slices/productSlice";
import useOrders from "../../../hooks/useOrders";

export default function AddOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products: allProducts } = useSelector((state) => state.products);
  const { create } = useOrders();

  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    paymentMethod: "",
    total: 0,
  });
  const [products, setProducts] = useState([]);

  const [item, setItem] = useState({
    product: "",
    quantity: 0,
    price: 0,
    amount: 0,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = order;
      payload.products = products;
      const result = await create(payload);
      if (result?.msg === "success") {
        alert("Order Added Successfully");
        navigate("/admin/orders");
      }
    } catch (e) {
      alert(e);
    }
  };

  const handleAddingProducts = (e) => {
    e.preventDefault();
    if (!item || !item.product || !item.quantity || item.quantity === 0) return;
    const newProduct = [...products, item];
    setProducts(newProduct);
    setOrder((prev) => {
      return {
        ...prev,
        total: newProduct.reduce((acc, item) => acc + item?.amount, 0),
      };
    });
    setItem({
      product: "",
      quantity: 0,
      price: 0,
      amount: 0,
    });
  };

  const removeProduct = (id) => {
    const newProduct = products.filter((product) => product?.product !== id);
    setProducts(newProduct);
    setOrder((prev) => {
      return {
        ...prev,
        total: newProduct.reduce((acc, item) => acc + item?.amount, 0),
      };
    });
  };

  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit: 1000000, page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  return (
    <Container>
      <Row>
        <h3 className="text-center">Add new Order</h3>
        <Col md={3}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Buyer Name"
                value={order?.name}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, name: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={order?.email}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Address"
                value={order?.address}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, address: e.target.value };
                  });
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Method</Form.Label>
              <Form.Select
                value={order?.paymentMethod}
                onChange={(e) => {
                  setOrder((prev) => {
                    return { ...prev, paymentMethod: e.target.value };
                  });
                }}
              >
                <option>Open this select menu</option>
                <option value="COD">COD</option>
                <option value="STRIPE">Stripe</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" disabled value={order?.total} />
            </Form.Group>
            <Stack direction="horizontal" gap={3}>
              <Button variant="primary" className="w-50" type="submit">
                Submit
              </Button>
              <Link to="/admin/orders" className="btn btn-danger">
                Go Back
              </Link>
            </Stack>
          </Form>
        </Col>
        <Col className="border rounded">
          <h5 className="text-center">Add Products</h5>
          <Row>
            <Col lg={4}>
              <Form onSubmit={handleAddingProducts}>
                <Form.Group className="mb-3">
                  <Form.Label>Products</Form.Label>
                  <Form.Select
                    value={item?.product}
                    onChange={(e) => {
                      setItem((prev) => {
                        return {
                          ...prev,
                          product: e.target.value,
                          price: allProducts.find(
                            (item) => item?._id === e.target.value
                          ).price,
                        };
                      });
                    }}
                  >
                    <option>Open this select menu</option>
                    {allProducts.map((prod) => {
                      return (
                        <option key={prod?._id} value={prod?._id}>
                          {prod?.name} (Qty: {prod?.quantity})
                        </option>
                      );
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter Buyer Name"
                    value={item?.quantity}
                    onChange={(e) => {
                      setItem((prev) => {
                        return {
                          ...prev,
                          quantity: Number(e.target.value),
                          amount: Number(e.target.value) * item?.price,
                        };
                      });
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    disabled
                    placeholder="Enter Buyer Name"
                    value={item?.price}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control type="text" disabled value={item?.amount} />
                </Form.Group>
                <Stack direction="horizontal" gap={3}>
                  <Button variant="primary" className="w-50" type="submit">
                    Submit
                  </Button>
                  <Link to="/admin/orders" className="btn btn-danger">
                    Go Back
                  </Link>
                </Stack>
              </Form>
            </Col>
            <Col>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.length > 0 ? (
                    products.map((product, idx) => {
                      return (
                        <tr key={idx}>
                          <td>
                            {
                              allProducts.find(
                                (item) => item?._id === product?.product
                              ).name
                            }
                          </td>
                          <td>{product?.quantity}</td>
                          <td>{product?.price}</td>
                          <td>{product?.amount}</td>
                          <td className="text-center">
                            <FaTrashAlt
                              onClick={() => removeProduct(product?.product)}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center">
                        No Products added
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
