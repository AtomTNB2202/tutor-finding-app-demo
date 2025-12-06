import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import RegistrationForm from "./pages/RegistrationForm";
import MatchingPage from "./pages/MatchingPage";
import MySessions from "./pages/MySessions";
import ResourcesPage from "./pages/ResourcesPage";
import AddResourcePage from "./pages/AddResourcePage";
import FeedbackPage from "./pages/FeedbackPage";
import TutorAvailability from "./pages/TutorAvailability";

function TopBar() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <AppBar position="fixed" sx={{ background: "#1976D2" }}>
            <Toolbar sx={{ width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
                    Tutor Support System
                </Typography>

                {user && (
                    <Button
                        variant="contained"
                        color="secondary"
                        sx={{ textTransform: "none" }}
                        onClick={() => {
                            localStorage.removeItem("user");
                            navigate("/");
                        }}
                    >
                        Logout
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
}

function AppLayout() {
    return (
        <Box sx={{ paddingTop: "80px" }}>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/tutor" element={<TutorDashboard />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/matching" element={<MatchingPage />} />
                <Route path="/sessions" element={<MySessions />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/add-resource" element={<AddResourcePage />} />
                <Route path="/feedback" element={<FeedbackPage />} />
                <Route path="/availability" element={<TutorAvailability />} />
            </Routes>
        </Box>
    );
}

export default function App() {
    return (
        <Router>
            <TopBar />
            <AppLayout />
        </Router>
    );
}
