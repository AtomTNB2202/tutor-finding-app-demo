import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Chip,
    Button,
    Container,
} from "@mui/material";

function ResourcesPage() {
    const [resources, setResources] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/resources")
            .then((res) => res.json())
            .then((data) => setResources(data))
            .catch((err) => console.error(err));
    }, []);

    const chipColors = {
        Math: "primary",
        Physics: "error",
        Chemistry: "success",
        English: "secondary",
        Default: "default",
    };

    const getColor = (subject) => chipColors[subject] || "default";

    return (
        <Container
            maxWidth="md"
            sx={{
                minHeight: "100vh",
                pt: 6,
                pb: 8,
            }}
        >
            <Typography
                variant="h4"
                fontWeight={700}
                textAlign="center"
                gutterBottom
            >
                Learning Resources
            </Typography>

            <Typography
                variant="body1"
                textAlign="center"
                color="text.secondary"
                mb={4}
            >
                Browse curated study materials by tutors
            </Typography>

            {/* GRID OF RESOURCE CARDS */}
            <Grid container spacing={3}>
                {resources.map((item) => (
                    <Grid item xs={12} sm={6} key={item.id}>
                        <Card
                            sx={{
                                borderRadius: 3,
                                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                                transition: "0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
                                },
                                height: "100%",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Chip
                                    label={item.subject}
                                    color={getColor(item.subject)}
                                    sx={{ mb: 2 }}
                                />

                                <Typography variant="h6" fontWeight={600}>
                                    {item.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    mt={1}
                                    mb={2}
                                >
                                    {item.description}
                                </Typography>

                                <Button
                                    variant="contained"
                                    fullWidth
                                    sx={{ borderRadius: 2, mt: "auto" }}
                                    onClick={() => window.open(item.link, "_blank")}
                                >
                                    Open Resource
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Button
                fullWidth
                variant="outlined"
                sx={{
                    mt: 5,
                    borderRadius: 2,
                    py: 1.2,
                }}
                onClick={() => navigate(-1)}
            >
                Back
            </Button>
        </Container>
    );
}

export default ResourcesPage;
