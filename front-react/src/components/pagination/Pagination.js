import React, { useState } from "react";
import "./pagination.css";

function Pagination(props) {
  const pageNumber = [];
  const [pageInput, setPageInput] = useState(1);

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumber.push(i);
  }

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      console.log("value", e.target.value);
      props.paginate(pageInput);
    }
  };
  const handleChange = (evt) => {
    setPageInput(parseInt(evt.target.value, 10));
  };

  return (
    <div className="pagination-area">
      <label className=" label-pagination">
        You on Page {props.currPage}, there are {pageNumber.length} pages
      </label>
      <input
        className="input-pagination"
        placeholder={"enter a page number"}
        value={pageInput.page}
        onKeyDown={keyPress}
        onChange={handleChange}
      />

      <ul className="pagination">
        {props.currPage === 1 ? (
          ""
        ) : (
          <div>
            <li className="page-item">
              <button
                className=" btn-pag"
                onClick={() => {
                  props.paginate(props.currPage - 1);
                }}>
                Prev
              </button>
            </li>
          </div>
        )}
        <li>
          <button
            className=" btn-pag"
            onClick={() => {
              props.paginate(props.currPage + 1);
            }}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
