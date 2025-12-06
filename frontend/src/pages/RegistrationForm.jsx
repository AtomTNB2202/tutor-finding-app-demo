import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Paper,
    TextField,
    Typography,
    Button,
    Box,
    Snackbar,
    Alert
} from "@mui/material";

function RegistrationForm() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [form, setForm] = useState({
        studentId: user?.id || "",
        grade: "",
        major: "",
        studyGoals: "",
        preferredSubjects: "",
    });

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const body = {
            ...form,
            preferredSubjects: form.preferredSubjects.split(",").map(s => s.trim()),
        };

        const res = await fetch("http://localhost:3001/registrationForms", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        if (res.ok) {
            setOpenSnackbar(true);
            setTimeout(() => navigate("/student"), 1200);
        }
    };

    if (!user) return <p>Please login again.</p>;

    return (
        <Container maxWidth="sm" sx={{ mt: 10 }}>
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                    Student Registration Form
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <TextField
                        label="Grade"
                        name="grade"
                        value={form.grade}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Major / Class"
                        name="major"
                        value={form.major}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Study Goals"
                        name="studyGoals"
                        multiline
                        minRows={3}
                        value={form.studyGoals}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Preferred Subjects (comma separated)"
                        name="preferredSubjects"
                        value={form.preferredSubjects}
                        onChange={handleChange}
                        required
                        fullWidth
                    />

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                        Submit
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => navigate("/student")}
                        sx={{ mt: 1 }}
                    >
                        Back to Dashboard
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={1500}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity="success" variant="filled">
                    Form submitted successfully! Redirecting...
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default RegistrationForm;
