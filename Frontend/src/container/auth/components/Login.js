import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../auth.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [user, setUser] = useState(null); 
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Veuillez remplir tous les champs.");
            return;
        }

        try {
            const res = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.usser.role); 
            setUser(res.data.usser);
            navigate(res.data.usser.role === "admin" ? "/admin" : `/user/${res.data.usser._id}`);
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "Une erreur est survenue lors de la connexion.");
            } else if (err.request) {
                setError("Erreur de connexion au serveur. Veuillez réessayer plus tard.");
            } else {
                setError("Une erreur inattendue est survenue.");
            }
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(null); // Clear user data
        navigate("/login");
    };

    return (
        <div className="form">
            {!token ? (
                <>
                    <h2>Sign in</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleLogin}>
                        <div className="inputForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20">
                                <g data-name="Layer 3" id="Layer_3">
                                    <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path>
                                </g>
                            </svg>
                            <input
                                placeholder="Enter your Email"
                                className="input"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="inputForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20">
                                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                            </svg>
                            <input
                                placeholder="Enter your Password"
                                className="input"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex-row">
                            <div>
                                <input type="checkbox" id="rememberMe" />
                                <label htmlFor="rememberMe">Remember me</label>
                            </div>
                            <span className="span"><Link to="/forgot-password" className="nav-link">Forgot password?</Link></span>
                        </div>
                        <button type="submit" className="button-submit">Sign In</button>
                        <p className="p">Don't have an account? <span className="span"><Link to="/register" className="nav-link">Sign Up</Link></span></p>
                    </form>
                </>
            ) : (
                <>
                    {role === "admin" ? <h1>Welcome Admin </h1> : <h1>Welcome User</h1>}
                    {user && (
                        <Link className="link" to={`/user/${user._id}`}>
                            <img alt="img" className="profileimg" src="https://i.pinimg.com/736x/c3/42/8d/c3428defa55940815fba11ca17600bfa.jpg" />
                        </Link>
                    )}
                    <button onClick={handleLogout} className="button-submit" style={{ marginTop: "20px" }}>
                        Logout
                    </button>
                </>
            )}
        </div>
    );
};

export default Login;