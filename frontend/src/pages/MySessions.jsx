import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI
import {
    Box,
    Container,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Grid,
} from "@mui/material";

function MySessions() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    const [sessions, setSessions] = useState([]);
    const [tutors, setTutors] = useState([]);

    /* ---------------- LOAD DATA ---------------- */
    useEffect(() => {
        fetch(`http://localhost:3001/sessions?studentId=${user.id}`)
            .then(res => res.json())
            .then(data => setSessions(data));

        fetch(`http://localhost:3001/users?role=tutor`)
            .then(res => res.json())
            .then(data => setTutors(data));
    }, []);

    const getTutorName = (id) => {
        const t = tutors.find(t => t.id === id);
        return t ? t.name : "Unknown Tutor";
    };

    /* ---------------- ACTIONS ---------------- */
    const cancelSession = async (session) => {
        const updated = { ...session, status: "CANCELLED" };

        await fetch(`http://localhost:3001/sessions/${session.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setSessions(sessions.map(s => (s.id === session.id ? updated : s)));
    };

    const rescheduleSession = async (session) => {
        const updated = { ...session, status: "RESCHEDULED" };

        await fetch(`http://localhost:3001/sessions/${session.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated),
        });

        setSessions(sessions.map(s => (s.id === session.id ? updated : s)));
    };

    /* ---------------- STATUS COLORS ---------------- */
    const statusColor = {
        PENDING: "secondary",
        SCHEDULED: "primary",
        RESCHEDULED: "warning",
        COMPLETED: "success",
        CANCELLED: "error",
    };

    /* ---------------- UI ---------------- */
    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: "100vh",
                pt: 6,
                pb: 6,
            }}
        >
            <Typography variant="h4" fontWeight={700} textAlign="center" mb={3}>
                My Sessions
            </Typography>

            {sessions.length === 0 ? (
                <Typography textAlign="center" color="text.secondary">
                    No sessions booked yet.
                </Typography>
            ) : (
                <Grid container spacing={2}>
                    {sessions.map((session) => (
                        <Grid item xs={12} key={session.id}>
                            <Card
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 4px 14px rgba(0,0,0,0.1)",
                                }}
                            >
                                <CardContent>
                                    <Typography variant="h6" fontWeight={600}>
                                        {session.subject}
                                    </Typography>

                                    <Typography variant="body2" color="text.secondary">
                                        Tutor: {getTutorName(session.tutorId)}
                                    </Typography>

                                    <Box sx={{ mt: 1 }}>
                                        <Chip
                                            label={session.status}
                                            color={statusColor[session.status] || "default"}
                                            sx={{ fontWeight: 600 }}
                                        />
                                    </Box>

                                    <Typography sx={{ mt: 1 }}>
                                        <strong>Start:</strong> {session.startTime}
                                    </Typography>

                                    <Typography>
                                        <strong>End:</strong> {session.endTime}
                                    </Typography>

                                    {/* BUTTONS */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1.5,
                                            mt: 2,
                                        }}
                                    >
                                        {/* Cancel */}
                                        {session.status !== "CANCELLED" &&
                                            session.status !== "COMPLETED" && (
                                                <Button
                                                    variant="contained"
                                                    color="error"
                                                    fullWidth
                                                    onClick={() => cancelSession(session)}
                                                >
                                                    Cancel
                                                </Button>
                                            )}

                                        {/* Reschedule */}
                                        {session.status !== "CANCELLED" &&
                                            session.status !== "COMPLETED" && (
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    fullWidth
                                                    onClick={() => rescheduleSession(session)}
                                                >
                                                    Reschedule
                                                </Button>
                                            )}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}

            <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 4, py: 1.2, borderRadius: 2 }}
                onClick={() => navigate("/student")}
            >
                Back to Dashboard
            </Button>
        </Container>
    );
}

export default MySessions;
