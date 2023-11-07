import React, { useState } from 'react';
import Modal from 'react-modal';
import ProductLink from './ProductLink';

const TableComponent = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const openModal = (row) => {
    setSelectedRow(row);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRow(null);
    setIsOpen(false);
  };

  const tableHeaderStyle = {
    background: '#f2f2f2',
    padding: '8px',
    textAlign: 'left',
    fontWeight: 'bold',
    width: '80%' 
  };

  const tableRowStyle = {
    borderBottom: '1px solid #ddd',
    cursor: 'pointer', // Add cursor style to indicate clickable rows
  };

  const tableDataStyle = {
    padding: '8px',
    wordBreak: 'break-all',
  };

  const modalStyle = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    },
    content: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '600px',
      maxHeight: '80%',
      padding: '20px',
      border: 'none',
      borderRadius: '4px',
      background: '#fff',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      overflow: 'auto',
    },
  };

  return (
    <div style={{ marginTop: '15px' }}>
      <h2>Product Results:</h2>
      <table style={{ borderCollapse: 'collapse', width: '80%' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>Name</th>
            <th style={tableHeaderStyle}>Created At</th>
            <th style={tableHeaderStyle}>Price</th>
            <th style={tableHeaderStyle}>Price Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((result, index) => (
            <tr
              key={index}
              style={tableRowStyle}
              onClick={() => openModal(result)} // Open modal on row click
            >
              <td style={tableDataStyle}>{result.name}</td>
              <td style={tableDataStyle}>{result.created_at}</td>
              <td style={tableDataStyle}>{result.price}</td>
              {/* <td style={tableDataStyle}>{result.source}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isOpen} onRequestClose={closeModal} >
        {selectedRow && (
          <ProductLink item={selectedRow} closeModal={closeModal} />
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default TableComponent;
