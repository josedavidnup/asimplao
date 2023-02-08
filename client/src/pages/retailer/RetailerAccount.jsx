import React, { useState, useEffect } from "react";
import RetailerNav from "../../components/nav/RetailerNav";
import { getProductsByCount } from "../../functions/product";

export const RetailerAccount = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    getProductsByCount(100)
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 border-right">
          <RetailerNav />
        </div>
        {products.length > 0 && <h4>All Products</h4>}
        <div className="col">Retailer Account page</div>
      </div>
    </div>
  );
};

export default RetailerAccount;
