import React from "react";
import { ReactComponent as NotFoundSVG } from "../../assets/nodata.svg";

const NotFound = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "50vh",
    }}
  >
    <div style={{ width: "350px", height: "350px" }}>
      <NotFoundSVG width="100%" height="100%" />
    </div>
  </div>
);

export default NotFound;
