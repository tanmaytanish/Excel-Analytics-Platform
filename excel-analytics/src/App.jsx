import {useState} from "react";
import "./App.css";
import {Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home/>} />
            </Routes>
            <Footer/>
        </>
    );
}

export default App;
