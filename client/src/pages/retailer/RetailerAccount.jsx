import React, { useState, useEffect } from "react";
import RetailerNav from "../../components/nav/RetailerNav";

export const RetailerAccount = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 ">
          <RetailerNav />
        </div>
        <div className="col">
          <h4>Retailer Dashboard</h4>
        </div>
      </div>
    </div>
  );
};

export default RetailerAccount;
