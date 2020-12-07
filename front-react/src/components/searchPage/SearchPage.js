import React, { useState, useEffect } from "react";
import Pagination from "../pagination/Pagination";
import Card from "../card/Card";
import "./searchPage.css";

function SearchPage(props) {
  const [userinfo, setUserInfo] = useState({});
  const [allPost, setAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(20);

  const indexOftheLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOftheLastPost - postPerPage;
  const currentPost = allPost.slice(indexOfFirstPost, indexOftheLastPost);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/get_all_posts", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setAllPost(data);

      setUserInfo(sessionStorage.getItem("current-user"));
    };

    fetchPost();
  }, []);

  const getData = async (path, query) => {
    const res = await fetch(path, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    });
    const data = await res.json();
    return data;
  };

  const clickPost = () => {};

  const cardViewStyle = {
    marginBottom: "40px",
    borderRadius: "20px ",
    overflow: "hidden",
  };

  const displayPosts = (posts) => {
    console.log(posts);
    return currentPost.map((post) => (
      <Card
        style={cardViewStyle}
        picture={post.images}
        hood={post["result-hood"]}
        price={post.price}
        title={post["result-title"]}
        post={post}
        function={clickPost}
      />
    ));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-3">
      {allPost.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className="post-area">{displayPosts(allPost)}</div>
      )}

      <div className="pagination-area">
        <Pagination
          postsPerPage={postPerPage}
          totalPosts={allPost.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

export default SearchPage;
