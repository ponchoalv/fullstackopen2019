import React from "react";

const Filter = ({ filter, filterHandler }) => (
  <div>
    find countries <input value={filter} onChange={filterHandler} />
  </div>
);

export default Filter;
