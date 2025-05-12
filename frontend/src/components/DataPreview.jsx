import React, { useState } from "react";

const DataPreview = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  if (!data || data.length === 0) return <p>No data to preview</p>;

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  // Calculate which rows to show
  const startIdx = rowsPerPage === "ALL" ? 0 : (currentPage - 1) * rowsPerPage;
  const endIdx = rowsPerPage === "ALL" ? totalRows : startIdx + rowsPerPage;
  const currentRows = data.slice(startIdx, endIdx);

  const headers = Object.keys(data[0]);

  // Handlers
  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1));
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1));
  const handleShowAll = () => {
    setRowsPerPage("ALL");
    setCurrentPage(1);
  };
  const handleShowPaged = () => {
    setRowsPerPage(10);
    setCurrentPage(1);
  };

  return (
    <div className="data-preview-container">
      <h3>Data Preview</h3>
      <table className="data-preview-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header}>{header.replace(/_/g, " ")}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, idx) => (
            <tr key={idx}>
              {headers.map((header) => (
                <td key={header}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 4px",
        marginTop: "8px"
      }}>
        <span style={{ color: "#6c757d", fontSize: "14px" }}>
          {rowsPerPage === "ALL"
            ? `Showing all ${totalRows} rows`
            : `Showing ${startIdx + 1} to ${Math.min(endIdx, totalRows)} of ${totalRows} rows`}
        </span>
        <div>
          {rowsPerPage !== "ALL" ? (
            <>
              <button
                className="table-btn"
                onClick={handlePrev}
                disabled={currentPage === 1}
                style={{ marginRight: 8 }}
              >
                Previous
              </button>
              <button
                className="table-btn"
                onClick={handleNext}
                disabled={currentPage === totalPages}
                style={{ marginRight: 8 }}
              >
                Next
              </button>
              <button
                className="table-btn"
                onClick={handleShowAll}
              >
                Show All
              </button>
            </>
          ) : (
            <button
              className="table-btn"
              onClick={handleShowPaged}
            >
              Show Pages
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataPreview;
