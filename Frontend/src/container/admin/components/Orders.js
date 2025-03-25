import "../style/AdminContainer.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import icon from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/adminimg/icon";
import { PieChart } from '@mui/x-charts/PieChart';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [data, setData] = useState([]);
    const [isFormUpdateVisible, setIsFormUpdateVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5000/api/commandes")
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching orders data:", error));
    }, []);

    useEffect(() => {
        axios.get("http://localhost:5000/api/produits")
            .then(response => setData(response.data))
            .catch(error => console.error("Error fetching product data:", error));
    }, []);

    const handleDeleteOrder = async (OrderId) => {
        if (!OrderId) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/commandes/${OrderId}`);
            setOrders(prev => prev.filter(Data => Data._id !== OrderId));
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    const handleConfirmedOrder = async (OrderId) => {
        if (!OrderId) return;
        const confirmDelete = window.confirm("Are you sure you want to Confirmed this Order?");
        if (!confirmDelete) return;
        try {
            await axios.put(`http://localhost:5000/api/commandes/${OrderId}`, {"statut" : "Confirmed"});
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    const handleCanceledOrder = async (OrderId) => {
        if (!OrderId) return;
        const confirmDelete = window.confirm("Are you sure you want to Canceled this Order?");
        if (!confirmDelete) return; 
        try {
            await axios.put(`http://localhost:5000/api/commandes/${OrderId}`, {"statut" : "Canceled"});
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    const confirmedOrders = orders.filter(order => order.statut === "Confirmed").length;
    const canceledOrders = orders.filter(order => order.statut === "Canceled").length;

    const getProductDetailsById = (productId) => {
        const product = data.find(prod => prod._id === productId);
        return product
            ? {
                name: product.name,
                image: product.url_img[0],
                price: product.price
            }
            : {
                name: "Unknown Product",
                image: "",
                price: 0
            };
    };

    return (
        <div className="admin-container">
            <div className="admin-content Dashboard">
                <div className="contaner">
                    <h2>Orders:</h2>
                    <div className="Rectangles-of-dashboard">
                        <div className="Rectangles Rectangles-1">
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: 75, label: 'Confirmed', color: "#34c38f" },
                                            { id: 1, value: 35, label: 'Canceled', color: "#c70c47" },
                                        ],
                                    },
                                ]}
                                width={300}
                                height={150}
                            />
                        </div>
                        <div className="Rectangles Rectangles-2">
                            <div className="Text">
                                <h3>Total Orders</h3>
                                <h1>{orders.length}</h1>
                            </div>
                            <div className="icon">
                                <img alt="img" src={icon[4]} />
                            </div>
                        </div>
                        <div className="Rectangles Rectangles-3">
                            <div className="Text">
                                <h3>Confirmed</h3>
                                <h1>{confirmedOrders}</h1>
                            </div>
                            <div className="icon">
                                <img alt="img" src={icon[4]} />
                            </div>
                        </div>
                        <div className="Rectangles Rectangles-4">
                            <div className="Text">
                                <h3>Canceled</h3>
                                <h1>{canceledOrders}</h1>
                            </div>
                            <div className="icon">
                                <img alt="img" src={icon[4]} />
                            </div>
                        </div>
                    </div>
                    <div className="table-container">
                        {isFormUpdateVisible && selectedOrder && (
                            <form className="AddProductForm">
                                <h3>Products in Order:</h3>
                                {selectedOrder.produits.map((product, index) => {
                                    const { name, image, price } = getProductDetailsById(product.id_produit);
                                    return (
                                        <div key={index} className="product-details">
                                            <img src={image} alt={name} className="product-image" />
                                            <h4>Product Name: {name}</h4>
                                            <p>Price: {price * product.qte} DH</p>
                                            <p>Quantity: {product.qte}</p>
                                        </div>
                                    );
                                })}
                                <div className="div-button">
                                    <button onClick={() => setIsFormUpdateVisible(false)}>Impreme</button>
                                    <button
                                        type="button"
                                        onClick={() => setIsFormUpdateVisible(false)}
                                        className="cancel-button"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                        {!isFormUpdateVisible && (
                            <>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Order-ID</th>
                                            <th>Customer Name</th>
                                            <th>Total Amount</th>
                                            <th>Tel</th>
                                            <th>Adresse</th>
                                            <th>Date</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map((order, index) => (
                                            <tr key={index} >
                                                <td>{order._id}</td>
                                                <td>
                                                    <img className="p-img" src="https://i.pinimg.com/1200x/82/52/30/825230abaf01c30a584823f318861df1.jpg" alt="c" />
                                                    {order.id_client}
                                                </td>
                                                <td>
                                                    {order.produits.reduce((total, produit) => total + produit.qte, 0)} DH
                                                </td>
                                                <td>{order.tel}</td>
                                                <td>{order.adresse}</td>
                                                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                                <td>
                                                    <span className={order.statut === "Confirmed" ? "Comfimed" : "Canceled"}>
                                                        {order.statut}
                                                    </span>
                                                </td>
                                                <div className="Btns-U-D">
                                                    <button className="Btn-U-D" onClick={() => {
                                                        setSelectedOrder(order);
                                                        setIsFormUpdateVisible(true);
                                                    }}>
                                                        <img alt="img" src="data:image/png;base64,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" />
                                                    </button>
                                                    <button className="Btn-U-D Confirmed" onClick={() => { handleConfirmedOrder(order._id); }}>
                                                        <img alt="img" src="data:image/png;base64,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"/>
                                                    </button>
                                                    <button className="Btn-U-D Canceled" onClick={() => { handleCanceledOrder(order._id); }}>
                                                        <img alt="img" src="data:image/png;base64,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"/>
                                                    </button>
                                                    <button className="Btn-U-D" onClick={() => { handleDeleteOrder(order._id); }}>
                                                        <img alt="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABWVJREFUaEPtWknMXmMUfp6EmCJpzAuKKNLYGCJqqNjYEOmAWjYtaVUbVsQQrdK0ggUVVUMRK3SgEjYWKipoTLEQQxtDCQ0RIgSRPO7hfnJ7+t57z3u/+//9ov+bfJvvnul5z7nvGd5L7GOL+xheTAD+v3t8wsMTHs7cAUn3AFhN8utM1t3IJR0LYAnJm4eR43l7DWlJ8wGsA/AbgHsB3F0Y/HuOwZIOBGAgbwJwEID5JJ/MkdFE2xtgSYcA+BzAkRWF5mUz+JWIwZIuBvAEAPPuYO0CcBLJXyMy2mj6BLyq9IzXOY3k222G2HNJ5wB4K0G7iuStERltNL0AlnQ8gM8A7O8UbiB5ZZsR1eeS1gO4wvH8AeBUkl/myErR9gW4zshTSH6VY6SkyQC2JzZvPck5ObLGBLCkaQDe7DMMJdW9HueSTIV8eB+G8rAk438XwBlO4/cATiBpp3X2KlLbwQC+cAegyXkfwFkklS20ZBgW8CANef3zSD7V1ajyAKuTPVSa6gy4wQsfkPQez8ZeRs97AE7vM3qGAbwSwC0JJOE01LYLDWlqJcnb2vh7O7TKNPQJgAOc0OdIXtXFkDqevtNUJw83GHEiyW97BtxrmsoG3JCGVpC8vU+wA1l9pqkswA1pyLw6pWsaatukpjRF8sw2/urzXMDzyuLe65hL8ukcxbm0lU5sqBRYC1jS+QAudAfTQgDHJIxdngugA73ZujTB9x2ARyr//wngVZKp6i89xJO0CMCaDkaNEssCko95g5IelmS7dvQoWd/Blm9IVvvqf0TUAbZa+IgOSkaJZRfJPV6/OsAvAbhklKzvYMvLJC+NhvT1AB5wxD8U3ctDHRSPB8sSAIc7RTeQXB0FPBXAR47YWrJD+5ot9bUL5Sztl8TrOZXkxyHARlSc1DY8O8oxzCb5fF/G9iFH0mwAG52snSStJN1jNeXhxwFc7TjWkrSUNTJL0loAVh9U17piLn5NLmCbHz3rmHaQnDIyaP+NRJuZHedsmkPS5mxZHp4E4MfEuzGZ5M420JIuAmC/6tpCckv1jyhdSp8k23yblu4msrj5OIzkT1mAjVjSNgBnO8ZFRX6zMGpcku4oRCxzRMtJ2v//rShdDeDrEpljG0mbbydXY/MgaQUAP1nYRPLyEQH8QjHYm+FsaWxT2wBb8/CaE2hXHpaeGieHUc9F6fwGF87YD4CFrV3xVNd0klu7erhO6Hl13chAURRIlC4B2Lo5D8ycMYnkX50Al+/xi8Xs+TInYBnJO5vCOgokSpcAbC2pbxc3k5zZZFfrAECSlW0POiFvkLxgLwO2ftduPaprMcnGtjYC+GQAnzrBFjIWOrVXmFHPRemq+iXVpUwbM+0YysNlWKeS+8xi4L65TngUSJTOAbYsscHpri0nq3StHi4B2whlgVOwhuTivQQ4ZU+o7I0CTu3odpIW7skV9VyUznk4FXGzSFpeblxRwNllZhRIlG6AoqacbD1TBvwhwGVYp07FhSQfTW1pFEiUrgI4VU62Zo0ugFN5byNJ/3lCW1QN9VxSqpxsrQu6AE5VNlbaWWfS+YI6B31DORm+scwJ6boyM6wsB1zNa2LFzuvuWdamhwGX7/EmALOcwqUk7xoWTIRfkpWz/sIu60uhXMDXFgP6h51xW0lOjxg8LI2k1MGZvGGo05UL2EYpWZ8hDQsywB+awGQfWpW08I59SRMwZDxIGqcbKQOyPFy+x/ZJwzPjgSagY0ZxP2zta3hlAy5B2ydJc8NaxobwvqJbuzFXdCfAJWibWVtDcVpizJJrR5T+ZwAfFq3p/SQtY2SvzoCzNY0IwwTgEXHEmJkx4eEx29oREfw3S/JQW0Ow3UIAAAAASUVORK5CYII=" />
                                                    </button>
                                                </div>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;