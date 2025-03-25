import "../style/AdminContainer.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admines = () => {
    const [admin, setAdmin] = useState([]);
    const [id, setId] = useState("");
    const [adminAdd, setAdminAdd] = useState({
        nom_user: "",
        email: "",
        password: "",
        role: "admin",
    });
    const [adminUpdate, setAdminUpdate] = useState({
        nom_user: "",
        email: "",
        password: "",
        role: "",
    });
    const [refresh, setRefresh] = useState(false);
    const [isFormUpdateVisible, setIsFormUpdateVisible] = useState(false);
    const [isUpdateVisible, setIsUpdateVisible] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:5000/api/auth")
            .then(response => setAdmin(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, [refresh]);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/api/auth/${id}`)
                .then(response => setAdminUpdate(response.data))
                .catch(error => console.error("Error fetching admin data:", error));
        }
    }, [id]);

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/auth/register`, adminAdd);
            setIsFormUpdateVisible(false);
            setRefresh(prev => !prev); 
            setAdminAdd({})
        } catch (error) {
            console.error('Error adding user:', error.response ? error.response.data : error.message);
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!userId) return;
        
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (!confirmDelete) return;
    
        try {
            await axios.delete(`http://localhost:5000/api/auth/${userId}`);
            setAdmin(prevAdmins => prevAdmins.filter(admin => admin._id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/auth/${id}`, adminUpdate);
            setIsFormUpdateVisible(false);
            setRefresh(prev => !prev);
        } catch (error) {
            console.error('Error updating user:', error.response ? error.response.data : error.message);
        }
    };

    const handleInputChangeUpdate = (e) => {
        const { name, value } = e.target;
        setAdminUpdate(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleInputChangeAdd = (e) => {
        const { name, value } = e.target;
        setAdminAdd(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="admin-container">
            <div className="admin-content">
                {isFormUpdateVisible ? (
                    isUpdateVisible ? (
                        <form className="AddProductForm" onSubmit={handleUpdateUser}>
                            <h2>Update Admin</h2>
                            <label>
                                Name:
                                <input name="nom_user" type="text" required value={adminUpdate.nom_user} onChange={handleInputChangeUpdate} />
                            </label>
                            <label>
                                Role:
                                <select name="role" value={adminUpdate.role} onChange={handleInputChangeUpdate}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </label>
                            <label>
                                Email:
                                <input name="email" type="email" value={adminUpdate.email} onChange={handleInputChangeUpdate} />
                            </label>
                            <label>
                                Password:
                                <input name="password" type="password" value={adminUpdate.password} onChange={handleInputChangeUpdate} />
                            </label>
                            <div className="div-button">
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setIsFormUpdateVisible(false)} className="cancel-button">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <form className="AddProductForm" onSubmit={handleAddUser}>
                            <h2>Add New Admin</h2>
                            <label>
                                Name:
                                <input name="nom_user" type="text" required value={adminAdd.nom_user} onChange={handleInputChangeAdd} />
                            </label>
                            <label>
                                Role:
                                <select name="role" value={adminAdd.role} onChange={handleInputChangeAdd}>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </label>
                            <label>
                                Email:
                                <input name="email" type="email" value={adminAdd.email} onChange={handleInputChangeAdd} />
                            </label>
                            <label>
                                Password:
                                <input name="password" type="password" value={adminAdd.password} onChange={handleInputChangeAdd} />
                            </label>
                            <div className="div-button">
                                <button type="submit">Save</button>
                                <button type="button" onClick={() => setIsFormUpdateVisible(false)} className="cancel-button">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )
                ) : (
                    <>
                        <h2>Admin List</h2>
                        <div className="Add-New-Admin-btn">
                            <button onClick={() => { setIsFormUpdateVisible(true); setIsUpdateVisible(false); }}>Add New Admin</button>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {admin.filter(user => user.role === "admin").map((admin, index) => (
                                    <tr key={index}>
                                        <td><img className="p-img" src="https://i.pinimg.com/1200x/82/52/30/825230abaf01c30a584823f318861df1.jpg" alt="c" /></td>
                                        <td>{admin.nom_user}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.role}</td>
                                        <td><span className="status active">Online</span></td>
                                        <td>
                                            <div className="Btns-U-D">
                                                <button className="Btn-U-D" onClick={() => { setId(admin._id); setIsFormUpdateVisible(true); setIsUpdateVisible(true); }}>
                                                <img alt="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAplJREFUaEPt2s1qFEEUBeBznsCVLpQgiI/gRjfiShAR8UkEFaNJxGCM//gkElwo7nSrG4WsBEURQRQCrsSVRwpmQMbuqVtd1T23ki7Iarpr7lenuqqGDrHHGveYFyN4tyc+Jjwm7GQEJJ0FsA7gKAAB+ADgBsnnKSVWMaUl3QKw2gJbI7lhRbsHS7oDYDkCukvymgXtGmzETp0mtFtwItaMdgmWdBLAK8sUbbhmmeS9tntdgkOxki4DeNAB/QfACZKvm+51C85Eb5G8UB04A/2RZNiv/2suEpb0CMA3kg+bipQUtpzNhOn9ieQRl2BJjwFcnBR3ZQ465Zn2OaVnsNNActFh0TpO8o2rhCWF6XupZZq2bi2SwqkrnL7a2lWS911tSy3JztbYJenoaWvwRcuI7TK9o9jQ6aDgjsdFS9Im7KBgSWFbMf2iaXj+Vkg2bkuSTpF8ad2yBkm4Y7LmZ9qKHSThQtjoM21F95pwYWwRdG/gnrABvU7ypjXR2et6AfeINa/Ggx08PGOLL1resUXBNWCLgWvBFgHXhM0G14bNAteI7QyuFdsJXDM2GVw7Ngmc8SYgduzdILkWu6jU5+aztKQfAPaX+uJJP5skVwr3Obc7E1jSYQCfCxeW/UOgSz1WcHhP86TLF7TcsxCs+RmWdBvA9ULghWFTwC8AnC4AXig2BfwTwL5M8MKxJrCkJQBfdgPWCj4PYCsD7CLZaf3RVTryP1KxcXCFtSb8DMCZmKzhc3dYK/g7gAOJ4FWSYStz1+ZOaUmHAHydU/UvANsA3v7zt03ytzvppKAY+ByAp5NrdwC8m8G9JxneuFfTYuBjAA4GKMncrcnFoERXaRdVFixiBBccTJddjQm7jKVgUWPCBQfTZVd/AeKSIEwckRiIAAAAAElFTkSuQmCC" />
                                                </button>
                                                <button className="Btn-U-D" onClick={() => { setId(admin._id); handleDeleteUser(admin._id) }}>
                                                <img alt="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABWVJREFUaEPtWknMXmMUfp6EmCJpzAuKKNLYGCJqqNjYEOmAWjYtaVUbVsQQrdK0ggUVVUMRK3SgEjYWKipoTLEQQxtDCQ0RIgSRPO7hfnJ7+t57z3u/+//9ov+bfJvvnul5z7nvGd5L7GOL+xheTAD+v3t8wsMTHs7cAUn3AFhN8utM1t3IJR0LYAnJm4eR43l7DWlJ8wGsA/AbgHsB3F0Y/HuOwZIOBGAgbwJwEID5JJ/MkdFE2xtgSYcA+BzAkRWF5mUz+JWIwZIuBvAEAPPuYO0CcBLJXyMy2mj6BLyq9IzXOY3k222G2HNJ5wB4K0G7iuStERltNL0AlnQ8gM8A7O8UbiB5ZZsR1eeS1gO4wvH8AeBUkl/myErR9gW4zshTSH6VY6SkyQC2JzZvPck5ObLGBLCkaQDe7DMMJdW9HueSTIV8eB+G8rAk438XwBlO4/cATiBpp3X2KlLbwQC+cAegyXkfwFkklS20ZBgW8CANef3zSD7V1ajyAKuTPVSa6gy4wQsfkPQez8ZeRs97AE7vM3qGAbwSwC0JJOE01LYLDWlqJcnb2vh7O7TKNPQJgAOc0OdIXtXFkDqevtNUJw83GHEiyW97BtxrmsoG3JCGVpC8vU+wA1l9pqkswA1pyLw6pWsaatukpjRF8sw2/urzXMDzyuLe65hL8ukcxbm0lU5sqBRYC1jS+QAudAfTQgDHJIxdngugA73ZujTB9x2ARyr//wngVZKp6i89xJO0CMCaDkaNEssCko95g5IelmS7dvQoWd/Blm9IVvvqf0TUAbZa+IgOSkaJZRfJPV6/OsAvAbhklKzvYMvLJC+NhvT1AB5wxD8U3ctDHRSPB8sSAIc7RTeQXB0FPBXAR47YWrJD+5ot9bUL5Sztl8TrOZXkxyHARlSc1DY8O8oxzCb5fF/G9iFH0mwAG52snSStJN1jNeXhxwFc7TjWkrSUNTJL0loAVh9U17piLn5NLmCbHz3rmHaQnDIyaP+NRJuZHedsmkPS5mxZHp4E4MfEuzGZ5M420JIuAmC/6tpCckv1jyhdSp8k23yblu4msrj5OIzkT1mAjVjSNgBnO8ZFRX6zMGpcku4oRCxzRMtJ2v//rShdDeDrEpljG0mbbydXY/MgaQUAP1nYRPLyEQH8QjHYm+FsaWxT2wBb8/CaE2hXHpaeGieHUc9F6fwGF87YD4CFrV3xVNd0klu7erhO6Hl13chAURRIlC4B2Lo5D8ycMYnkX50Al+/xi8Xs+TInYBnJO5vCOgokSpcAbC2pbxc3k5zZZFfrAECSlW0POiFvkLxgLwO2ftduPaprMcnGtjYC+GQAnzrBFjIWOrVXmFHPRemq+iXVpUwbM+0YysNlWKeS+8xi4L65TngUSJTOAbYsscHpri0nq3StHi4B2whlgVOwhuTivQQ4ZU+o7I0CTu3odpIW7skV9VyUznk4FXGzSFpeblxRwNllZhRIlG6AoqacbD1TBvwhwGVYp07FhSQfTW1pFEiUrgI4VU62Zo0ugFN5byNJ/3lCW1QN9VxSqpxsrQu6AE5VNlbaWWfS+YI6B31DORm+scwJ6boyM6wsB1zNa2LFzuvuWdamhwGX7/EmALOcwqUk7xoWTIRfkpWz/sIu60uhXMDXFgP6h51xW0lOjxg8LI2k1MGZvGGo05UL2EYpWZ8hDQsywB+awGQfWpW08I59SRMwZDxIGqcbKQOyPFy+x/ZJwzPjgSagY0ZxP2zta3hlAy5B2ydJc8NaxobwvqJbuzFXdCfAJWibWVtDcVpizJJrR5T+ZwAfFq3p/SQtY2SvzoCzNY0IwwTgEXHEmJkx4eEx29oREfw3S/JQW0Ow3UIAAAAASUVORK5CYII=" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div>
    );
};

export default Admines;
