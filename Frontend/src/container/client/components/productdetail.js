import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "../style/productdetail.css";
import slideimg4 from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/Slidermg/slider(4).png";


const ProductDetail = () => {
    const { id } = useParams();
    const [products, setProducts] = useState([]);
    const [mainImg, setMainImg] = useState('');
    const [contite, setContite] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [customerName, setUserName] = useState("");
    const [tel, setTel] = useState("");
    const [adresse, setAdresse] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/produits");
                setProducts(response.data);
                const product = response.data.find(prod => prod._id.toString() === id);
                if (product && product.url_img && product.url_img.length > 0) {
                    setMainImg(product.url_img[0]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to fetch products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        // Validation: Check if all required fields are filled
        if (!customerName || !tel || !adresse || !contite || !product) {
            alert("Please fill out all fields.");
            return;
        }
    
        // Prepare the order data to be sent to the backend
        const orderData = {
            id_client: customerName, // Customer's name
            produits: [
                {
                    id_produit: product._id, // Product ID
                    qte: contite, // Quantity
                },
            ],
            tel: tel, // Customer's telephone
            statut: "En attente", // Order status
            adresse: adresse, // Customer's address
        };
    
        try {
            // Send the order data to the backend
            const response = await axios.post('http://localhost:5000/api/commandes', orderData);
    
            // Handle success: Order created successfully
            console.log('Order created:', response.data);
            alert('Thank you for your purchase! Your order has been placed.');
    
            // Reset the form fields after submission
            setUserName("");
            setTel("");
            setAdresse("");
            setContite(1); // Reset quantity to 1
        } catch (error) {
            // Handle error: Order creation failed
            console.error("Error creating order:", error);
            alert('Failed to create order. Please try again later.');
        }
    };

    const changeMainImage = (src) => {
        setMainImg(src);
    };

    const formRef = useRef(null);

    const scrollToForm = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleAddcartClick = () => {
        setTimeout(() => {
            navigate("/Cart");
        }, 300);
    };

    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Check if product is already in the cart
        const existingProductIndex = cart.findIndex((item) => item._id === product._id);

        if (existingProductIndex >= 0) {
            // Update the quantity if the product already exists in the cart
            cart[existingProductIndex].quantity += contite;
        } else {
            // Add the product with the current quantity
            cart.push({ ...product, quantity: contite });
        }

        // Save the updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const product = products.find((prod) => prod._id.toString() === id.toString());

    if (loading) {
        return <div style={{ marginTop: "400px" }}>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div style={{ marginTop: "400px" }}>Product not found.</div>;
    }

    return (
        <>
            <div className='container-product'>
                <div className="product-detail">
                    <div className="product-images">
                        <img src={mainImg} alt="Main product" className="main-image" />
                        <div className="thumbnail-images">
                            {product.url_img && product.url_img.length > 0 && product.url_img.map((src, index) => (
                                <img
                                    key={index}
                                    src={src}
                                    alt={`Thumbnail ${index + 1}`}
                                    onClick={() => changeMainImage(src)}
                                    className="thumbnail"
                                />
                            ))}
                        </div>
                    </div>
                    <div className="product-info">
                        <h2>{product.name}</h2>
                        <h1 className="price">{product.price + " DH"}</h1>
                        <h5 className="oldprice">
                            <span style={{ textDecoration: 'line-through', color: "#565656" }}>{product.oldprice}DH</span>
                            <span>{" -" + Math.round(100 - (product.price * 100 / product.oldprice)) + "%"}</span>
                        </h5>
                        <p className="description">{product.description}</p>
                        <div className='buttonContaner'>
                            <button onClick={scrollToForm} className="buy-now">Buy Now</button>
                            <button onClick={() => {
                                addToCart();
                                handleAddcartClick();
                            }} className="buy-now add-to-cart">
                                <img alt='img' src="data:image/png;base64,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" />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="confirmation-form" ref={formRef}>
                    <h2>Confirm Purchase</h2>
                    <form onSubmit={handleFormSubmit}>
                        <label>
                            Full Name:
                            <input type="text" value={customerName} required onChange={(e) => setUserName(e.target.value)} />
                        </label>
                        <label>
                            Telephone:
                            <input type="number" value={tel} required onChange={(e) => setTel(e.target.value)} />
                        </label>
                        <label>
                            Address:
                            <input type="text" value={adresse} required onChange={(e) => setAdresse(e.target.value)} />
                        </label>
                        <label>
                            Quantité:
                            <div className='contite contiteform'>
                                <button type="button" className="button" onClick={() => setContite(contite === 1 ? contite - 1 : 1)}>-</button>
                                <input value={contite} type="text" required />
                                <button type="button" className="button" onClick={() => setContite(contite + 1)}>+</button>
                                <button type="submit" className="confirm-button">Confirm</button>
                            </div>
                        </label>
                    </form>
                </div>
                <div className="catigory ">
                    <img src={slideimg4} alt="Category 3" />
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
