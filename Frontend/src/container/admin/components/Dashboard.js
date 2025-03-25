import "../style/AdminContainer.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import icon from "C:/Users/dell/Desktop/code/Banboo/Frontend/src/container/imgs/adminimg/icon";
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';


const Dashboard = () => {

    const [data, setData] = useState([]);
    const [admin, setAdmin] = useState([]);
    const [stockProductss, setStockProductss] = useState([]);
    const [user, setUser] = useState([]);
    const [orders, setOrders] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:5000/api/produits")
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);
    useEffect(() => {
        axios.get("http://localhost:5000/api/auth")
            .then(response => setAdmin(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    useEffect(() => {
        const filteredProducts = data.filter(product => product.qte_stock == 0).map((product) => (
            <tr key={product._id}>
                    <td>
                        <img src={product.url_img[0]} alt={product.name} className="p-img" />
                        {product.name}
                    </td>
                    <td>{product.price}</td>
                    <td>{product.qte_stock} pcs</td>
                    <td>{product.category}</td>
                <td><span class="status inactive">inactive</span></td>
            </tr>
        ));
        setStockProductss(filteredProducts);
    }, [data]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth")
            .then(response => setUser(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    const userlength = user.filter(user => user.role === "user").length;
    
    useEffect(() => {
        axios.get("http://localhost:5000/api/commandes")
            .then(response => setOrders(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);
    const orderlength = orders.filter(order => order.statut === "Confirmed").length;
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");
    
    // Rediriger vers /login si l'utilisateur n'est pas authentifié ou n'a pas le rôle admin
    if (!token || userRole !== "admin") {
        return <Navigate to="/login" replace />;
    }
    return (

        <div className="admin-container">
            <div className="admin-content Dashboard">
                <h2>Dashboard</h2>
                <div className="contaner">
                    <div className="Rectangles-of-dashboard">
                        <div className="Rectangles">
                            <div className="Text">
                                <h3>Total Sale</h3>
                                <h2>45389DH</h2>
                                <h5>47% last week</h5>
                            </div>
                            <div className="icon">
                                <img alt="icon" src={icon[0]} />
                            </div>
                        </div>
                        <div className="Rectangles">
                            <div className="Text">
                                <h3>Visitors</h3>
                                <h2>2908</h2>
                                <h5>47% last week</h5>
                            </div>
                            <div className="icon">
                                <img alt="icon" src={icon[1]} />
                            </div>
                        </div>
                        <div className="Rectangles">
                            <div className="Text">
                                <h3>Conf Orders</h3>
                                <h2>{orderlength}</h2>
                                <h5>77% last week</h5>
                            </div>
                            <div className="icon">
                                <img alt="icon" src={icon[2]} />
                            </div>
                        </div>
                        <div className="Rectangles">
                            <div className="Text">
                                <h3>Customers</h3>
                                <h2>{userlength}</h2>
                                <h5>47% last week</h5>
                            </div>
                            <div className="icon">
                                <img alt="icon" src={icon[3]} />
                            </div>
                        </div>
                    </div>
                    <div className="Curves">
                        <div className="statement">
                            <h3>This Month's Requests</h3>
                            <BarChart
                                series={[
                                    { data: [35, 44, 24, 34, 45, 22, 18, 29, 39, 25, 30, 28, 42, 33, 19, 50, 25, 30, 45, 50, 15, 18, 20, 22, 25, 27, 29, 32, 38, 40] }
                                ]}
                                height={290}
                                xAxis={[{
                                    data: [
                                        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
                                        "11", "12", "13", "14", "15", "16", "17", "18", "19",
                                        "20", "21", "22", "23", "24", "25", "26", "27", "28",
                                        "29", "30"
                                    ], scaleType: 'band'
                                }]}
                                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
                                sx={{
                                    borderRadius: '10px',
                                    marginBottom: '-40px'
                                }}
                            />
                        </div>
                        <div className="Circular-statement">
                            <h3>This Month's Earnings</h3>
                            <LineChart
                                xAxis={[{
                                    data: [
                                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
                                        11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
                                        21, 22, 23, 24, 25, 26, 27, 28, 29, 30
                                    ]
                                }]}
                                series={[
                                    {
                                        data: [35, 44, 24, 34, 45, 22, 18, 29, 39, 25, 30, 28, 42, 33, 19, 50, 25, 30, 45, 50, 15, 18, 20, 22, 25, 27, 29, 32, 38, 40],
                                    },
                                ]}
                                width={500}
                                height={300}
                            />
                        </div>
                    </div>
                    <div className="Products-Statement ">
                        <div className="best-seller stock-report">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Admin</th>
                                        <th>Name</th>
                                        <th>Role</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admin.filter(user => user.role === "admin").map((admin, index) => (
                                        <tr key={index}>
                                            <td><img className="p-img" src="https://i.pinimg.com/1200x/82/52/30/825230abaf01c30a584823f318861df1.jpg" alt="c" /></td>
                                            <td>{admin.nom_user}</td>
                                            <td>{admin.role}</td>
                                            <td><td><span class="status active">Online</span></td></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="stock-report">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Price</th>
                                        <th>Stock</th>
                                        <th>Type</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stockProductss}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
