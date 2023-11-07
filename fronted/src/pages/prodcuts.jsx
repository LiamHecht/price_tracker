import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from "../components/header";
import TableComponent from '../components/table';

export default function Products() {
  const [newSearchText, setNewSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [productResults, setProductResults] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [trackedProducts, setTrackedProducts] = useState([]);

  const URL = "http://localhost:5000";

  useEffect(() => {
    fetchProducts();
    fetchTrackedProducts();
  }, []); 

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URL}/get_products`);
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };



  const fetchTrackedProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/tracked-products"
      );

      setTrackedProducts(response.data);
    } catch (error) {
      console.error("Error fetching tracked products:", error);
    }
  };

  const handleNewSearchTextChange = (event) => {
    setNewSearchText(event.target.value);
  };

  const handleNewSearchTextSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${URL}/add_product`, {
        search_text: newSearchText,
      });

      alert("Product successfully added");
      setNewSearchText(""); // Clear the input field
      fetchProducts(); // Fetch updated list of products
      try {

        await axios.get(`${URL}/start_scraper/${newSearchText}`);
      } catch (error){
        alert(error);
      }
    } catch (error) {
      alert("Error adding product:", error);
    }
  };

  const handleProductClick = async (product) => {
    try {
      const response = await axios.get(`${URL}/products/${product.name}`);
      const productResults = response.data;
      setProductResults(productResults);
      setShowTable(true);
    } catch (error) {
      console.error("Error retrieving product results:", error);
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };
  
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleCheckboxChange = async (product) => {
    try {
      const response = await axios.post(`${URL}/update_product_tracked/${product.name}`);
      const productResults = response.data;
      console.log(productResults);
      // Handle the response if needed
    } catch (error) {
      console.log(error);
      // Handle the error if needed
    }
  };
  const handleToggleTrackedProduct = async (productName) => {
    try {
      const response = await axios.post(`${URL}/update_product_trackt/${productName}`);
      const productResults = response.data;
      console.log(productResults);
      setTrackedProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.name === productName
            ? { ...product, tracked: !product.tracked }
            : product
        )
      );
    } catch (error) {
      console.error("Error toggling tracked product:", error);
    }
  };
  


  
  return (
    <>
      <Header />
      <div style={{  }}>
        <div style={{ flex: '1' }}>
          <form onSubmit={handleNewSearchTextSubmit}>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <label style={{ fontSize: '30px', marginRight: '10px' }}>
                Search products:
                <input
                  type="text"
                  value={newSearchText}
                  onChange={handleNewSearchTextChange}
                  style={{
                    padding: '0.5rem',
                    marginRight: '1rem',
                    borderRadius: '4px',
                    border: '1px solid #ccc',
                    fontSize: '20px',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#686966',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                  }}
                >
                  Add Product
                </button>
              </label>
            </div>
          </form>

          <div style={{ marginTop: '30px' }}>
            <h2>Product Buttons:</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {products.map((product, index) => (
                <button
                  key={index}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#686966',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '16px',
                    cursor: 'pointer',
                    margin: '0.5rem',
                  }}
                  onClick={() => handleProductClick(product)}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: '15px' }}>
            <h2>Tracked Products:</h2>
            <div>
              {trackedProducts.map((product, index) => (
                <div key={product.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <p style={{ marginRight: '10px' }}>Name: {product.name}</p>
                  <input
                    type="checkbox"
                    onChange={() => handleToggleTrackedProduct(product.name)}
                    checked={product.tracked}
                    style={{ marginLeft: '10px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: '1', marginLeft: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {showTable && <TableComponent data={productResults} />}
        </div>
      </div>
    </>
  );
}