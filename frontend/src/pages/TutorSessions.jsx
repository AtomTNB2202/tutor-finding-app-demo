import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// MUI Components
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Divider
} from "@mui/material";

function TutorSessions() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
    if (!user) {
        navigate("/");
    }
    }, []);

    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [modalSession, setModalSession] = useState(null); // selected session

    /* ------------ FETCH DATA ------------- */
    useEffect(() => {
    if (!user) return;  // tránh crash

    fetch(`http://localhost:3001/sessions?tutorId=${user.id}`)
        .then(res => res.json())
        .then(data => setSessions(data));

    fetch(`http://localhost:3001/users?role=student`)
        .then(res => res.json())
        .then(data => setStudents(data));

    fetch(`http://localhost:3001/availability?tutorId=${user.id}`)
        .then(res => res.json())
        .then(data => setAvailability(data));
    }, [user]);

    const getStudentName = (id) => {
        const stu = students.find(s => s.id === id);
        return stu ? stu.name : "Unknown Student";
    };

    /* ------------ ACTIONS ------------- */

    const cancelSession = async (session) => {
        const updated = { ...session, status: "CANCELLED" };

        await fetch(`http://localhost:3001/sessions/${session.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        });

        setSessions(sessions.map(s => (s.id === session.id ? updated : s)));
    };

    const completeSession = async (session) => {
        const updated = { ...session, status: "COMPLETED" };

        await fetch(`http://localhost:3001/sessions/${session.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        });

        setSessions(sessions.map(s => (s.id === session.id ? updated : s)));
    };

    const applyReschedule = async (slot) => {
        const updated = {
            ...modalSession,
            startTime: slot.start,
            endTime: slot.end,
            status: "RESCHEDULED"
        };

        await fetch(`http://localhost:3001/sessions/${modalSession.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updated)
        });

        setSessions(sessions.map(s => (s.id === modalSession.id ? updated : s)));
        setModalSession(null);
    };

    /* ------------ STATUS COLORS ------------- */

    const statusColor = {
        SCHEDULED: "primary",
        COMPLETED: "success",
        CANCELLED: "error",
        RESCHEDULED: "warning",
        PENDING: "secondary"
    };

    return (
        <Box sx={styles.page}>
            <Card sx={styles.card}>
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
                    Tutor Sessions
                </Typography>

                {sessions.length === 0 && (
                    <Typography textAlign="center" color="text.secondary">
                        No sessions found.
                    </Typography>
                )}

                {sessions.map((session) => (
                    <Card key={session.id} sx={styles.sessionCard}>
                        <CardContent>
                            <Typography>
                                <strong>Student:</strong> {getStudentName(session.studentId)}
                            </Typography>
                            <Typography>
                                <strong>Subject:</strong> {session.subject}
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                <strong>Status:</strong>{" "}
                                <Chip
                                    label={session.status}
                                    color={statusColor[session.status] || "default"}
                                />
                            </Typography>

                            <Typography sx={{ mt: 1 }}>
                                <strong>Start:</strong> {session.startTime}
                            </Typography>
                            <Typography>
                                <strong>End:</strong> {session.endTime}
                            </Typography>

                            <Box sx={styles.actions}>
                                {session.status !== "CANCELLED" && (
                                    <Button
                                        variant="contained"
                                        color="error"
                                        fullWidth
                                        onClick={() => cancelSession(session)}
                                    >
                                        Cancel
                                    </Button>
                                )}

                                {session.status !== "COMPLETED" && (
                                    <Button
                                        variant="contained"
                                        color="success"
                                        fullWidth
                                        onClick={() => completeSession(session)}
                                    >
                                        Complete
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="info"
                                    fullWidth
                                    onClick={() => setModalSession(session)}
                                >
                                    Reschedule
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                ))}

                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3 }}
                    onClick={() => navigate("/tutor")}
                >
                    Back to Dashboard
                </Button>
            </Card>

            {/* ------------ MUI MODAL (RESCHEDULE) ------------ */}
            <Dialog open={!!modalSession} onClose={() => setModalSession(null)} fullWidth>
                <DialogTitle>Select New Time Slot</DialogTitle>

                <DialogContent dividers>
                    {availability.length === 0 && (
                        <Typography>No available slots.</Typography>
                    )}

                    {availability.map((slot) => (
                        <Card key={slot.id} sx={styles.slotCard}>
                            <CardContent>
                                <Typography fontWeight={600}>
                                    {slot.subject} ({slot.type})
                                </Typography>

                                <Typography>Start: {slot.start}</Typography>
                                <Typography>End: {slot.end}</Typography>

                                <Button
                                    variant="contained"
                                    sx={{ mt: 1 }}
                                    onClick={() => applyReschedule(slot)}
                                >
                                    Choose This Slot
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => setModalSession(null)}>Close</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        paddingTop: "40px",
        backgroundColor: "#F5F5F5",
        display: "flex",
        justifyContent: "center",
        overflowX: "hidden"
    },

    card: {
        width: "520px",
        padding: "24px",
        borderRadius: "14px",
        boxShadow: "0 6px 22px rgba(0,0,0,0.10)",
        background: "white"
    },

    sessionCard: {
        mb: 2,
        boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
        borderRadius: "10px"
    },

    actions: {
        display: "flex",
        gap: "10px",
        mt: 2
    },

    slotCard: {
        mb: 2,
        borderRadius: "10px",
        boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
    }
};

export default TutorSessions;
