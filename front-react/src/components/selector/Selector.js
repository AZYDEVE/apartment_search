import React, { useState } from "react";
import Select from "react-select";

function Selector(props) {
  return (
    <div>
      <h5>{props.label}</h5>
      <Select options={props.option} onChange={props.onChange} />
    </div>
  );
}

export default Selector;
