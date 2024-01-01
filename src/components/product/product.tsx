import "./product.css";
import ProductService from "../../services/product.service";
import { IProduct } from "../../types/types";
import { IoCartOutline } from "react-icons/io5";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { notifyError, notifySucces } from "../../common/toastify";
import UserService from "../../services/user.service";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../common/formatPrice";
import { ToastContainer } from "react-toastify";


const Product = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const idUser: string = localStorage.getItem("idUser") as string;
  // const [selectedCategory, setSelectedCategory] = useState("all");
  const userService = new UserService();
  const navigation = useNavigate();
  const linkToDetail=(id: number | undefined):void => {
    navigation("/productdetail/" + id)
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productService = new ProductService();
        const pageLimit = 6;
        const data: any = await productService.getPaginatedProducts(
          currentPage,
          pageLimit
        );
        setProducts(data.data);
      } catch (error) {
        console.error("Error getting products:", error);
      }
    };
    fetchData();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleAddCart = async (idUser: number, itemProduct: IProduct) => {
  //   if (idUser) {
  //     if (itemProduct) {
  //       notifyError("This product is out of stock");
  //     } else {
  //       await userService.addToCart(idUser, itemProduct);
  //       notifySucces("Add Success");
  //     }
  //   } else {
  //     navigation("/login");
  //   }
  // };

  // const handleCategoryChange = async (category: string) => {
  //   setSelectedCategory(category);
  //   try {
  //     const productService = new ProductService();
  //     const data: any = await productService.getProductsByCategory(category);
  //     setProducts(data.data);
  //   } catch (error) {
  //     console.error('Error get product by category:', error);
  //   }
  // };

  return (
    <div>
      <ToastContainer></ToastContainer>
      <h4>All Shoes</h4>
      <section className="product-container">
        {products.map((item: IProduct) => (
          <div className="card" key={item.id}>
            <span className="like">
              <i className="bx bx-heart" />
            </span>
            <span className="cart">
              <i className="bx bx-cart-alt" />
            </span>
            <div className="card__img">
              <img onClick={() => linkToDetail(item.id)} src={item.img} alt="ảnh" />
            </div>
            <h2 className="card__title">{item.productname}</h2>
            <p className="card__price">{formatPrice(item.price)}</p>

            <div className="card__action">
                <button className="add-button"  >
                   <IoCartOutline className="cart-icon" />Add
                </button>
            </div>
          </div>
        ))}
      </section>
      {/* <div className="category-buttons">
        <button onClick={() => handleCategoryChange("all")}>All</button>
        <button onClick={() => handleCategoryChange("Jordan")}>Jordan</button>
        <button onClick={() => handleCategoryChange("running")}>Running</button>
        <button onClick={() => handleCategoryChange("lifestyle")}>Lifestyle</button>
      </div> */}
      <Pagination defaultCurrent={1} total={30} onChange={handlePageChange} />
    </div>
  );
};

export default Product;
