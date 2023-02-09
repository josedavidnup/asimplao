import React, { useState, useEffect } from "react";
import RetailerProductCard from "../../../components/cards/RetailerProductCard";
import RetailerNav from "../../../components/nav/RetailerNav";
import { getProductsByCount } from "../../../functions/product";

const AllProduct = () => {
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
        <div className="col-md-2 ">
          <RetailerNav />
        </div>
        <div className="col">
          <h4>All Products</h4>
          <div className="col">
            {products.length > 0 &&
              products.map((product) => (
                <RetailerProductCard product={product} key={product._id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
