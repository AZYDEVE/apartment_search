import React, { useState, useEffect, useRef } from "react";
import Pagination from "../components/pagination/Pagination";
import Card from "../components/card/Card";
import "./searchPage.css";

function SearchPage(props) {
  const [allPost, setAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);

  const indexOftheLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOftheLastPost - postPerPage;
  const currentPost = allPost.slice(indexOfFirstPost, indexOftheLastPost);

  useEffect(() => {
    fetchPost();
  }, []);

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
  };

  const clickPost = () => {};

  const cardViewStyle = {
    marginBottom: "40px",
    borderRadius: "20px ",
    overflow: "hidden",
  };

  const displayPosts = (posts) => {
    return currentPost.map((post) => (
      <Card
        style={cardViewStyle}
        post={post}
        allPost={allPost}
        function={clickPost}
        currentPage={currentPage}
      />
    ));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const testing = () => {
    fetch("/auth/getUser", { method: "get" });
  };

  return (
    <div className="container mt-3">
      {allPost.length === 0 ? (
        <h1>Loading</h1>
      ) : (
        <div className="post-area">{displayPosts(allPost)}</div>
      )}

      <button onClick={testing} />
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
