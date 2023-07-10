import React from 'react';
import './StorePage.css'; // Importa el archivo de estilos CSS

function StorePage() {
  const categories = ['Frutas', 'Verduras', 'Cereales', 'Hortalizas'];
  
  return (
    <div className="store-page">
      <div className="sidebar">
        <h2>Categorías</h2>
        <ul>
          {categories.map(category => (
            <li key={category}>{category}</li>
          ))}
        </ul>
      </div>
      
      {/* Contenido adicional de la página de la tienda */}
    </div>
  );
}

export default StorePage;
