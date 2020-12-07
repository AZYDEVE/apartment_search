import React from "react";

function Pagination(props) {
  const pageNumber = [];
  console.log(props.totalPosts);

  for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumber.map((number) => (
          <li key={number} className="page-item">
            <button
              className="page-link"
              onClick={() => {
                props.paginate(number);
              }}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
