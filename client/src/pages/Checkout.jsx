import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "../slices/orderSlice";
import { removeAll } from "../slices/cartSlice";

export default function Checkout() {
  const [checkoutPayload, setCheckoutPayload] = useState({
    name: "",
    email: "",
    address: "",
    country: "",
    state: "",
    pobox: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const totalAmount = () => {
    return cart.reduce((acc, obj) => acc + obj.quantity * obj.price, 0);
  };

  const productItems = () => {
    return cart.map((item) => {
      return {
        quantity: item?.quantity,
        price: item?.price,
        amount: Number(item?.quantity) * Number(item?.price),
        product: item?.id,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = checkoutPayload;
    const { address, country, state, pobox, ...rest } = payload;
    rest.address = address.concat(", ", state, ", ", pobox, ", ", country);
    rest.total = totalAmount();
    rest.products = productItems();
    // Send the form data to order API
    const order = await dispatch(createOrder(rest));
    console.log({ order });
    if (order && order.payload.msg === "success") {
      dispatch(removeAll());
      navigate("/checkout/success");
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-4 order-md-2 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">3</span>
          </h4>
          <ul className="list-group mb-3">
            {cart.length > 0 ? (
              cart.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between lh-condensed"
                  >
                    <div>
                      <h6 className="my-0">
                        <span className="badge bg-secondary">
                          {item?.quantity}
                        </span>
                        &nbsp;
                        {item?.title.length > 30
                          ? item?.title.substring(0, 27).concat("...")
                          : item?.title}
                      </h6>
                      <small className="text-muted">
                        {" "}
                        {item?.description.length > 30
                          ? item?.description.substring(0, 50).concat("...")
                          : item?.description}
                      </small>
                    </div>
                    <span className="text-muted">
                      {Number(item?.price) * Number(item?.quantity)}
                    </span>
                  </li>
                );
              })
            ) : (
              <>Your Cart is Empty</>
            )}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (NPR)</span>
              <strong>{totalAmount()}</strong>
            </li>
          </ul>
        </div>
        <div className="col-md-8 order-md-1">
          <h4 className="mb-3">Billing address</h4>
          <form className="needs-validation" noValidate>
            <div className="row">
              <div className="col-md-12 mb-3">
                <label htmlFor="fullName">Full name</label>
                <input
                  type="text"
                  className="form-control"
                  id="fullName"
                  placeholder="John Smith"
                  value={checkoutPayload?.name}
                  onChange={(e) => {
                    setCheckoutPayload((prev) => {
                      return { ...prev, name: e.target.value };
                    });
                  }}
                  required
                />
                <div className="invalid-feedback">
                  Valid Full name is required.
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="you@example.com"
                value={checkoutPayload?.email}
                onChange={(e) => {
                  setCheckoutPayload((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
              <div className="invalid-feedback">
                Please enter a valid email address for shipping updates.
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                required
                value={checkoutPayload?.address}
                onChange={(e) => {
                  setCheckoutPayload((prev) => {
                    return { ...prev, address: e.target.value };
                  });
                }}
              />
              <div className="invalid-feedback">
                Please enter your shipping address.
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 mb-3">
                <label htmlFor="country">Country</label>
                <select
                  className="form-select"
                  required
                  value={checkoutPayload?.country}
                  onChange={(e) => {
                    setCheckoutPayload((prev) => {
                      return { ...prev, country: e.target.value };
                    });
                  }}
                >
                  <option value="">Choose...</option>
                  <option value="Nepal">Nepal</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="state">State</label>
                <select
                  className="form-select"
                  required
                  value={checkoutPayload?.state}
                  onChange={(e) => {
                    setCheckoutPayload((prev) => {
                      return { ...prev, state: e.target.value };
                    });
                  }}
                >
                  <option value="">Choose...</option>
                  <option value="Bagmati">Bagmati</option>
                  <option value="Gandaki">Gandaki</option>
                  <option value="Karnali">Karnali</option>
                  <option value="Koshi">Koshi</option>
                  <option value="Lumbini">Lumbini</option>
                  <option value="Madhesh">Madhesh</option>
                  <option value="Sudurpashchim">Sudurpashchim</option>
                </select>
                <div className="invalid-feedback">
                  Please provide a valid state.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="zip">P.O. Box</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder=""
                  required
                  value={checkoutPayload?.pobox}
                  onChange={(e) => {
                    setCheckoutPayload((prev) => {
                      return { ...prev, pobox: e.target.value };
                    });
                  }}
                />
                <div className="invalid-feedback">Zip code required.</div>
              </div>
            </div>
            <hr className="mb-4" />

            <h4 className="mb-3">Payment</h4>

            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value="COD"
                checked
                disabled
              />
              <label className="form-check-label">COD</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value="CC"
                disabled
              />
              <label className="form-check-label">Credit/Debit Card</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="inlineRadioOptions"
                value="Paypal"
                disabled
              />
              <label className="form-check-label">Paypal</label>
            </div>
            {/* <div className="d-block my-3">
          <div className="custom-control custom-radio">
            <input
              id="credit"
              name="paymentMethod"
              type="radio"
              className="custom-control-input"
              checked
              required
            />
            <label className="custom-control-label" htmlFor="credit">
              Credit card
            </label>
          </div>
          <div className="custom-control custom-radio">
            <input
              id="debit"
              name="paymentMethod"
              type="radio"
              className="custom-control-input"
              required
            />
            <label className="custom-control-label" htmlFor="debit">
              Debit card
            </label>
          </div>
          <div className="custom-control custom-radio">
            <input
              id="paypal"
              name="paymentMethod"
              type="radio"
              className="custom-control-input"
              required
            />
            <label className="custom-control-label" htmlFor="paypal">
              Paypal
            </label>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-name">Name on card</label>
            <input
              type="text"
              className="form-control"
              id="cc-name"
              placeholder=""
              required
            />
            <small className="text-muted">
              Full name as displayed on card
            </small>
            <div className="invalid-feedback">Name on card is required</div>
          </div>
          <div className="col-md-6 mb-3">
            <label htmlFor="cc-number">Credit card number</label>
            <input
              type="text"
              className="form-control"
              id="cc-number"
              placeholder=""
              required
            />
            <div className="invalid-feedback">
              Credit card number is required
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label htmlFor="cc-expiration">Expiration</label>
            <input
              type="text"
              className="form-control"
              id="cc-expiration"
              placeholder=""
              required
            />
            <div className="invalid-feedback">Expiration date required</div>
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="cc-expiration">CVV</label>
            <input
              type="text"
              className="form-control"
              id="cc-cvv"
              placeholder=""
              required
            />
            <div className="invalid-feedback">Security code required</div>
          </div>
        </div> */}
            <hr className="mb-4" />

            <div className="d-grid gap-2">
              <button
                className="btn btn-secondary btn-lg btn-block"
                onClick={(e) => handleSubmit(e)}
              >
                Continue to checkout
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
