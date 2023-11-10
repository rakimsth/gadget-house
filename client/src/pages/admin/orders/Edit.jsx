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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import useOrders from "../../../hooks/useOrders";
import { fetchProducts } from "../../../slices/productSlice";

export default function EditOrder() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { products: allProducts } = useSelector((state) => state.products);

  const { getById, update } = useOrders();

  const [order, setOrder] = useState({
    name: "",
    email: "",
    address: "",
    total: 0,
    products: [],
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = order;
      payload.id = id;
      const result = await update(id, payload);
      if (result?.msg === "success") {
        alert("Order Updated Successfully");
        navigate("/admin/orders");
      }
    } catch (e) {
      alert(e);
    }
  };

  const fetchDetail = useCallback(async () => {
    try {
      const data = await getById(id);
      if (data) {
        const {
          orderDate,
          isArchived,
          created_at,
          updated_at,
          created_by,
          updated_by,
          ...rest
        } = data;
        setOrder((prev) => {
          return { ...prev, ...rest };
        });
      }
    } catch (e) {
      alert(e);
    }
  }, [id, getById]);

  const initFetch = useCallback(() => {
    dispatch(fetchProducts({ limit: 1000000, page: 1 }));
  }, [dispatch]);

  useEffect(() => {
    initFetch();
  }, [initFetch]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

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
          <h5 className="text-center">Products</h5>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {order?.products.length > 0 ? (
                  order?.products.map((product, idx) => {
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
        </Col>
      </Row>
    </Container>
  );
}
