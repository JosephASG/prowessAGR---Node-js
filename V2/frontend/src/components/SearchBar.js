import React from 'react';

function SearchBar({ searchTerm, sortOption, handleSearch, handleSortChange }) {
  return (
    <div className='filter-container'>
      <div className="search-bar-products">
        <input
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">Ordenar por</option>
          <option value="name">Nombre</option>
          <option value="price">Precio</option>
          <option value="category">Categoria</option>
        </select>
      </div>
    </div>
  );
}


export default SearchBar;
