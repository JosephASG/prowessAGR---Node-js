import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ModalEditVendor from "components/ModalEditVendors";
import ModalAddVendor from "components/ModalAddVendor";
import VendorList from "./VendorList";
import { fetchVendors } from "services/vendor";
import SearchBar from "./VendorSearch";

function VendorsPage() {
  const [vendors, setVendors] = useState([]);
  const [filteredVendors, setFilteredVendors] = useState(vendors);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [vendorToEdit, setVendorToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSearch = (term) => {
    const lowercasedTerm = term.toLowerCase();
    const filtered = vendors.filter(
      (vendor) =>
        (vendor.name && vendor.name.toLowerCase().includes(lowercasedTerm)) ||
        (vendor.city && vendor.city.toLowerCase().includes(lowercasedTerm)) ||
        (vendor.phoneNumber && vendor.phoneNumber.includes(lowercasedTerm))
    );
    setFilteredVendors(filtered);
  };
  useEffect(() => {
    fetchVendors()
      .then((data) => {
        setVendors(data);
        setFilteredVendors(data);
      })
      .catch((error) => console.error("Error al cargar los vendedores", error));
  }, []);
  useEffect(() => {
    fetchVendors()
      .then(setVendors)
      .catch((error) => console.error("Error al cargar los vendedores", error));
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="text-white">LISTA DE VENDEDORES</h1>
          <Button
            variant="primary"
            style={{ marginBottom: "15px" }}
            onClick={() => setShowAddModal(true)}
          >
            Agregar Vendedor
          </Button>
          <Col>
            <SearchBar onSearch={handleSearch} />
          </Col>
        </Col>
      </Row>
      <VendorList
        vendors={filteredVendors}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <ModalEditVendor
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        vendorToEdit={vendorToEdit}
      />
      <ModalAddVendor
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </Container>
  );
}

export default VendorsPage;
