import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Material UI
import {
    Box,
    Card,
    CardContent,
    TextField,
    Typography,
    MenuItem,
    Button,
    Paper,
    Divider,
    Chip,
    IconButton
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

function TutorAvailability() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [slots, setSlots] = useState([]);
    const [form, setForm] = useState({
        start: "",
        end: "",
        type: "online",
        subject: "",
        note: ""
    });

    /* ------------ LOAD SLOTS ------------ */
    useEffect(() => {
        fetch(`http://localhost:3001/availability?tutorId=${user.id}`)
            .then(res => res.json())
            .then(data => setSlots(data));
    }, []);

    /* ------------ HANDLE CHANGE ------------ */
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    /* ------------ ADD SLOT ------------ */
    const handleAdd = async (e) => {
        e.preventDefault();

        const newSlot = {
            tutorId: user.id,
            slotId: "slot_" + Date.now(),
            start: form.start,
            end: form.end,
            type: form.type,
            subject: form.subject,
            note: form.note
        };

        const res = await fetch("http://localhost:3001/availability", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSlot)
        });

        const saved = await res.json();
        setSlots([...slots, saved]);

        setForm({
            start: "",
            end: "",
            type: "online",
            subject: "",
            note: ""
        });
    };

    /* ------------ DELETE SLOT ------------ */
    const handleDelete = async (id) => {
        await fetch(`http://localhost:3001/availability/${id}`, {
            method: "DELETE"
        });

        setSlots(slots.filter((slot) => slot.id !== id));
    };

    /* ------------ UI ------------ */

    return (
        <Box sx={styles.page}>
            <Card sx={styles.card}>
                <Typography variant="h5" fontWeight={700} textAlign="center" mb={2}>
                    Manage Availability
                </Typography>

                {/* ADD SLOT FORM */}
                <Paper elevation={3} sx={styles.formContainer}>
                    <Typography variant="subtitle1" fontWeight={600} mb={2}>
                        Add New Time Slot
                    </Typography>

                    <form onSubmit={handleAdd}>
                        <Box sx={styles.formGrid}>
                            <TextField
                                label="Start Time"
                                type="datetime-local"
                                name="start"
                                value={form.start}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />

                            <TextField
                                label="End Time"
                                type="datetime-local"
                                name="end"
                                value={form.end}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                required
                            />

                            <TextField
                                select
                                label="Type"
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                                fullWidth
                            >
                                <MenuItem value="online">Online</MenuItem>
                                <MenuItem value="offline">Offline</MenuItem>
                            </TextField>

                            <TextField
                                select
                                label="Subject"
                                name="subject"
                                fullWidth
                                required
                                value={form.subject}
                                onChange={handleChange}
                            >
                                <MenuItem value="">-- Select Subject --</MenuItem>
                                {user.subjects?.map((sub, idx) => (
                                    <MenuItem key={idx} value={sub}>
                                        {sub}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Note (optional)"
                                name="note"
                                value={form.note}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            sx={{ mt: 2, borderRadius: 2 }}
                        >
                            Add Slot
                        </Button>
                    </form>
                </Paper>

                <Divider sx={{ my: 3 }} />

                {/* SLOT LIST */}
                <Typography variant="h6" fontWeight={600} mb={1}>
                    Your Availability Slots
                </Typography>

                {slots.length === 0 && (
                    <Typography color="text.secondary">
                        No availability added yet.
                    </Typography>
                )}

                {slots.map((slot) => (
                    <Paper key={slot.id} elevation={2} sx={styles.slotCard}>
                        <CardContent>
                            <Typography variant="subtitle1" fontWeight={700}>
                                {slot.subject}
                            </Typography>

                            <Box sx={{ display: "flex", gap: 1, my: 1 }}>
                                <Chip
                                    label={slot.type}
                                    color={slot.type === "online" ? "primary" : "secondary"}
                                />
                            </Box>

                            <Typography>
                                <strong>Start:</strong> {slot.start}
                            </Typography>
                            <Typography>
                                <strong>End:</strong> {slot.end}
                            </Typography>
                            {slot.note && (
                                <Typography sx={{ mt: 1 }}>
                                    <strong>Note:</strong> {slot.note}
                                </Typography>
                            )}

                            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(slot.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </CardContent>
                    </Paper>
                ))}

                <Button
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 3, borderRadius: 2 }}
                    onClick={() => navigate("/tutor")}
                >
                    Back to Dashboard
                </Button>
            </Card>
        </Box>
    );
}

/* ------------ STYLE ------------ */

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
        borderRadius: "16px",
        boxShadow: "0 6px 22px rgba(0,0,0,0.10)",
        background: "white"
    },

    formContainer: {
        padding: "20px",
        borderRadius: 3,
        mb: 2
    },

    formGrid: {
        display: "grid",
        gridTemplateColumns: "1fr",
        gap: 2
    },

    slotCard: {
        mb: 2,
        padding: "12px",
        borderRadius: "12px"
    }
};

export default TutorAvailability;
