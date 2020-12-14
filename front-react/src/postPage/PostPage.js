import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Card from "../components/card/Card";

function Post(props) {
  const [largeImg, setLargeImg] = useState();

  let data = useLocation();
  let postData = data.state.post;

  useEffect(() => {
    getLargeImage(postData.images[0]);
  }, []);

  useEffect(() => {}, []);

  const getSimilarPost = () => {
    const posts = data.state.allPost;
    const currentPostHood = postData["result-hood"];
    const currentPostPrice = Number(
      postData["result-price"].replace(/[^0-9\.-]+/g, "")
    );
    const matchingApartment = [];

    for (let i = 0; i < posts.length; i++) {
      const postPrice = Number(
        posts[i]["result-price"].replace(/[^0-9\.-]+/g, "")
      );
      const difference = Math.abs(currentPostPrice - postPrice);
      if (
        posts[i]["result-hood"] === currentPostHood &&
        difference < 501 &&
        posts[i]._id !== postData._id
      ) {
        matchingApartment.push(posts[i]);
      }
    }

    return matchingApartment.map((MatchPost) => {
      return <Card post={MatchPost} allPost={data.state.allPost} />;
    });
  };

  const getLargeImage = (imageUrl) => {
    if (imageUrl) {
      let newUrl = imageUrl.substring(0, imageUrl.length - 10) + "600x450.jpg";
      setLargeImg(newUrl);
      return newUrl;
    } else return "";
  };
  console.log(postData);

  const smallImage = () => {
    return postData.images.map((imgUrl) => (
      <img
        className="smallImage"
        src={imgUrl}
        alt="small iamge"
        onClick={() => {
          getLargeImage(imgUrl);
        }}
      />
    ));
  };

  return (
    <div className="container postInfo">
      <img src={largeImg} alt="large" />
      <div>{smallImage()}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: postData.postingbody,
        }}
      />
      <div>{getSimilarPost()}</div>
    </div>
  );
}

export default Post;
