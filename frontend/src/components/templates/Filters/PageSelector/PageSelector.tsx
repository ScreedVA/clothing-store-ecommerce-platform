import React from "react";

interface PageSelectorProps {
  currentPage: number;
  totalPages: number;
  updatePage: (page: number) => void;
}

const PageSelector: React.FC<PageSelectorProps> = ({ currentPage, totalPages, updatePage }) => {
  // Helper function to generate an array of page numbers
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Number of page numbers to display at a time
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(currentPage - halfMaxPages, 1);
    let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div style={styles.paginationContainer}>
      <button style={styles.button} disabled={currentPage === 1} onClick={() => updatePage(currentPage - 1)}>
        Previous
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          style={{
            ...styles.pageButton,
            ...(page === currentPage ? styles.activePage : {}),
          }}
          onClick={() => updatePage(page)}
        >
          {page}
        </button>
      ))}

      <button style={styles.button} disabled={currentPage === totalPages} onClick={() => updatePage(currentPage + 1)}>
        Next
      </button>
    </div>
  );
};

// Basic styles for the pagination component
const styles = {
  paginationContainer: {
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px 0",
  },
  button: {
    padding: "5px 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    fontSize: "14px",
  },
  pageButton: {
    padding: "5px 10px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    fontSize: "14px",
  },
  activePage: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "1px solid #007bff",
  },
};

export default PageSelector;
