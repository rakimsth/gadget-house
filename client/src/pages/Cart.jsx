import { Image } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsArrowLeftSquare } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const removeFromCart = (id) => {
    if (id) {
      dispatch(removeItem(id));
    }
  };
  return (
    <>
      {cart.length > 0 ? (
        <FullCart items={cart} removeFromCart={removeFromCart} />
      ) : (
        <EmptyCart />
      )}
    </>
  );
};

const EmptyCart = () => {
  return (
    <>
      <div className="m-5 bg-body-tertiary rounded-3 text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Your cart is empty</h1>
          <a className="btn btn-light btn-lg" href="/products">
            <BsArrowLeftSquare />
            &nbsp;Continue Shopping
          </a>
        </div>
      </div>
    </>
  );
};

const FullCart = ({ items, removeFromCart }) => {
  return (
    <>
      <h1 className="text-center m-5">Your Cart</h1>
      <div className="row">
        <div className="col-md-12">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item?.name}</td>
                    <td>
                      <Image
                        width={40}
                        height={40}
                        src={
                          item?.image ||
                          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/2048px-No_image_available.svg.png"
                        }
                        thumbnail
                      />
                    </td>
                    <td>{item?.price}</td>
                    <td>
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                      >
                        -
                      </span>
                      <span className="btn btn-info">{item?.quantity}</span>
                      <span
                        className="btn btn-primary"
                        style={{ margin: "2px" }}
                      >
                        +
                      </span>
                    </td>
                    <td>{Number(item?.price) * Number(item?.quantity)}</td>
                    <td>
                      <AiFillCloseCircle
                        color="red"
                        size={24}
                        onClick={() => {
                          removeFromCart(item?.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="5">Total Carts</td>
                <td>Total Amount</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Cart;
