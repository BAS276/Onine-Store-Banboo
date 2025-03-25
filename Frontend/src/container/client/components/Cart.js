import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../style/Cart.css";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    // Form state
    const [formData, setFormData] = useState({
        fullName: '',
        telephone: '',
        address: ''
    });

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const removeItem = (productId) => {
        const updatedCart = cart.filter(item => item._id !== productId);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    const handleBuyNowClick = () => {
        setIsFormVisible(true);
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleConfirmPurchase = async (e) => {
        e.preventDefault();

        const orderData = {
            id_client: formData.fullName,
            produits: cart.map(item => ({
                id_produit: item._id,
                qte: item.quantity
            })),
            tel: formData.telephone,
            adresse: formData.address
        };

        try {
            const response = await axios.post('http://localhost:5000/api/commandes', orderData);

            clearCart();
            setIsFormVisible(false);
            setFormData({ fullName: '', telephone: '', address: '' });
            alert('Order placed successfully!');
            
            return response.data;
        } catch (error) {
            console.error('Error submitting order:', error);
            if (error.response) {
                alert(`Error placing order: ${error.response.data.message || 'Unknown error'}`);
            } else if (error.request) {
                alert('No response from server. Please try again.');
            } else {
                alert('An error occurred while placing your order. Please try again.');
            }
            throw error;
        }
    };

    const totalPrice = cart.reduce((total, item) => 
        total + (item.price * item.quantity), 0);

    return (
        <div className='cart'>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div key={item._id} className="cart-item">
                            <img src={item.url_img[0]}/>
                            <h3>{item.name}</h3>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: {item.price * item.quantity} DH</p>
                            <button onClick={() => removeItem(item._id)} className="remove-item">
                                Remove
                            </button>
                        </div>
                    ))}
                    <div className="cart-actions">
                        <button onClick={clearCart} className="clear-cart">
                            Clear Cart
                        </button>
                    </div>
                </div>
            )}
            {isFormVisible && cart.length > 0 && (
                <div className="confirmation-form">
                    <h2>Confirm Purchase</h2>
                    <form onSubmit={handleConfirmPurchase}>
                        <label>
                            Full Name:
                            <input 
                                type="text" 
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required 
                            />
                        </label>
                        <label>
                            Telephone:
                            <input 
                                type="tel" 
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                required 
                            />
                        </label>
                        <label>
                            Address:
                            <input 
                                type="text" 
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                required 
                            />
                        </label>
                        <button type="submit" className="confirm-button">Confirm</button>
                        <button
                            type="button"
                            onClick={() => setIsFormVisible(false)}
                            className="cancel-button"
                        >
                            Cancel
                        </button>
                    </form>
                </div>
            )}
            <div className="Totalprice">
                <span>Total: {totalPrice} DH</span>
                <button onClick={handleBuyNowClick}>Buy Now</button>
            </div>
        </div>
    );
};

export default Cart;