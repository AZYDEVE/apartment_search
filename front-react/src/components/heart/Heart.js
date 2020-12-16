import React, { useState, useEffect } from "react";
import "./heart.css";

function Heart(props) {
  const [like, setLike] = useState(false);

  useEffect(() => {
    checkLikedpost({ postId: props.post._id });
  }, [props.post]);

  const checkLikedpost = async (obj) => {
    const data = await fetch("/check_user_liked_post", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    const likeOrNot = await data.json();

    setLike(likeOrNot.result);
  };

  const handleLikeClick = () => {
    const query = { postId: props.post._id };
    if (like === false) {
      modifyLikedList("/add_like_by_user", query);
      setLike(true);
    } else {
      modifyLikedList("/remove_like_by_user", query);
      setLike(false);
    }
  };

  const modifyLikedList = async (url, obj) => {
    await fetch(url, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
  };

  const handleLikeStyle = () => {
    if (like === true) {
      return "heartActive";
    } else {
      return "";
    }
  };

  return (
    <div className="heartBtn">
      <div className="content">
        <span
          className={"heart " + handleLikeStyle()}
          onClick={handleLikeClick}></span>
      </div>
    </div>
  );
}

export default Heart;
