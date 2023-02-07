import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import FilterProduct from "./FilterProduct";

const Filter = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/products");
      console.log(result.data);
      setProducts(result.data);

      const res = await axios.get("/api/category");
      console.log(res.data);
      setCategory(res.data);
    };

    fetchData();
  }, []);

  const filterResult = (catItem) => {
    const catResult = products.filter((curCat) => {
      return curCat.category === catItem;
    });
    setProducts(catResult);
  };

  //search
  const keys = ["name", "seller"];

  const search = () => {
    return products.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query))
    );
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const result = await axios.get("/api/products");
    console.log(result.data);
    setProducts(result.data);
  };

  return (
    <div className="filter-row">
      <div className="container-product">
      {products.length === 0 ? (
        <h3 className="info">Actualmente no hay productos!</h3>
      ) : (
        <>
          <div className="filter-col">
            <div className="filter-group">
              <button onClick={handleReset}>Todo</button>
              {category.map((cat) => (
                <button key={cat._id} onClick={() => filterResult(cat.name)}>
                  {cat.name}
                </button>
              ))}
            </div>
            <div className="filter-group">
              <input
                type="search"
                placeholder="Buscar..."
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="filter-col">
            <FilterProduct products={search(FilterProduct)} />
          </div>
        </>
      )}
    </div>
    </div>
  );
};

export default Filter;

