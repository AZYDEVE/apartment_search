import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "../components/card/Card";
import "./favorite.css";
import Navbar from "../components/navBar/NavBar";
import "./favorite.css";

function Favorite(props) {
  const history = useHistory();
  const [myfavorite, setMyFavorite] = useState([]);
  let [allpost, setAllpost] = useState([]);

  useEffect(() => {
    getListOflikedPost();
  }, []);

  useEffect(() => {
    checkLogin();
  });

  const checkLogin = async () => {
    const data = await fetch("/auth/autherized", { method: "get" });
    const result = await data.json();

    if (result.status === false) {
      history.push("/");
    }
  };

  const getListOflikedPost = async () => {
    const allTheLike = await fetch("/get_liked_posts", { method: "get" });
    const likeData = await allTheLike.json();
    const allthePost = await fetch("/get_all_posts", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const postData = await allthePost.json();
    setMyFavorite(likeData);

    allpost = postData;
  };

  const cardViewStyle = {
    marginBottom: "40px",
    borderRadius: "10px ",
    overflow: "hidden",
  };

  const displayPosts = () => {
    return myfavorite.map((post) => (
      <Card style={cardViewStyle} post={post} allPost={allpost} />
    ));
  };

  return (
    <div className="entire_search_page_favor ">
      <Navbar />
      <div className="container">
        <div className=" post-area_favor">{displayPosts()}</div>
      </div>
    </div>
  );
}
export default Favorite;
