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
import "./Signup.css";

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Trim any whitespace and check if the fields are empty
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();

        // Check for empty fields
        if (!trimmedUsername || !trimmedEmail || !trimmedPassword) {
            alert("All fields are required!");
            return; // Prevent submission if any field is empty
        }

        // Call the API to register the user
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
            // On successful signup, the server should return a JWT token
            // Store the JWT token in localStorage
            localStorage.setItem("token", data.token);

            // Optionally, store user data (for example, username or email)
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect the user to the login page or dashboard
            alert("Signup successful. Please login.");
            navigate("/login");
        } else {
            alert(data.message || "Signup failed. Please try again.");
        }
    };

    return (
        <div className="signup-main">
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{ minHeight: "calc(100vh - 70px)", marginTop: "70px" }}
            >
                <Col
                    md={4}
                    className="d-flex flex-column justify-content-center align-items-center rounded border border-success p-4 bg-light"
                >
                    <h3 className="mb-4 text-center">Sign Up</h3>

                    <form className="w-100" onSubmit={handleSubmit}>
                        {/* Username */}
                        <div className="mb-4">
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
                                <TextField
                                    id="username"
                                    label="Username"
                                    variant="standard"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Box>
                        </div>

                        {/* Email */}
                        <div className="mb-4">
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <EmailIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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

                        {/* Password */}
                        <div className="mb-4">
                            <FormControl sx={{ width: "100%" }} variant="standard">
                                <InputLabel htmlFor="signup-password">Password</InputLabel>
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
                                />
                            </FormControl>
                        </div>

                        {/* Submit Button */}
                        <br />
                        <button className="submit-btn" type="submit">Register</button>

                        {/* Login Link */}
                        <p className="mt-3 text-center">
                            Already have an account? <Link to="/login">Login</Link>
                        </p>
                    </form>
                </Col>
            </Container>
        </div>
    );
}

export default Signup;