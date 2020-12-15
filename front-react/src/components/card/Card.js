import React from "react";
import "./card.css";
import Heart from "../heart/Heart";
import { Link } from "react-router-dom";

function CardView(props) {
  // check if props.picture url is empty
  const checkImageString = () => {
    if (props.post.images.length !== 0) {
      return (
        props.post.images[0].substring(0, props.post.images[0].length - 10) +
        "600x450.jpg"
      );
    } else return "";
  };

  return (
    <div className="card text-center entireCard" style={props.style}>
      <div className="heart-postcard">
        <Heart post={props.post} currentpage={props.currentPage} />
      </div>
      <Link
        to={{
          pathname: "/postPage",
          state: { post: props.post, allPost: props.allPost },
        }}>
        <div className="overflow">
          <img className="cardview-image" src={checkImageString()} alt="img1" />
        </div>
        <div
          className="card-body text-dark"
          style={{ border: "1px", borderRadius: "40px !important" }}>
          <h4 className="card-title">{props.post["result-title"]}</h4>
          <p className="card-description2">{props.post["result-hood"]}</p>
          <p className="card-description">{props.post.price}</p>
          {/* <button
          className="card-button"
          name={props.post._id}
          onClick={() => {
            props.function(props.post);
          }}>
          {props.buttonName}
        </button> */}
        </div>
      </Link>
    </div>
  );
}

export default CardView;
