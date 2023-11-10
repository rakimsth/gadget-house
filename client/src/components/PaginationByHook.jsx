import { Pagination } from "react-bootstrap";
import { usePagination, DOTS } from "../hooks/usePagination";

export default function Paginate({
  total,
  limit,
  setCurrentPage,
  setLimit,
  currentPage,
}) {
  let active = currentPage;
  let items = [];
  const totalNumberofPages = Math.ceil(total / limit);
  for (let number = 1; number <= totalNumberofPages; number++) {
    items.push(
      <Pagination.Item
        key={number}
        active={number === active}
        onClick={() => setCurrentPage(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // Pagination ellipses inclusion and check if pagination is not having any issue
  const paginationRange = usePagination({
    currentPage,
    totalCount: total,
    siblingCount: 1,
    pageSize: limit,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  return (
    <div className="flex d-flex justify-content-center">
      <div className="row">
        <div className="col-auto">
          <Pagination>
            <Pagination.First
              disabled={currentPage === 1}
              onClick={() => {
                setCurrentPage(1);
              }}
            />
            <Pagination.Prev
              disabled={currentPage === 1}
              onClick={() => {
                currentPage === 1 ? null : setCurrentPage(currentPage - 1);
              }}
            />
            {paginationRange.map((number, index) => {
              if (number === DOTS) {
                return <Pagination.Ellipsis key={`${index}-${number}`} />;
              }

              return (
                <Pagination.Item
                  key={number}
                  onClick={() => setCurrentPage(number)}
                  active={currentPage === number}
                >
                  {number}
                </Pagination.Item>
              );
            })}
            <Pagination.Next
              disabled={currentPage === totalNumberofPages}
              onClick={() => {
                currentPage === totalNumberofPages
                  ? null
                  : setCurrentPage(currentPage + 1);
              }}
            />

            <Pagination.Last
              disabled={currentPage === totalNumberofPages}
              onClick={() => {
                setCurrentPage(totalNumberofPages);
              }}
            />
          </Pagination>
        </div>

        <div className="col-auto">
          <select
            value={limit}
            className="form-select"
            size={"lg"}
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={8}>8</option>
            <option value={12}>12</option>
          </select>
        </div>
      </div>
    </div>
  );
}
