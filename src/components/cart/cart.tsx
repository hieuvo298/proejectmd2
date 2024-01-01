import React, { useEffect, useState } from "react";
import "./cart.css";
import { Link, useNavigate } from "react-router-dom";
import UserService from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { ICart } from "../../types/types";
import { FaRegTrashCan } from "react-icons/fa6";
import { formatPrice } from "../../common/formatPrice";
import { message } from "antd";
import { update } from "../../store/reducer/update";


const Cart = () => {
  const idUser = localStorage.getItem("idUser") as string;
  const [cartItems, setCartItems] = useState<ICart[]>([]);
  const userService = new UserService();
  const status = useSelector((state: any) => state.update);
  const [total, setTotal] = useState<number>(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const user: any = await userService.getUserById(Number(idUser));
      setCartItems(user.data.cart);
      const calculatedTotal = user.data.cart.reduce(
        (acc: any, item: any) => acc + item.quantity * item.price,
        0
      );
      setTotal(calculatedTotal);
    };
    getUser();
  }, [status, idUser]);
  const handleDelete = async (item: ICart, idUser: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      await userService.onDelete(item, idUser);
      message.success("Delete Success");
      dispatch(update())
    }
  };

  return (
    <div>
      <section id="products" className="products">
        <h1>Giỏ hàng</h1>
      </section>
      <hr style={{ margin: "20px 0" }} />
      {cartItems.length === 0 ? (
        <img
        className="empty-cart"
          src="https://firebasestorage.googleapis.com/v0/b/myproject-12c2b.appspot.com/o/asset%2Fempty-cart.png?alt=media&token=0ec70cc7-58bd-4a02-8e2a-d1ca00db4d45"
          alt=""
        />
      ) : (
        <section className="carts">
          <table cellSpacing={0}>
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên sản phẩm</th>
                <th>Size</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Actions</th>
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
                  <td>
                    {" "}
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(item, Number(idUser))}
                    >
                      <FaRegTrashCan className="delete-icon" />
                    </button>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-price">
            <strong>Tổng giá:</strong> {formatPrice(total)}
          </p>
          <button className="payment">
            <Link to="/checkout">Thanh toán</Link>
          </button>
        </section>
      )}
    </div>
  );
};

export default Cart;
