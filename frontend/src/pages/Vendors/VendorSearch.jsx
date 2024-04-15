import React, { useState } from 'react';
import {Button, Form, InputGroup, FormControl } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);  
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Buscar por nombre, ciudad o teléfono"
          onChange={handleInputChange} 
          value={searchTerm}
        />
        <Button variant="outline-secondary" type="submit">
          Buscar
        </Button>
      </InputGroup>
    </Form>
  );
}

export default SearchBar;
