import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/navBar/NavBar";
import Card from "../components/card/Card";
import "./postPage.css";
/* Your code is beautifully organized and is very easy to read and understand
* This might be a minor suggestion but it helped me -  avoid using any static values like '0' and '501'
* Either assign 501 to a variable which explains what the number is or comment on top of it (Previous is preffered)
* This helps another developer work on your code without interacting with you and it is also a good practices to have any numbers hidden
*/
function Post(props) {
  const [largeImg, setLargeImg] = useState();

  let data = useLocation();
  let postData = data.state.post;

  useEffect(() => {
    getLargeImage(postData.images[0]);
  }, []);

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
    <div>
      <Navbar />
      <div className="entire-Page-postPage ">
        <div className="container justify-center postInfo">
          <img src={largeImg} alt="large" className="justify-self-center" />

          <div>{smallImage()}</div>
          <div
            className="dangeroutPost"
            dangerouslySetInnerHTML={{
              __html: postData.postingbody,
            }}
          />
        </div>
        <div className="similar_post">
          <div>{getSimilarPost()}</div>
        </div>
      </div>
    </div>
  );
}

export default Post;
