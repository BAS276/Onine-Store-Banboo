import "../style/home.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../layout/footer";
import slideimg1 from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/Slidermg/slider(1).png"
import slideimg2 from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/Slidermg/slider(2).png"
import slideimg3 from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/Slidermg/slider(3).png"
import slideimg4 from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/Slidermg/slider(4).png"
import slideimg5 from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/Slidermg/slider(5).png"


const Home = () => {
    const [visibleProducts, setVisibleProducts] = useState(10);
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
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const navigate = useNavigate();
    const handleProductClick = (productId, category) => {
        navigate(`/${category}/${productId}`);
    };

    const handleLoadMore = () => {
        setVisibleProducts((prev) => prev + 5);
    };

    const categories = ["Laptops", "Phones", "Smartwatche", "Earbuds", "Consoles", "Accessories"];

    const renderProducts = (category, limit) => {
        return products
            .filter((product) => product.category === category)
            .slice(0, limit)
            .map((product) => (
                <div
                    className="product"
                    key={product._id} // Use _id instead of id
                    onClick={() => handleProductClick(product._id, product.category)}
                >
                    <img src={product.url_img[0]} alt={product.name} /> {/* Use url_img and name */}
                    <h3>{product.name}</h3> {/* Use name instead of title */}
                    <h4>{product.price} DH</h4>
                    <p>&#9787; En stock</p>
                </div>
            ));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="container">
                <div className="slider">
                    <img src={slideimg1} alt="Slider 1" />
                </div>

                <h3 className="h3">Best Seller:</h3>
                <section className="featured-products">
                    {products.slice(0, visibleProducts).map((product) => (
                        <div
                            className="product"
                            key={product._id}
                            onClick={() => handleProductClick(product._id, product.category)}
                        >
                            <img src={product.url_img[0]} alt={product.name} />
                            <div>
                                <h3>{product.name}</h3>
                                <h4>{product.price} DH</h4>
                                <p>&#9787; En stock</p>
                            </div>
                        </div>
                    ))}
                </section>

                {visibleProducts < products.length && (
                    <button className="Show-more" onClick={handleLoadMore}>
                        Show more
                    </button>
                )}

<div className="catigory">
                    <img src={slideimg5} alt="img" />
                </div>

                {categories.map((category) => (
                    category === "Laptops" && (
                        <div key={category} className="featured-products">
                            {renderProducts(category, 10)}
                        </div>
                    )
                ))}

                <button className="Btn">
                    <div className="sign">
                        <svg className="socialSvg whatsappSvg" viewBox="0 0 16 16">
                            <path
                                d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"
                            ></path>
                        </svg>
                    </div>
                    <div className="text">Whatsapp</div>
                </button>

                <div className="catigory">
                    <img src={slideimg2} alt="img" />
                </div>

                {categories.map((category) =>
                    category !== "Laptops" && category !== "Consoles" ? (
                        <div key={category} className="featured-products">
                            {renderProducts(category, 5)}
                        </div>
                    ) : null
                )}

                <div className="catigory ">
                    <img src={slideimg3} alt="Category 3" />
                </div>

                {categories.map((category) =>
                    category === "Consoles" ? (
                        <div key={category} className="featured-products">
                            {renderProducts(category, 10)}
                        </div>
                    ) : null
                )}

                <div className="catigory ">
                    <img src={slideimg4} alt="Category 4" />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Home;