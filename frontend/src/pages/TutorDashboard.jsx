import React from "react";
import { useNavigate } from "react-router-dom";

function TutorDashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "tutor") {
        return <p>Unauthorized. Please login again.</p>;
    }

    return (
        <div style={styles.page}>
            <div style={styles.container}>
                <div style={styles.card}>
                    <h2 style={styles.title}>Welcome, {user.name} 👋</h2>
                    <p style={styles.subtitle}>Tutor Dashboard</p>

                    <div style={styles.menu}>
                        <button
                            style={styles.button}
                            onClick={() => navigate("/add-resource")}
                        >
                            Add Learning Resource
                        </button>

                        <button
                            style={styles.button}
                            onClick={() => navigate("/availability")}
                        >
                            Manage Availability
                        </button>

                        <button
                            style={styles.button}
                            onClick={() => navigate("/tutor-sessions")}
                        >
                            View Sessions
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* 🌟 UPDATED MATERIAL UI STYLE (NO TRÀN, NO NAV DUPLICATE) */
const styles = {
    page: {
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        paddingTop: "40px",
        overflowX: "hidden",
        width: "100%",
        fontFamily: "Roboto, sans-serif",
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
        fontSize: "14px",
        fontWeight: "500",
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

export default TutorDashboard;
