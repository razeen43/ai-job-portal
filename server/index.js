const express = require("express");
const cors = require("cors");

require("./db");

const authRoutes = require("./routes/auth");
const jobRoutes = require("./routes/jobs");
const resumeRoutes = require("./routes/resume");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", jobRoutes);
app.use("/api", resumeRoutes);

app.get("/", (req, res) => {
    res.send("Job Portal API Running");
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});