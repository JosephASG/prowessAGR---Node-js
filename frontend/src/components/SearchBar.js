import React from 'react';

function SearchBar({ searchTerm, sortOption, handleSearch, handleSortChange, showPriceOption, showCategoryOption }) {
  return (
    <div className='d-flex justify-content-between align-items-center' style={{ marginBottom: '20px' }}>
      <div className="flex-grow-1 me-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={handleSearch}
          style={{ boxShadow: 'none', border: '1px solid #ced4da' }}
        />
      </div>

      <div>
        <select
          className="form-select"
          value={sortOption}
          onChange={handleSortChange}
          style={{ width: 'auto', boxShadow: 'none', border: '1px solid #ced4da' }}
        >
          <option value="name">Nombre</option>
          {showPriceOption && <option value="price">Precio</option>}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;
