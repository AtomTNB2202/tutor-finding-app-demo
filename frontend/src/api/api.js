const API = "http://localhost:3001";

export const login = async (email) => {
    const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
};
