import {useState} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login"
import Register from "./pages/Register"
import Signup from "./pages/Signup";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/signup" element={<Signup/>} />
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
