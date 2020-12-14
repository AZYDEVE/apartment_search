import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "../components/pagination/Pagination";
import Card from "../components/card/Card";
import "./searchPage.css";
import Selector1 from "../components/selector/Selector";
import Selector2 from "../components/selector/Selector";
import Selector3 from "../components/selector/Selector";

function SearchPage(props) {
  const history = useHistory();

  const [allPost, setAllPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  let [currentPost, setcurrentPost] = useState();
  const [cityList, setCityList] = useState("");
  const [filterByCityComp, setFilebyCityComp] = useState(null);
  const [filerByPriceRange, setFileterByPriceRange] = useState(null);

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
    const temp = new Set();

    for (let i = 0; i < data.length; i++) {
      temp.add(
        JSON.stringify({
          label: data[i]["result-hood"],
        })
      );
    }

    const citis = [...temp].map((item) => {
      if (typeof item === "string") return JSON.parse(item);
      else if (typeof item === "object") return item;
    });

    setCityList(citis);
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
    allPost.sort(function (a, b) {
      if (a.price < b.price) return -1;
      if (a.price > b.price) return 1;
      return 0;
    });

    setcurrentPost(allPost.slice(indexOfFirstPost, indexOftheLastPost));
    console.log(allPost);
  };

  const sortByHood = () => {
    allPost.sort(function (a, b) {
      if (a["result-hood"] === null) {
        return -1;
      }
      if (b["result-hood"] === null) {
        return -1;
      }
      if (a["result-hood"] !== null && b["result-hood"]) {
        if (a["result-hood"].toLowerCase() < b["result-hood"].toLowerCase())
          return -1;
        if (a["result-hood"].toLowerCase() > b["result-hood"].toLowerCase())
          return 1;
      }

      return 0;
    });
    setcurrentPost(allPost.slice(indexOfFirstPost, indexOftheLastPost));
    console.log(allPost);
  };

  const filtByCity = () => {
    return;
  };

  const option1 = [
    {
      label: "Price",
    },
    {
      label: "City",
    },
  ];

  const option2 = [
    {
      label: "City",
    },
    { label: "Price Range" },
  ];

  const onChangeSelector1 = (selectedValue) => {
    if (selectedValue.label === "Price") {
      sortByPrice();
    }

    if (selectedValue.label === "City") {
      sortByHood();
    }
  };

  const onChangeSelector2 = (selectedValue) => {
    if (selectedValue.label === "City") {
      const CitySelector = (
        <Selector3
          option={cityList}
          label="Select City"
          onChange={onChangeSelector1}
        />
      );
      setFilebyCityComp(CitySelector);
      setFileterByPriceRange(null);
    }

    if (selectedValue.label === "Price Range") {
      const priceRangeBtn = (
        <div>
          <input classNmae="low-price" /> <input classNmae="high-price" />
        </div>
      );
      setFileterByPriceRange(priceRangeBtn);
      setFilebyCityComp(null);
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
        <Selector2
          option={option2}
          label="Filter By"
          onChange={onChangeSelector2}
        />
        {filterByCityComp}
        {filerByPriceRange}
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
