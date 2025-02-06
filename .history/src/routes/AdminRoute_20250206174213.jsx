import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLocations from "./pages/AdminLocations";
import AdminUsers from "./pages/AdminUsers";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/locations" element={<AdminLocations />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                {/* Thêm các route khác */}
            </Routes>
        </Router>
    );
};

export default App;
