const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fs = require("fs");

server.use(middlewares);
server.use(jsonServer.bodyParser);

// -------------------------------
//         AUTH LOGIN
// -------------------------------
server.post("/auth/login", (req, res) => {
    const users = router.db.get("users").value();
    const user = users.find(u => u.email === req.body.email);

    if (!user) return res.status(401).json({ message: "User not found" });

    return res.json({
        message: "Login success",
        user
    });
});

// -------------------------------
//         CREATE SESSION
// -------------------------------
server.post("/sessions", (req, res) => {
    const body = req.body;
    body.sessionID = "ss_" + Date.now();
    body.status = "SCHEDULED";

    router.db.get("sessions").push(body).write();
    res.json(body);
});

// -------------------------------
//       RESCHEDULE SESSION
// -------------------------------
server.patch("/sessions/:id/reschedule", (req, res) => {
    const { newSlot } = req.body;
    const session = router.db.get("sessions").find({ sessionID: req.params.id });

    if (!session.value()) return res.status(404).send("Not found");

    session.assign({
        startTime: newSlot.start,
        endTime: newSlot.end,
        status: "RESCHEDULED"
    }).write();

    res.json(session.value());
});

// -------------------------------
//         CANCEL SESSION
// -------------------------------
server.patch("/sessions/:id/cancel", (req, res) => {
    const session = router.db.get("sessions").find({ sessionID: req.params.id });

    if (!session.value()) return res.status(404).send("Not found");

    session.assign({ status: "CANCELED" }).write();
    res.json(session.value());
});

// -------------------------------
//         SUBMIT FEEDBACK
// -------------------------------
server.post("/feedbacks", (req, res) => {
    const fb = { ...req.body, id: Date.now() };
    router.db.get("feedbacks").push(fb).write();
    res.json(fb);
});

// -------------------------------
//     DEFAULT JSON SERVER ROUTER
// -------------------------------
server.use("/", router);

server.listen(3001, () => {
    console.log("JSON Server running on http://localhost:3001");
});
