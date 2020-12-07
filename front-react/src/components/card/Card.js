import React from "react";
import "./card.css";

function CardView(props) {
  // check if props.picture url is empty
  const checkImageString = () => {
    if (props.picture.length !== 0) {
      return (
        props.picture[0].substring(0, props.picture[0].length - 10) +
        "600x450.jpg"
      );
    } else return "";
  };

  return (
    <div className="card text-center entireCard" style={props.style}>
      <div className="overflow">
        <img className="cardview-image" src={checkImageString()} alt="img1" />
      </div>
      <div
        className="card-body text-dark"
        style={{ border: "1px", borderRadius: "40px !important" }}>
        <h4 className="card-title">{`${props.title}`}</h4>
        <p className="card-description2">{props.hood}</p>
        <p className="card-description">{props.price}</p>
        {/* <button
          className="card-button"
          name={props.post._id}
          onClick={() => {
            props.function(props.post);
          }}>
          {props.buttonName}
        </button> */}
      </div>
    </div>
  );
}

export default CardView;
