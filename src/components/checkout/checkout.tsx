import React, { useState, useEffect, ChangeEvent } from "react";
import "./checkout.css";
import UserService from "../../services/user.service";
import ProductService from "../../services/product.service";
import OrderService from "../../services/oders.service";
import { IOrder, ICart } from "../../types/types";
import { formatPrice } from "../../common/formatPrice";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../common/toastify";
import { ToastContainer } from "react-toastify";

const Checkout = (): JSX.Element => {
  const orderService = new OrderService();
  const userService = new UserService();
  const productService = new ProductService();
  const navigate = useNavigate();

  const idUser = localStorage.getItem("idUser");
  const [total, setTotal] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<string>("");
  const [cartItems, setCartItems] = useState<ICart[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user: any = await userService.getUserById(Number(idUser));
        setCartItems(user.data.cart);

        const calculatedTotal = user.data.cart.reduce(
          (acc: number, item: ICart) => acc + item.quantity * item.price,
          0
        );
        setTotal(calculatedTotal);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchCartItems();
  }, [idUser]);

  const handleCheckOut = async () => {
    const orderDetails = cartItems.map((item, index) => ({
      id: index + 1,
      productName: item.productname, 
      quantity: item.quantity,
      price: item.price,
      shoeSize: item.shoeSize,
      desc: item.desc,
      img: item.img,
    }));

    const formCheckOut: IOrder = {
      idUser: Number(idUser),
      userName: name,
      phone: phone,
      address: address,
      totalPrice: total,
      status: 1,
      date: new Date().toISOString(),
      orderDetails: orderDetails,
      paymentMethod: "", 
    };
    console.log("🚀 ~ file: checkout.tsx:67 ~ handleCheckOut ~ formCheckOut:", formCheckOut)


    if (formCheckOut.address.length === 0 || formCheckOut.phone.length === 0) {
      notifyError("Please enter all fields");
    } else {
      try {
        await orderService.postOrder(formCheckOut);
        await userService.removeCarts(Number(idUser));
        await productService.onMinusStock(formCheckOut.orderDetails);

        navigate("/histories", { state: true });
      } catch (error) {
        console.error("Error submitting order:", error);
        notifyError("Error submitting order");
      }
    }
  };


  return (
    <div>
      <ToastContainer></ToastContainer>
      <section className="main-checkout">
        <section className="checkout-form">
          <h3>Thông tin khách hàng</h3>
          <p>Họ tên:</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <p>Địa chỉ:</p>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <p>Điện thoại:</p>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <p>Email:</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <p>Ngày sinh:</p>
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
          <button className="checkout-btn" onClick={handleCheckOut}>
            Thanh toán
          </button>
        </section>
        <section className="payment-cart">
          <h3>Giỏ hàng</h3>
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên </th>
                <th>Size</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item: ICart, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.productname}</td>
                  <td>{item.shoeSize}</td>
                  <td>
                    <img
                      src={item.img}
                      alt="anh"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </td>
                  <td>{item.quantity}</td>
                  <td>{formatPrice(item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: 10 }}>
            <strong>Tổng giá :</strong> {formatPrice(total)}
          </p>
        </section>
      </section>
    </div>
  );
};

export default Checkout;
