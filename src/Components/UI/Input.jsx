import React, { Fragment } from "react";

const Input = (props) => {
  return (
    <Fragment>
      <label for={props.id}>{props.name}</label>
      <input
        type={props.type}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </Fragment>
  );
};

export default Input;
