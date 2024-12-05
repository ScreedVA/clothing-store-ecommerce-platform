import { BackendClothingFilterModel } from "../../../../models/FilterModels";

interface PageSelector {
  filter: BackendClothingFilterModel;
  updateFilter: () => void;
  totalPages: number;
}
const PageSelector: React.FC<PageSelector> = ({ filter, updateFilter, totalPages }) => {
  const maxPagesToShow: number = 5;
  const currentPage: number = filter.page;
  const halfMaxPages: number = Math.floor(maxPagesToShow / 2);

  function generatePageNumbers() {
    const pages: number[] = [];
    let startPage: number = Math.max(currentPage - halfMaxPages, 1);
    let endPage: number = Math.min(startPage + maxPagesToShow - 1, totalPages);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pages;
  }
  const pageNumbers: number[] = generatePageNumbers();

  //   function handleFilterChange() {
  //     updateFilter((prevFields: any) => {

  // //         return {
  // //             ...prevFields,

  // //         }
  // //     })
  // //   }

  return (
    <>
      <div style={styles.paginationContainer}>
        <button style={styles.button} disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            style={{
              ...styles.pageButton,
              ...(page === currentPage ? styles.activePage : {}),
            }}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          style={styles.button}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

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
