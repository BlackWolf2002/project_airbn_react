import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/Home";
import Login from "./components/Login";
import AdminPage from "./pages/AdminPage";
import AdminRoute from "./routes/AdminRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
