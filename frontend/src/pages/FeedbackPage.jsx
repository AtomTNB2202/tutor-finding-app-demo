import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Material UI
import {
    Container,
    Paper,
    Typography,
    Box,
    TextField,
    MenuItem,
    Button,
    Snackbar,
    Alert,
    Rating,
} from "@mui/material";

function FeedbackPage() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [sessions, setSessions] = useState([]);
    const [tutors, setTutors] = useState([]);

    const [selectedSession, setSelectedSession] = useState("");
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");

    const [success, setSuccess] = useState(false);

    /* ------------------ LOAD DATA ------------------ */
    useEffect(() => {
        fetch(`http://localhost:3001/sessions?studentId=${user.id}`)
            .then(res => res.json())
            .then(data =>
                setSessions(data.filter(s => s.status === "COMPLETED"))
            );

        fetch(`http://localhost:3001/users?role=tutor`)
            .then(res => res.json())
            .then(data => setTutors(data));
    }, []);

    const getTutorName = (id) => {
        const t = tutors.find(t => t.id === id);
        return t ? t.name : "Unknown Tutor";
    };

    /* ------------------ SUBMIT ------------------ */
    const handleSubmit = async (e) => {
        e.preventDefault();

        const session = sessions.find(s => s.id === Number(selectedSession));

        const feedbackData = {
            sessionId: session.id,
            studentId: user.id,
            tutorId: session.tutorId || session.tutorID,
            rating,
            comment,
        };

        await fetch("http://localhost:3001/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(feedbackData),
        });

        setSuccess(true);

        setTimeout(() => navigate("/student"), 1200);
    };

    /* ------------------ UI ------------------ */

    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingTop: "50px"
            }}
        >
            <Paper elevation={4} sx={{ p: 4, borderRadius: 3, width: "100%" }}>
                <Typography
                    variant="h5"
                    fontWeight={700}
                    textAlign="center"
                    mb={3}
                >
                    Submit Feedback
                </Typography>

                {sessions.length === 0 && (
                    <Typography textAlign="center" color="text.secondary">
                        You have no completed sessions to review.
                    </Typography>
                )}

                {sessions.length > 0 && (
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        {/* Select Session */}
                        <TextField
                            select
                            label="Select Completed Session"
                            value={selectedSession}
                            onChange={(e) => setSelectedSession(e.target.value)}
                            required
                            fullWidth
                        >
                            <MenuItem value="">-- Choose a session --</MenuItem>
                            {sessions.map((s) => (
                                <MenuItem key={s.id} value={s.id}>
                                    {getTutorName(s.tutorId || s.tutorID)} — {s.subject}
                                </MenuItem>
                            ))}
                        </TextField>

                        {/* Rating */}
                        <Box>
                            <Typography variant="subtitle1" fontWeight={600}>
                                Rating:
                            </Typography>
                            <Rating
                                value={rating}
                                onChange={(e, newVal) => setRating(newVal)}
                                size="large"
                            />
                        </Box>

                        {/* Comment */}
                        <TextField
                            label="Comment"
                            placeholder="Write your feedback..."
                            multiline
                            minRows={3}
                            value={comment}
                            required
                            onChange={(e) => setComment(e.target.value)}
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            fullWidth
                            sx={{ borderRadius: 2 }}
                        >
                            Submit Feedback
                        </Button>

                        <Button
                            variant="outlined"
                            fullWidth
                            sx={{ borderRadius: 2 }}
                            onClick={() => navigate("/student")}
                        >
                            Back
                        </Button>
                    </Box>
                )}

                <Snackbar
                    open={success}
                    autoHideDuration={1500}
                    onClose={() => setSuccess(false)}
                >
                    <Alert severity="success" variant="filled">
                        Feedback submitted successfully!
                    </Alert>
                </Snackbar>
            </Paper>
        </Container>
    );
}

export default FeedbackPage;
