import React from "react";
import "./favourites.css";
import { FaHeart } from "react-icons/fa";

const Favourites = () => {
  return (
    <div>
      <h2>Favourites</h2>
      <section className="fav-container">
        <div className="fav-item">
          <img
            src="https://secure-images.nike.com/is/image/DotCom/FB9893_101?align=0,1&cropN=0,0,0,0&resMode=sharp&fmt=jpg&wid=592&bgc=f5f5f5"
            alt="anh"
          />
          <div className="fav-icon-cover">
            <FaHeart className="fav-icon" />
          </div>
          <div className="fav-item-info">
            <h3>Air Jordan 1 Low SE</h3>
            <p>3,345,000đ</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Favourites;
