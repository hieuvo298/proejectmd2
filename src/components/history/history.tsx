import React from "react";

const History = () => {
  return (
    <div>
      <section id="products" className="products">
        <h1>Lịch sử mua hàng</h1>
      </section>
      <hr style={{ margin: "20px 0" }} />
      <section className="carts">
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Giỏ hàng</th>
              <th>Ngày mua</th>
              <th>Trạng thái</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </section>
    </div>
  );
};

export default History;
