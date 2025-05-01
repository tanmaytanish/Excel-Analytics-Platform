import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div>
            <h2>Welcome, {user?.username}</h2>
            <p>Email: {user?.email}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
