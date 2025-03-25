import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../style/search.css";

const Search = () => {
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/produits");
                setData(response.data);
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

    const handleProductClick = (productId, category) => {
        navigate(`/${category}/${productId}`);
    };

    const search = (text) => {
        if (!text.trim()) {
            setProducts(data); // Reset to all products if search is empty
            return;
        }

        const filteredProducts = data.filter(product =>
            product.name?.toLowerCase().includes(text.toLowerCase())
        );

        setProducts(filteredProducts);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="row">
            <div className="group">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="icn">
                    <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                    </g>
                </svg>
                <input
                    className="input"
                    type="search"
                    placeholder="Search products..."
                    onChange={(e) => search(e.target.value)}
                />
            </div>
            <section className="featured-products">
                {products.length > 0 ? (
                    products.map((product) => (
                        <div
                            className="product"
                            key={product._id}
                            onClick={() => handleProductClick(product._id, product.category)}
                            style={{ cursor: "pointer" }}
                        >
                            <img src={product.url_img?.[0]} alt={product.name || "Product"} />
                            <h3>{product.name}</h3>
                            <h4>{product.price} DH</h4>
                            <p>&#9787; En stock</p>
                        </div>
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </section>
        </div>
    );
};

export default Search;
