import React, { useEffect } from "react";
import { Row } from "react-bootstrap";
import VendorCard from "./VendorCard";
import PaginationComponent from "./PaginationComponent";

function VendorList({ vendors, currentPage, setCurrentPage }) {
  const vendorsPerPage = 9;
  const startIndex = (currentPage - 1) * vendorsPerPage;
  const currentVendors = vendors.slice(startIndex, startIndex + vendorsPerPage);
  const actualTotalPages = Math.ceil(vendors.length / vendorsPerPage);

  useEffect(() => {
    if (currentPage > actualTotalPages) {
      setCurrentPage(actualTotalPages || 1);
    }
  }, [vendors, currentPage, setCurrentPage, actualTotalPages]);

  return (
    <>
      <Row className="mt-3">
        {currentVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </Row>
      <PaginationComponent
        currentPage={currentPage}
        totalPages={actualTotalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
}

export default VendorList;
