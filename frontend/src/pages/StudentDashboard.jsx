import React from "react";
import { useNavigate } from "react-router-dom";

function StudentDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return <p>Unauthorized. Please login again.</p>;

    return (
        <div style={styles.page}>
            {/* MAIN CARD */}
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Welcome, {user.name} 👋</h2>
                    <p style={styles.subtitle}>What would you like to do today?</p>

                    {/* MENU BUTTONS */}
                    <div style={styles.menu}>
                        <button style={styles.button} onClick={() => navigate("/register")}>
                            Registration Form
                        </button>

                        <button style={styles.button} onClick={() => navigate("/matching")}>
                            Find Tutors (Matching)
                        </button>

                        <button style={styles.button} onClick={() => navigate("/sessions")}>
                            My Sessions
                        </button>

                        <button style={styles.button} onClick={() => navigate("/resources")}>
                            Learning Resources
                        </button>

                        <button style={styles.button} onClick={() => navigate("/feedback")}>
                            Feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* MATERIAL UI STYLE (ĐÃ FIX TRÀN + TỐI ƯU) */
const styles = {
    page: {
        minHeight: "100vh",
        background: "#F5F5F5",
        fontFamily: "Roboto, sans-serif",
        overflowX: "hidden",       // 🔥 ngăn tràn ngang
        width: "100%",             // 🔥 sửa từ 100vw → 100%
        paddingTop: "40px",        // 🔥 đảm bảo không dính vào AppBar global
    },

    container: {
        display: "flex",
        justifyContent: "center",
        marginTop: "40px",
        padding: "0 16px",
    },

    card: {
        width: "460px",
        background: "white",
        padding: "32px",
        borderRadius: "16px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
        textAlign: "center",
    },

    title: {
        fontSize: "26px",
        fontWeight: "700",
        marginBottom: "6px",
        color: "#1E1E1E",
    },

    subtitle: {
        color: "#5F6368",
        marginBottom: "28px",
    },

    menu: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
    },

    button: {
        padding: "14px",
        background: "#1976D2",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "600",
        cursor: "pointer",
        transition: "0.2s",
        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
    },
};

export default StudentDashboard;
