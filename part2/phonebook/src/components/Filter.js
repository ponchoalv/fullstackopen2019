import React from "react";

const Filter = ({ filterField, filterFieldHandler }) => (
  <div>
    filter shown witih{" "}
    <input value={filterField} onChange={filterFieldHandler} />
  </div>
);

export default Filter;
