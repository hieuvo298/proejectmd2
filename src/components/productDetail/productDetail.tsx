import React, { useEffect, useState } from "react";
import "./productDetail.css";
import ProductService from "../../services/product.service";
import { IProduct, ISize } from "../../types/types";
import { useNavigate, useParams } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { InputNumber } from "antd";
import UserService from "../../services/user.service";
import { notifyError, notifySucces } from "../../common/toastify";
import { ToastContainer } from "react-toastify";
import { formatPrice } from "../../common/formatPrice";

const onChange = (value: any) => {
  console.log("changed", value);
};

const ProductDetail = (): JSX.Element => {
  const [productDetail, setProductDetail] = useState<IProduct>();
  console.log(
    productDetail
  );
  const productService = new ProductService();
  const [selectedSize, setSelectedSize] = useState<number>(40);
  const [quantity, setQuantity] = useState<number>(1);
  const userService = new UserService();
  const idUser: string = localStorage.getItem("idUser") as string;
  const navigate = useNavigate();

  let param: any = useParams();
  let idProduct: number = param.id;
  useEffect(() => {
    const getProducts = async () => {
      const result: any = await productService.getProductsById(idProduct);
      setProductDetail(result.data);
    };
    getProducts();
  }, []);
  const handleAddToCart = async () => {
    if (idUser&&productDetail) {
      const isHasProduct =
      (productDetail?.size.find((size) => size?.sizeNumber === selectedSize)as ISize)
      ?.stock > 0;
      if (!isHasProduct) {
        notifyError("Product is not enough to be added");
      } else {
        await userService.addToCart(
          +idUser,
          productDetail?.id||0,
          quantity,
          selectedSize
        );
        notifySucces("Add Success");
      }
    } else {
      navigate("/login");
    }
  };
  return (
    <div>
      <ToastContainer></ToastContainer>
      <section className="product-item">
        <div className="main-product-img">
          <img src={productDetail?.img} alt="anh" />
        </div>
        <div className="product-des">
          <h4>{productDetail?.productname}</h4>
          <p>
            Men's Shoes
            <br />
            {productDetail?.price}
          </p>
          <p>Select size:</p>
          <div className="size-product">
            <InputNumber
              value={selectedSize}
              min={40}
              max={46}
              defaultValue={40}
              onChange={(value) => setSelectedSize(value as number)}
            />
          </div>
          <p>Quantity:</p>
          <InputNumber
            min={1}
            max={100}
            value={quantity}
            defaultValue={1}
            onChange={(value) => setQuantity(value as number)}
          />
          <div className="add-like-btn">
            <button onClick={handleAddToCart} className="add-btn">
              Add to Bag
            </button>
            <button className="like-btn">
              Favorite <CiHeart className="heart-icon" />
            </button>
          </div>
          <p>
            The radiance lives on in the Nike Air Force 1 '07, the basketball
            original that puts a fresh spin on what you know best: durably
            stitched overlays, clean finishes and the perfect amount of flash to
            make you shine.
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;

