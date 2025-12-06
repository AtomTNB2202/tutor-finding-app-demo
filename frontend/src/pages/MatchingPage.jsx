import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
    Box,
    Card,
    CardContent,
    Typography,
    TextField,
    MenuItem,
    Button,
    CircularProgress,
    CardActions,
    Divider,
} from "@mui/material";

function MatchingPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState("");
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Lấy form đăng ký -> preferredSubjects
        fetch(`http://localhost:3001/registrationForms?studentId=${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setSubjects(data[0].preferredSubjects || []);
                }
            });

        // Lấy danh sách tutor
        fetch("http://localhost:3001/users?role=tutor")
            .then(res => res.json())
            .then(data => setTutors(data));
    }, []);

    const handleBook = async (tutor) => {
        setLoading(true);

        const sessionData = {
            studentId: user.id,
            tutorId: tutor.id,
            subject: selectedSubject,
            startTime: "To be scheduled",
            endTime: "To be scheduled",
            status: "PENDING"
        };

        const res = await fetch("http://localhost:3001/sessions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sessionData),
        });

        if (res.ok) {
            alert("Booked successfully! Redirecting...");
            navigate("/sessions");
        }

        setLoading(false);
    };

    const filteredTutors = tutors.filter(
        t => t.subjects && t.subjects.includes(selectedSubject)
    );

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                bgcolor: "#F5F7FA",
                px: 2
            }}
        >
            <Card sx={{ width: 480, p: 2, borderRadius: 3, boxShadow: 4 }}>
                <CardContent>
                    <Typography variant="h5" fontWeight="700" textAlign="center" mb={1}>
                        Find a Tutor
                    </Typography>
                    <Typography variant="body2" textAlign="center" color="text.secondary" mb={3}>
                        Select a subject to see available tutors
                    </Typography>

                    {/* Select Subject */}
                    <TextField
                        fullWidth
                        select
                        label="Select subject"
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        sx={{ mb: 3 }}
                    >
                        <MenuItem value="">-- Select Subject --</MenuItem>
                        {subjects.map((subj, idx) => (
                            <MenuItem key={idx} value={subj}>
                                {subj}
                            </MenuItem>
                        ))}
                    </TextField>

                    {/* Tutor list */}
                    {selectedSubject && (
                        <Box>
                            <Typography variant="subtitle1" fontWeight="600" mb={1}>
                                Tutors for: {selectedSubject}
                            </Typography>

                            <Divider sx={{ mb: 2 }} />

                            {filteredTutors.length === 0 && (
                                <Typography color="text.secondary">
                                    No tutors available for this subject.
                                </Typography>
                            )}

                            {filteredTutors.map((tutor) => (
                                <Card
                                    key={tutor.id}
                                    sx={{ my: 1, p: 1.5, borderRadius: 2, boxShadow: 2 }}
                                >
                                    <CardContent sx={{ pb: 0 }}>
                                        <Typography variant="h6" fontWeight="600">
                                            {tutor.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            Expert in {selectedSubject}
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            disabled={loading}
                                            onClick={() => handleBook(tutor)}
                                            sx={{ borderRadius: 2 }}
                                        >
                                            {loading ? <CircularProgress size={22} /> : "Book Session"}
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Box>
                    )}

                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{ mt: 3, borderRadius: 2 }}
                        onClick={() => navigate("/student")}
                    >
                        Back to Dashboard
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default MatchingPage;
