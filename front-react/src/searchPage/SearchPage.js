import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "../components/pagination/Pagination";
import Card from "../components/card/Card";
import "./searchPage.css";
import Selector1 from "../components/selector/Selector";

function SearchPage(props) {
  const history = useHistory();

  const [allPost, setAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  let [currentPost, setcurrentPost] = useState([]);

  const indexOftheLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOftheLastPost - postPerPage;
  currentPost = allPost.slice(indexOfFirstPost, indexOftheLastPost);

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    checkLogin();
  });

  const checkLogin = async () => {
    console.log("checkingLogin");
    const data = await fetch("/auth/autherized", { method: "get" });
    const result = await data.json();
    console.log(result);
    if (result.status === false) {
      history.push("/");
    }
  };

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

    console.log(allPost);
  };

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
        currentPage={currentPage}
      />
    ));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortByPrice = () => {
    const data = allPost.sort(function (a, b) {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });

    setcurrentPost(allPost.slice(indexOfFirstPost, indexOftheLastPost));
    console.log(allPost);
  };

  const sortByHood = () => {
    const data = allPost.sort(function (a, b) {
      if (a["result-hood"] < b["result-hood"]) return -1;
      if (a["result-hood"] > b["result-hood"]) return 1;
      return 0;
    });
    setcurrentPost(allPost.slice(indexOfFirstPost, indexOftheLastPost));
    console.log(allPost);
  };

  const option1 = [
    {
      label: "Price",
      value: "Price",
    },
    {
      label: "city",
      value: "city",
    },
  ];

  const onChangeSelector1 = (selectedValue) => {
    if (selectedValue.label === "Price") {
      sortByPrice();
    }

    if (selectedValue.label === "city") {
      // console.log(allPost[0]["result-hood"].toUpperCase());
      sortByHood();
    }
  };

  return (
    <div className="entire_search_page">
      <div className="filter_form">
        <Selector1
          option={option1}
          label="Sort By"
          onChange={onChangeSelector1}
        />
      </div>
      <div className="container mt-3">
        {allPost.length === 0 ? (
          <h1>Loading</h1>
        ) : (
          <div className="post-area">{displayPosts(allPost)}</div>
        )}

        {/* <button onClick={testing} /> */}
        <div className="pagination-area ">
          <Pagination
            postsPerPage={postPerPage}
            totalPosts={allPost.length}
            paginate={paginate}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
