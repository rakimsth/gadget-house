import { useCallback, useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";
import useProduct from "../../../hooks/useProduct";
import Paginate from "../../../components/PaginationByHook";

export default function ListProducts() {
  const navigate = useNavigate();
  const { data, list, remove } = useProduct();
  const [limit, setLimit] = useState(1);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchProduct = useCallback(async () => {
    const result = await list({ page: currentPage, limit: limit });
    if (result) {
      setTotal(result.total);
      setCurrentPage(result.page);
    }
  }, [list, currentPage, limit]);

  const handleRemove = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        const resp = await remove(id);
        if (resp.msg === "success") {
          Swal.fire({
            title: "Deleted!",
            text: "Data deleted successfully",
            icon: "success",
          });
        }
      }
    } catch (e) {
      alert(e);
    }
  };

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
                  <td className="text-center">
                    <FaEdit
                      onClick={() => {
                        navigate(`/admin/products/${product?._id}`);
                      }}
                    />
                    <FaTrashAlt
                      color="red"
                      onClick={() => handleRemove(product?._id)}
                    />
                  </td>
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
      <Paginate
        total={total}
        limit={limit}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        setLimit={setLimit}
      />
    </div>
  );
}
