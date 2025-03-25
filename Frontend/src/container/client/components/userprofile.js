import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../style/userprofile.css"

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [commandes, setCommandes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const {id} = useParams()
    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                navigate("/login"); 
                return;
            }
            try {
                const userResponse = await axios.get(`http://localhost:5000/api/auth/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(userResponse.data);
                
                const commandesResponse = await axios.get(`http://localhost:5000/api/commandes/commandes/user/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCommandes(commandesResponse.data);
            } catch (err) {
                setError("Erreur lors de la récupération des données.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div style={{ color: "red" }}>{error}</div>;
    }

    return (
        <div className="user-profile">
            <h1>Profil de l'utilisateur</h1>
            
            {user && (
                <div className="user-info">
                    <p><strong>Nom:</strong> {user.nom_user}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Rôle:</strong> {user.role}</p>
                </div>
            )}

            <h2>Mes Commandes</h2>
            {commandes.length > 0 ? (
                <div className="commandes-list">
                    {commandes.map((commande) => (
                        <div key={commande._id} className="commande-card">
                            <p><strong>ID Commande:</strong> {commande._id}</p>
                            <p><strong>Statut:</strong> {commande.statut}</p>
                            <p><strong>Téléphone:</strong> {commande.tel}</p>
                            <p><strong>Adresse:</strong> {commande.adresse}</p>
                            <h4>Produits:</h4>
                            <ul>
                                {commande.produits.map((produit, index) => (
                                    <li key={index}>
                                        <p><strong>ID Produit:</strong> {produit.id_produit}</p>
                                        <p><strong>Quantité:</strong> {produit.qte}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ) : (
                <p>Aucune commande trouvée.</p>
            )}
        </div>
    );
};

export default UserProfile;