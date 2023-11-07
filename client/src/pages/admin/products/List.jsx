import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";

import useProduct from "../../../hooks/useProduct";

export default function ListProducts() {
  const { data, error, list } = useProduct();

  const fetchProduct = useCallback(async () => {
    await list();
  }, [list]);

  console.log(data);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return (
    <div>
      <h1 className="text-center">Products</h1>
      <div className="d-flex mb-2 flex-row-reverse">
        <Link to="/admin/products/add" className="btn btn-danger">
          Add new Product
        </Link>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length > 0 ? (
            data.map((product, idx) => {
              return (
                <tr key={product?._id}>
                  <td>{idx + 1}</td>
                  <td>{product?.name}</td>
                  <td>{product?.quantity}</td>
                  <td>{product?.price}</td>
                  <td>edit, delete button</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={5}>No Products Found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}
