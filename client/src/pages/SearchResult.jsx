import React from "react";
import "../css/SearchResult.css";

export default function (props) {
  return (
    <>
      <div className="card-container">
        <div className="card-search">
          <div className="card-add--img">
            <img className="card--image" src={props.data.imageUrl} alt="" />
          </div>
          <h1 className="card--company">{props.data.company[0]}</h1>
        
          <h4 className="card--headline">{props.data.headline}</h4>
          <p className="card--text">{props.data.primaryText}</p>
          <button className="card--CTA btn btn-primary">
            {props.data.CTA}
          </button>
        </div>
      </div>
    </>
  );
}
