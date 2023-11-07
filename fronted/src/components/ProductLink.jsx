import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/style.css';
import axios from 'axios';


const ProductLink = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const URL = "http://localhost:5000";

  useEffect(() => {
    fetchSimilarProducts();
  }, []); 

  const fetchSimilarProducts = async () => {
    try {
      console.log("fetching items");
      console.log(item);
      const response = await axios.get(`${URL}/get_similar_products/${item.search_text}`);
      setSimilarProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const linkStyle = {
    color: '#0066c0',
    textDecoration: 'none',
    cursor: 'pointer',
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

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  };

  const imageStyle = {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'contain',
  };

  const renderStarRating = (rating) => {
    const numericRating = parseFloat(rating);

    const starCount = 5;
    const fullStarCount = Math.floor(numericRating);
    const hasHalfStar = numericRating % 1 !== 0;

    const stars = [];

    for (let i = 1; i <= starCount; i++) {
      if (i <= fullStarCount) {
        stars.push(<span key={i}>★</span>);
      } else if (hasHalfStar) {
        stars.push(<span key={i}>½</span>);
      } else {
        stars.push(<span key={i}>☆</span>);
      }
    }

    return stars;
  };

  // const similarProducts = [
  //   {
  //     id: 1,
  //     name: 'Similar Product 1',
  //     price: 19.99,
  //     img: 'https://example.com/similar-product-1.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Similar Product 2',
  //     price: 29.99,
  //     img: 'https://example.com/similar-product-2.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Similar Product 3',
  //     price: 39.99,
  //     img: 'https://example.com/similar-product-3.jpg',
  //   },
  //   {
  //     id: 4,
  //     name: 'Similar Product 4',
  //     price: 49.99,
  //     img: 'https://example.com/similar-product-4.jpg',
  //   },
  //   {
  //     id: 5,
  //     name: 'Similar Product 5',
  //     price: 49.99,
  //     img: 'https://example.com/similar-product-4.jpg',
  //   },
  // ];

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block' }} onClick={onClick}>
        {/* Add your next arrow component */}
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block' }} onClick={onClick}>
        {/* Add your previous arrow component */}
      </div>
    );
  };

  const sliderSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 4, // Display four slides at a time
    slidesToScroll: 1,
    // variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const renderSimilarProducts = () => {
    console.log(`prod ${similarProducts}`);
    return similarProducts.map((product) => (
      <div key={product.id} className="similar-product-item">
        <h3>{product.name}</h3>
        <img src={product.img} alt={product.name} className="product-image" />
        <p className="price">Price: ${product.price}</p>
        {/* Add other product details */}
      </div>
    ));
  };

  return (
    <div>
      <section id="product-info">
        <div className="item-image-parent">
          <div className="item-image-main">
            <img src={item.img} alt="default" />
          </div>
        </div>
        <div className="item-info-parent">
          <div className="main-info">
            <h4>{item.name}</h4>
            <div className="star-rating">
              <span>★★★★</span>★
            </div>
            <p>
              Price: <span id="price">$ {item.price}</span>
            </p>
            <p>
              availability: <span id="price">$ {item.availability}</span>
            </p>

            <a href={item.url} target="_blank" rel="noopener noreferrer" id="price">
              View on Amazon
            </a>
          </div>
          <div className="description">
            <ul>
              <li>Care Instructions: Machine Wash</li>
              <li>Fit Type: Classic Fit</li>
              <li>Color name: Black-White</li>
              <li>Material: Cotton</li>
              <li>Pattern: Solid</li>
            </ul>
          </div>
        </div>
      </section>
      <section id="similar-products">
        <div className="similar-products-slider">
          <Slider {...sliderSettings}>{renderSimilarProducts()}</Slider>
        </div>
      </section>
    </div>
  );
};

export default ProductLink;