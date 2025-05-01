import React, { useState } from "react";
import { Container, Col } from "react-bootstrap";
import "./Login.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link, useNavigate } from "react-router-dom";
import MyButton from "../components/MyButton";
// import Navbar from "../components/Navbar";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill in both email and password.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Store the token and user information in localStorage
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                // Redirect to the dashboard after successful login
                navigate("/dashboard");
            } else {
                alert(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            alert("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main">
            {/* <Navbar /> */}
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "calc(100vh - 70px)", marginTop: "70px" }}
            >
                <Col
                    md={4}
                    className="d-flex flex-column justify-content-center align-items-center rounded border border-success p-4 bg-light"
                >
                    <h3 className="mb-4 text-center">Login</h3>

                    <form className="w-100" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="mb-4">
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="standard"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Box>
                        </div>

                        {/* Password Field */}
                        <div className="mb-4">
                            <FormControl sx={{ width: "100%" }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </div>

                        {/* Login Button */}
                        <br /><br />
                        <button className="submit-btn" type="submit">Login</button>
                        {/* <MyButton label={loading ? "Logging in..." : "Login"} disabled={loading} /> */}

                        {/* Sign Up Link */}
                        <p className="mt-3 text-center">
                            New User? <Link to="/signup">Sign Up</Link>
                        </p>
                    </form>
                </Col>
            </Container>
        </div>
    );
}

export default Login;
