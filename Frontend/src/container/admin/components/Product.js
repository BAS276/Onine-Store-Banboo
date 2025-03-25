import "../style/AdminContainer.css";
import React, { useEffect, useState } from "react";
import axios from "axios";


const Products = () => {
    const [data, setData] = useState([]);
    const [productss, setProductss] = useState([]);
    const [text, setText] = useState("");
    const [categories, setCategories] = useState([]);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isFormUpdateVisible, setIsFormUpdateVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [productAdd, setProductAdd] = useState({
        name: "",
        description: "",
        price: 0,
        oldprice: 0,
        url_img: [""],
        qte_stock: 0,
        category: "",
    });

    const [productUpdate, setProductUpdate] = useState({
        name: "",
        description: "",
        price: 0,
        oldprice: 0,
        url_img: [""],
        qte_stock: 0,
        category: "",
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/categories');
            setCategories(response.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const handleInputChangeAdd = (e) => {
        const { name, value } = e.target;
        setProductAdd({
            ...productAdd,
            [name]: value,
        });
    };

    const handleInputChangeUpdate = (e) => {
        const { name, value } = e.target;
        setProductUpdate({
            ...productUpdate,
            [name]: value,
        });
    };

    
    useEffect(() => {
        axios
            .get("http://localhost:5000/api/produits")
            .then((response) => setData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const addProduct = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/produits", productAdd);
            console.log("Product added:", response.data);
            setIsFormVisible(false);
            setData([...data, response.data]); // Update state with new product
            resetForm();
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    const updateProduct = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/produits/${selectedProduct._id}`, productUpdate);
            console.log("Product updated:", response.data);
            setIsFormUpdateVisible(false);
            setData(data.map(product => product._id === selectedProduct._id ? response.data : product));
            resetForm();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteProduct = async (ProductId) => {
        if (!ProductId) return;

        const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/produits/${ProductId}`);
            setData(prev => prev.filter(Data => Data._id !== ProductId));
        } catch (error) {
            console.error('Error deleting user:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        const filteredProducts = data
            .filter(
                (product) =>
                    typeof product.name === "string" &&
                    product.name.toLowerCase().includes(text.toLowerCase())
            )
            .map((product) => (
                <tr key={product._id}>
                    <td>
                        <img src={product.url_img[0]} alt={product.name} className="p-img" />
                        {product.name}
                    </td>
                    <td>{product._id}</td>
                    <td>{product.price}</td>
                    <td>{product.qte_stock} pcs</td>
                    <td>{product.category}</td>
                    <td>
                        <span className="status active">active</span>
                    </td>
                    <td>
                        <div className="Btns-U-D">
                            <button className="Btn-U-D" onClick={() => {
                                setSelectedProduct(product);
                                setProductUpdate(product);
                                setIsFormUpdateVisible(true);
                            }}>
                                <img alt="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAplJREFUaEPt2s1qFEEUBeBznsCVLpQgiI/gRjfiShAR8UkEFaNJxGCM//gkElwo7nSrG4WsBEURQRQCrsSVRwpmQMbuqVtd1T23ki7Iarpr7lenuqqGDrHHGveYFyN4tyc+Jjwm7GQEJJ0FsA7gKAAB+ADgBsnnKSVWMaUl3QKw2gJbI7lhRbsHS7oDYDkCukvymgXtGmzETp0mtFtwItaMdgmWdBLAK8sUbbhmmeS9tntdgkOxki4DeNAB/QfACZKvm+51C85Eb5G8UB04A/2RZNiv/2suEpb0CMA3kg+bipQUtpzNhOn9ieQRl2BJjwFcnBR3ZQ465Zn2OaVnsNNActFh0TpO8o2rhCWF6XupZZq2bi2SwqkrnL7a2lWS911tSy3JztbYJenoaWvwRcuI7TK9o9jQ6aDgjsdFS9Im7KBgSWFbMf2iaXj+Vkg2bkuSTpF8ad2yBkm4Y7LmZ9qKHSThQtjoM21F95pwYWwRdG/gnrABvU7ypjXR2et6AfeINa/Ggx08PGOLL1resUXBNWCLgWvBFgHXhM0G14bNAteI7QyuFdsJXDM2GVw7Ngmc8SYgduzdILkWu6jU5+aztKQfAPaX+uJJP5skVwr3Obc7E1jSYQCfCxeW/UOgSz1WcHhP86TLF7TcsxCs+RmWdBvA9ULghWFTwC8AnC4AXig2BfwTwL5M8MKxJrCkJQBfdgPWCj4PYCsD7CLZaf3RVTryP1KxcXCFtSb8DMCZmKzhc3dYK/g7gAOJ4FWSYStz1+ZOaUmHAHydU/UvANsA3v7zt03ytzvppKAY+ByAp5NrdwC8m8G9JxneuFfTYuBjAA4GKMncrcnFoERXaRdVFixiBBccTJddjQm7jKVgUWPCBQfTZVd/AeKSIEwckRiIAAAAAElFTkSuQmCC" />
                            </button>
                            <button className="Btn-U-D" onClick={() => { handleDeleteProduct(product._id); }}>
                                <img alt="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAABWVJREFUaEPtWknMXmMUfp6EmCJpzAuKKNLYGCJqqNjYEOmAWjYtaVUbVsQQrdK0ggUVVUMRK3SgEjYWKipoTLEQQxtDCQ0RIgSRPO7hfnJ7+t57z3u/+//9ov+bfJvvnul5z7nvGd5L7GOL+xheTAD+v3t8wsMTHs7cAUn3AFhN8utM1t3IJR0LYAnJm4eR43l7DWlJ8wGsA/AbgHsB3F0Y/HuOwZIOBGAgbwJwEID5JJ/MkdFE2xtgSYcA+BzAkRWF5mUz+JWIwZIuBvAEAPPuYO0CcBLJXyMy2mj6BLyq9IzXOY3k222G2HNJ5wB4K0G7iuStERltNL0AlnQ8gM8A7O8UbiB5ZZsR1eeS1gO4wvH8AeBUkl/myErR9gW4zshTSH6VY6SkyQC2JzZvPck5ObLGBLCkaQDe7DMMJdW9HueSTIV8eB+G8rAk438XwBlO4/cATiBpp3X2KlLbwQC+cAegyXkfwFkklS20ZBgW8CANef3zSD7V1ajyAKuTPVSa6gy4wQsfkPQez8ZeRs97AE7vM3qGAbwSwC0JJOE01LYLDWlqJcnb2vh7O7TKNPQJgAOc0OdIXtXFkDqevtNUJw83GHEiyW97BtxrmsoG3JCGVpC8vU+wA1l9pqkswA1pyLw6pWsaatukpjRF8sw2/urzXMDzyuLe65hL8ukcxbm0lU5sqBRYC1jS+QAudAfTQgDHJIxdngugA73ZujTB9x2ARyr//wngVZKp6i89xJO0CMCaDkaNEssCko95g5IelmS7dvQoWd/Blm9IVvvqf0TUAbZa+IgOSkaJZRfJPV6/OsAvAbhklKzvYMvLJC+NhvT1AB5wxD8U3ctDHRSPB8sSAIc7RTeQXB0FPBXAR47YWrJD+5ot9bUL5Sztl8TrOZXkxyHARlSc1DY8O8oxzCb5fF/G9iFH0mwAG52snSStJN1jNeXhxwFc7TjWkrSUNTJL0loAVh9U17piLn5NLmCbHz3rmHaQnDIyaP+NRJuZHedsmkPS5mxZHp4E4MfEuzGZ5M420JIuAmC/6tpCckv1jyhdSp8k23yblu4msrj5OIzkT1mAjVjSNgBnO8ZFRX6zMGpcku4oRCxzRMtJ2v//rShdDeDrEpljG0mbbydXY/MgaQUAP1nYRPLyEQH8QjHYm+FsaWxT2wBb8/CaE2hXHpaeGieHUc9F6fwGF87YD4CFrV3xVNd0klu7erhO6Hl13chAURRIlC4B2Lo5D8ycMYnkX50Al+/xi8Xs+TInYBnJO5vCOgokSpcAbC2pbxc3k5zZZFfrAECSlW0POiFvkLxgLwO2ftduPaprMcnGtjYC+GQAnzrBFjIWOrVXmFHPRemq+iXVpUwbM+0YysNlWKeS+8xi4L65TngUSJTOAbYsscHpri0nq3StHi4B2whlgVOwhuTivQQ4ZU+o7I0CTu3odpIW7skV9VyUznk4FXGzSFpeblxRwNllZhRIlG6AoqacbD1TBvwhwGVYp07FhSQfTW1pFEiUrgI4VU62Zo0ugFN5byNJ/3lCW1QN9VxSqpxsrQu6AE5VNlbaWWfS+YI6B31DORm+scwJ6boyM6wsB1zNa2LFzuvuWdamhwGX7/EmALOcwqUk7xoWTIRfkpWz/sIu60uhXMDXFgP6h51xW0lOjxg8LI2k1MGZvGGo05UL2EYpWZ8hDQsywB+awGQfWpW08I59SRMwZDxIGqcbKQOyPFy+x/ZJwzPjgSagY0ZxP2zta3hlAy5B2ydJc8NaxobwvqJbuzFXdCfAJWibWVtDcVpizJJrR5T+ZwAfFq3p/SQtY2SvzoCzNY0IwwTgEXHEmJkx4eEx29oREfw3S/JQW0Ow3UIAAAAASUVORK5CYII=" />
                            </button>
                        </div>
                    </td>
                </tr>
            ));
        setProductss(filteredProducts);
    }, [data, text]);

    const addImageUrlField = () => {
        setProductAdd((prevProductAdd) => ({
            ...prevProductAdd,
            url_img: [...prevProductAdd.url_img, ""],  
        }));
    };

    const handleImageUrlChange = (index, value) => {
        const updatedUrls = [...productAdd.url_img];
        updatedUrls[index] = value;
        setProductAdd((prevProductAdd) => ({
            ...prevProductAdd,
            url_img: updatedUrls,
        }));
    };

    const resetForm = () => {
        setProductAdd({
            name: "",
            description: "",
            price: 0,
            oldprice: 0,
            url_img: [""],
            qte_stock: 0,
            category: "",
        });
        setProductUpdate({
            name: "",
            description: "",
            price: 0,
            oldprice: 0,
            url_img: [""],
            qte_stock: 0,
            category: "",
        });
    };

    const ProductForm = ({ isUpdate, product, onChange, onSubmit, onCancel }) => {
        return (
            <form className="AddProductForm">
                <h2>{isUpdate ? "Update Product" : "Add New Product"}</h2>
                <label>
                    Name:
                    <input name="name" type="text" required value={product.name} onChange={onChange} />
                </label>
                <label>
                    Price:
                    <input name="price" type="number" required value={product.price} onChange={onChange} />
                </label>
                <label>
                    Old Price:
                    <input name="oldprice" type="number" value={product.oldprice} onChange={onChange} />
                </label>
                <label>
                Category:
                <select
                    name="category"
                    value={product.category}
                    onChange={onChange}
                    required
                >
                    <option value="">{product.category}</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </label>
                
                <label>
                    Description:
                    <textarea name="description" required value={product.description} onChange={onChange} />
                </label>
                <label>
                    Stock Quantity:
                    <input name="qte_stock" type="number" required value={product.qte_stock} onChange={onChange} />
                </label>
                <label>
                    Images:
                    {product.url_img.map((url, index) => (
                        <div key={index} className="image-url-field">
                            <input
                                type="url"
                                value={url}
                                onChange={(e) => handleImageUrlChange(index, e.target.value)}
                                placeholder={`Image URL ${index + 1}`}
                                required={index === 0}
                            />
                        </div>
                    ))}
                    <button type="button" onClick={addImageUrlField} className="add-image-button">
                        Add Another Image
                    </button>
                </label>
                <div className="div-button">
                    <button type="button" onClick={onSubmit}>
                        {isUpdate ? "Update Product" : "Add Product"}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="cancel-button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        );
    };

    return (
        <div className="admin-container">
            <main className="admin-content">
                <h2>Product:</h2>
                <div className="serche-add">
                    <input
                        className="input"
                        type="search"
                        placeholder="Search products..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button onClick={() => setIsFormVisible(true)} className="buy-now">
                        Add Product
                    </button>
                </div>
                {isFormUpdateVisible ? (
                    <ProductForm
                        isUpdate={true}
                        product={productUpdate}
                        onChange={handleInputChangeUpdate}
                        onSubmit={updateProduct}
                        onCancel={() => setIsFormUpdateVisible(false)}
                    />
                ) : isFormVisible ? (
                    <ProductForm
                        isUpdate={false}
                        product={productAdd}
                        onChange={handleInputChangeAdd}
                        onSubmit={addProduct}
                        onCancel={() => setIsFormVisible(false)}
                    />
                ) : (
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Product ID</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>{productss}</tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Products;