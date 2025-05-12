import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Container, Col } from "react-bootstrap";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
            toast.error("All fields are required!", {
                position: "top-center",
                autoClose: 2000,
                theme: "colored",
            });
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: trimmedUsername,
                    email: trimmedEmail,
                    password: trimmedPassword
                }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                toast.success("Signup successful! Redirecting to login...", {
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
                    navigate("/login");
                }, 1800);
            } else {
                toast.error(data.message || "Signup failed. Please try again.", {
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
        <div className="signup-main">
            <ToastContainer />
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "calc(100vh - 70px)", marginTop: "70px" }}
            >
                <Col
                    md={4}
                    className="signup-card d-flex flex-column justify-content-center align-items-center"
                >
                    <div className="signup-logo">
                        <img src="/images/visualyze-logo.png" alt="VisuaLyze" />
                    </div>
                    <h3 className="mb-4 text-center signup-title">Sign Up</h3>
                    <form className="w-100" onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="mb-4">
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <AccountCircle sx={{ color: "#7e3af2", mr: 1, my: 0.5 }} />
                                <TextField
                                    id="username"
                                    label="Username"
                                    variant="standard"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    InputLabelProps={{ style: { color: "#7e3af2" } }}
                                    InputProps={{
                                        disableUnderline: false
                                    }}
                                />
                            </Box>
                        </div>
                        {/* Email */}
                        <div className="mb-4">
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <EmailIcon sx={{ color: "#7e3af2", mr: 1, my: 0.5 }} />
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
                        {/* Password */}
                        <div className="mb-4">
                            <FormControl sx={{ width: "100%" }} variant="standard">
                                <InputLabel htmlFor="signup-password" style={{ color: "#7e3af2" }}>
                                    Password
                                </InputLabel>
                                <Input
                                    id="signup-password"
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
                            {loading ? "Registering..." : "Register"}
                        </button>
                        <p className="mt-3 text-center signup-link">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </Col>
            </Container>
        </div>
    );
}

export default Signup;
