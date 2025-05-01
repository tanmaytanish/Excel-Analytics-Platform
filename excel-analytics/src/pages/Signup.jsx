// src/pages/Signup.js

import React from "react";
import { Container, Col } from "react-bootstrap";
import "./Signup.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import MyButton from "../components/MyButton";

function Signup() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => event.preventDefault();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
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
                        <MyButton label="Register" />

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
