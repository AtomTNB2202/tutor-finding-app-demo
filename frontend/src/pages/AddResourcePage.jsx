import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Paper,
    TextField,
    Typography,
    Button,
    Snackbar,
    Alert,
    Box
} from "@mui/material";

function AddResourcePage() {
    const navigate = useNavigate();
    const [subject, setSubject] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newResource = {
            id: "res_" + Date.now(),
            subject,
            title,
            description,
            link,
        };

        await fetch("http://localhost:3001/resources", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newResource),
        });

        setSuccess(true);

        setTimeout(() => navigate("/resources"), 1200);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "40px"
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    p: 4,
                    width: "100%",
                    borderRadius: 3
                }}
            >
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={3}>
                    Add New Resource
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        label="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                    />

                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        multiline
                        minRows={3}
                        fullWidth
                    />

                    <TextField
                        label="Link"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        required
                        fullWidth
                    />

                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{ borderRadius: 2, backgroundColor: "#1976D2" }}
                    >
                        Save Resource
                    </Button>

                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ borderRadius: 2 }}
                        onClick={() => navigate("/resources")}
                    >
                        Back
                    </Button>
                </Box>
            </Paper>

            <Snackbar
                open={success}
                autoHideDuration={1500}
                onClose={() => setSuccess(false)}
            >
                <Alert severity="success" variant="filled">
                    Resource added successfully!
                </Alert>
            </Snackbar>
        </Container>
    );
}

export default AddResourcePage;
