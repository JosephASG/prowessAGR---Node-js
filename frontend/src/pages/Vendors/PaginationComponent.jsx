import React from 'react';
import { Pagination } from 'react-bootstrap';

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
  const handlePageClick = (page) => {
    onPageChange(page);
  };

  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageClick(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <Pagination>{items}</Pagination>
  );
}

export default PaginationComponent;
