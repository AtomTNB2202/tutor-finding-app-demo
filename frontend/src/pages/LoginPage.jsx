import React, { useState } from "react";
import { login } from "../api/api";
import { useNavigate } from "react-router-dom";

// Material UI
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Alert,
} from "@mui/material";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await login(email);

            localStorage.setItem("user", JSON.stringify(res.user));

            if (res.user.role === "student") navigate("/student");
            else if (res.user.role === "tutor") navigate("/tutor");
        } catch {
            setError("Email không tồn tại trong hệ thống.");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ backgroundColor: "#f2f5f9" }}
        >
            <Card sx={{ width: 420, padding: 3, boxShadow: 4, borderRadius: 3 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                        Tutor Support System
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        textAlign="center"
                        marginBottom={2}
                    >
                        Login with your HCMUT email
                    </Typography>

                    <form onSubmit={handleLogin}>
                        <TextField
                            label="Email"
                            type="email"
                            fullWidth
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ marginBottom: 2 }}
                        />

                        {error && (
                            <Alert severity="error" sx={{ marginBottom: 2 }}>
                                {error}
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            sx={{
                                paddingY: 1.2,
                                backgroundColor: "#1976D2",
                                "&:hover": { backgroundColor: "#125ea8" },
                                borderRadius: 2,
                            }}
                        >
                            Login
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}

export default LoginPage;
