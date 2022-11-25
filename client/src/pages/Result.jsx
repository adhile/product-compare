import React from "react";
import "../css/Result.css";
import { Rating } from "react-simple-star-rating";
//card component for showing products from response
export default function (props) {
  return (
    <div className="product-card">
      <div className="card-product--id">
        <p id="card-product--id">{props.data.id}</p>
        <Rating
          className="card-product--rating"
          size={35}
          initialValue={props.data.ratings}
          readonly="true"
        />
      </div>

      <p id="card-product--name">{props.data.name}</p>
      <p>${props.data.price}</p>
    </div>
  );
}
