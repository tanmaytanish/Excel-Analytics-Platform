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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            toast.error("Please fill in both email and password.", {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
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
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success("Login successful! Redirecting...", {
                    position: "top-center",
                    autoClose: 1800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    progress: undefined,
                    theme: "colored",
                });
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1800);
            } else {
                toast.error(data.message || "Login failed. Please try again.", {
                    position: "top-center",
                    autoClose: 2200,
                    theme: "colored",
                });
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.", {
                position: "top-center",
                autoClose: 2200,
                theme: "colored",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="main-login">
            <ToastContainer />
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "calc(100vh - 70px)", marginTop: "70px" }}
            >
                <Col
                    md={4}
                    className="login-card d-flex flex-column justify-content-center align-items-center"
                >
                    <div className="login-logo">
                        <img src="/images/visualyze-logo.png" alt="VisuaLyze" />
                    </div>
                    <h3 className="mb-4 text-center login-title">Welcome Back</h3>
                    <form className="w-100" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <AccountCircle sx={{ color: "#7e3af2", mr: 1, my: 0.5 }} />
                                <TextField
                                    id="email"
                                    label="Email"
                                    variant="standard"
                                    fullWidth
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputLabelProps={{ style: { color: "#7e3af2" } }}
                                    InputProps={{
                                        disableUnderline: false
                                    }}
                                />
                            </Box>
                        </div>
                        <div className="mb-4">
                            <FormControl sx={{ width: "100%" }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password" style={{ color: "#7e3af2" }}>
                                    Password
                                </InputLabel>
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
                                    disableUnderline={false}
                                />
                            </FormControl>
                        </div>
                        <button className="submit-btn" type="submit" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </button>
                        <p className="mt-3 text-center login-link">
                            New User? <Link to="/signup">Sign Up</Link>
                        </p>
                    </form>
                </Col>
            </Container>
        </div>
    );
}

export default Login;
