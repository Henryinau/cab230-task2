import React, { useState } from "react";

function PaginationTable({ data, columns, rowsPerPage }) {
  const [currentPage, setCurrentPage] = useState(0);

  const pageCount = Math.ceil(data.length / rowsPerPage);
  const pageData = data.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

  const handlePrevClick = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pageData.map((rowData, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(rowData).map((cellData, cellIndex) => (
                <td key={cellIndex}>{cellData != null && cellData !== undefined? cellData : "N/A"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevClick} disabled={currentPage === 0}>
          Previous
        </button>
        <span>
          Page {currentPage + 1} of {pageCount}
        </span>
        <button onClick={handleNextClick} disabled={currentPage === pageCount - 1}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationTable;
