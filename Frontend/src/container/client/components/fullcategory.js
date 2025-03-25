import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/fullcategory.css";

const Fllcategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/categories');
                setCategories(response.data); // Access response.data directly
            } catch (error) {
                console.error('Error fetching categories:', error);
                setError('Failed to fetch categories. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleProductClick = (categoryTitle) => {
        navigate(`/${categoryTitle}/`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="App">
            <section className="cate">
                {categories.length > 0 ? (
                    categories.map((category) => (
                        <div
                            className="category"
                            key={category._id} // Use _id instead of id
                            onClick={() => handleProductClick(category.title)}
                            style={{ cursor: "pointer" }} // Add pointer for better UX
                        >
                            <img src={category.image} alt={category.title} />
                            <h4>{category.title}</h4>
                        </div>
                    ))
                ) : (
                    <p>No categories found.</p>
                )}
            </section>
        </div>
    );
};

export default Fllcategory;