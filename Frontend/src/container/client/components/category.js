import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // For prop type validation

const Category = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/produits");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const navigate = useNavigate();

    const handleProductClick = (productId, category) => {
        navigate(`/${category}/${productId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="App">
            <section className="featured-products" style={{ marginTop: "50px" }}>
                {products
                    .filter((product) => product.category === category)
                    .map((product) => (
                        <div
                            className="product"
                            key={product._id} // Use _id instead of id
                            onClick={() => handleProductClick(product._id, product.category)}
                            style={{ cursor: "pointer" }} // Add pointer for better UX
                        >
                            <img src={product.url_img[0]} alt={product.name} /> {/* Use url_img and name */}
                            <h3>{product.name}</h3> {/* Use name instead of title */}
                            <h4>{product.price} DH</h4>
                            <p>&#9787; En stock</p>
                        </div>
                    ))}
            </section>
        </div>
    );
};

// Prop type validation
Category.propTypes = {
    category: PropTypes.string.isRequired, // Ensure category is a required string
};

export default Category;