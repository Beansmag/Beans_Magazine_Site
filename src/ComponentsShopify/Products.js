// import { useState } from "react";
import Product from "./Product";

import "../Styles/Home.css";

export default (props) => {
  return (
    // <div className="Products-wrapper" style={{ overflow: "hidden" }}>
    <div className="Products-wrapper">
      <Product history={props.history} />
    </div>
  );
};
