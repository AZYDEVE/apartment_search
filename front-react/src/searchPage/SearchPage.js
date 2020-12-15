import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Pagination from "../components/pagination/Pagination";
import Card from "../components/card/Card";
import "./searchPage.css";
import Selector1 from "../components/selector/Selector";
import Selector2 from "../components/selector/Selector";
import Selector3 from "../components/selector/Selector";
import Navbar from "../components/navBar/NavBar";

function SearchPage(props) {
  const history = useHistory();

  const [allPost, setAllPost] = useState([]);
  let [displayPost, setDisplayPost] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(15);
  let [currentPost, setcurrentPost] = useState();
  const [cityList, setCityList] = useState("");
  const [filterByCityComp, setFilebyCityComp] = useState(null);
  const [filerByPriceRange, setFileterByPriceRange] = useState(null);
  const [priceInputValue, setPriceInputValue] = useState({
    min: null,
    max: null,
  });

  console.log(priceInputValue.min);

  const indexOftheLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOftheLastPost - postPerPage;
  currentPost = displayPost.slice(indexOfFirstPost, indexOftheLastPost);

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

    setDisplayPost(data);
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
    displayPost.sort(function (a, b) {
      if (
        Number(
          a["result-price"].replace(/[^0-9\.-]+/g, "") <
            Number(b["result-price"].replace(/[^0-9\.-]+/g, ""))
        )
      )
        return -1;
      if (
        Number(
          a["result-price"].replace(/[^0-9\.-]+/g, "") >
            Number(b["result-price"].replace(/[^0-9\.-]+/g, ""))
        )
      )
        return 1;

      return 0;
    });

    setcurrentPost(displayPost.slice(indexOfFirstPost, indexOftheLastPost));
    console.log(displayPost);
  };

  const sortByHood = () => {
    displayPost.sort(function (a, b) {
      if (a["result-hood"] === null) {
        return 1;
      }
      if (b["result-hood"] === null) {
        return 1;
      }
      if (a["result-hood"] !== null && b["result-hood"]) {
        if (a["result-hood"].toLowerCase() < b["result-hood"].toLowerCase())
          return -1;
        if (a["result-hood"].toLowerCase() > b["result-hood"].toLowerCase())
          return 1;
      }

      return 0;
    });
    setcurrentPost(displayPost.slice(indexOfFirstPost, indexOftheLastPost));
    console.log(displayPost);
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

  const onChangeSelectorForSorting = (selectedValue) => {
    if (selectedValue.label === "Price") {
      sortByPrice();
    }

    if (selectedValue.label === "City") {
      sortByHood();
    }
  };

  const onChangeSelectorForfilter = (selectedValue) => {
    if (selectedValue.label === "City") {
      const CitySelector = (
        <Selector3
          option={cityList}
          label="Select City"
          onChange={selectorFilerByCity}
        />
      );
      setFilebyCityComp(CitySelector);
      setFileterByPriceRange(null);
    }

    if (selectedValue.label === "Price Range") {
      const priceRangeBtn = (
        <div className="price-range">
          <div className="min-holder">
            <input
              className="min-price"
              type="number"
              placeholder="Min"
              value={priceInputValue.min}
              onChange={selectorMin}
            />
          </div>
          <div className="max-holder">
            <input
              className="max-price"
              type="number"
              placeholder="Max"
              value={priceInputValue.max}
              onChange={selectorMax}
            />
          </div>
          <button
            className="btn-price-range"
            onClick={() => {
              handelPriceRangeBtn();
            }}>
            Submit
          </button>
          <button className="btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      );
      setFileterByPriceRange(priceRangeBtn);
      setFilebyCityComp(null);
    }
  };

  const selectorFilerByCity = (selectedValue) => {
    const temp = [];
    console.log(displayPost);
    for (let i = 0; i < allPost.length; i++) {
      if (allPost[i]["result-hood"] === selectedValue.label) {
        temp.push(allPost[i]);
      }
    }

    setDisplayPost(temp);
    setCurrentPage(1);
    console.log(displayPost);
  };

  const selectorMin = (inputValue) => {
    priceInputValue.min = inputValue.target.value;
  };

  const selectorMax = (inputValue) => {
    priceInputValue.max = inputValue.target.value;
  };

  const handelPriceRangeBtn = () => {
    const temp = [];
    for (let i = 0; i < displayPost.length; i++) {
      const minPost = Number(
        displayPost[i]["result-price"].replace(/[^0-9\.-]+/g, "")
      );

      if (
        minPost >= parseInt(priceInputValue.min, 10) &&
        minPost <= parseInt(priceInputValue.max, 10)
      ) {
        temp.push(displayPost[i]);
      }
    }
    console.log(temp);
    setDisplayPost(temp);
  };

  const handleReset = () => {
    setDisplayPost(allPost);
  };

  return (
    <div>
      <Navbar className="nav" />
      <div className="entire_search_page">
        <div className="filter_form">
          <Selector1
            className="selector1"
            option={option1}
            label="Sort By"
            onChange={onChangeSelectorForSorting}
          />
          <div className="selector2">
            <Selector2
              option={option2}
              label="Filter By"
              onChange={onChangeSelectorForfilter}
            />
          </div>
          <div className="selector3">
            {filterByCityComp}
            {filerByPriceRange}
          </div>
        </div>
        <div className=" post-container">
          {allPost.length === 0 ? (
            <h1>Loading</h1>
          ) : (
            <div className="post-area">{displayPosts(displayPost)}</div>
          )}

          <div className="pagination-area ">
            <Pagination
              postsPerPage={postPerPage}
              totalPosts={displayPost.length}
              paginate={paginate}
              currPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
