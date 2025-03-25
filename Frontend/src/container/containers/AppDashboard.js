import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from "../admin/components/Dashboard"
import Products from "../admin/components/Product"
import Orders from "../admin/components/Orders"
import Categorys from "../admin/components/Category"
import Users from "../admin/components/Users"
import Admines from "../admin/components/Admine"
import Sidbar from "../admin/layout/sidbar"
function AppDashboard() {
    return (
        <div className="App">
                <Sidbar />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/Products" element={<Products />} />
                    <Route path="/Orders" element={<Orders />} />
                    <Route path="/Categorys" element={<Categorys />} />
                    <Route path="/Users" element={<Users />} />
                    <Route path="/Admines" element={<Admines />} />
                </Routes>
        </div>
    );
}

export default AppDashboard;
