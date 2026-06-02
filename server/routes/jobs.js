const express = require("express");
const router = express.Router();
const db = require("../db");

/*
====================================
GET ALL JOBS / SEARCH JOBS
GET /api/jobs
GET /api/jobs?skill=React
====================================
*/
router.get("/jobs", (req, res) => {
    const skill = req.query.skill;

    let query = "SELECT * FROM jobs";
    let values = [];

    if (skill) {
        query += " WHERE skill LIKE ?";
        values.push(`%${skill}%`);
    }

    db.query(query, values, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});

/*
====================================
ADD JOB
POST /api/jobs
====================================
*/
router.post("/jobs", (req, res) => {
    const { title, company, location, salary, skill } = req.body;

    db.query(
        "INSERT INTO jobs(title, company, location, salary, skill) VALUES (?, ?, ?, ?, ?)",
        [title, company, location, salary, skill],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json({
                message: "Job Added Successfully",
                jobId: result.insertId
            });
        }
    );
});

/*
====================================
APPLY FOR JOB
POST /api/apply
====================================
*/
router.post("/apply", (req, res) => {
    const { user_id, job_id } = req.body;

    db.query(
        "INSERT INTO applications(user_id, job_id, status) VALUES (?, ?, ?)",
        [user_id, job_id, "Applied"],
        (err, result) => {
           if (err) {
              console.log("JOBS API ERROR:", err);
              return res.status(500).json({
                 error: err.message || JSON.stringify(err)
    });
}

            res.json({
                message: "Application Submitted Successfully",
                applicationId: result.insertId
            });
        }
    );
});

/*
====================================
GET APPLICATIONS BY USER
GET /api/applications/:user_id
====================================
*/
router.get("/applications/:user_id", (req, res) => {
    const user_id = req.params.user_id;

    const query = `
        SELECT 
            applications.application_id AS id,
            jobs.title,
            jobs.company,
            jobs.location,
            jobs.salary,
            jobs.skill,
            applications.status
        FROM applications
        JOIN jobs ON applications.job_id = jobs.job_id
        WHERE applications.user_id = ?
    `;

    db.query(query, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result);
    });
});

/*
====================================
GLOBAL DASHBOARD ANALYTICS
GET /api/dashboard
====================================
*/
router.get("/dashboard", (req, res) => {
    const query = `
        SELECT
        (SELECT COUNT(*) FROM jobs) AS totalJobs,
        (SELECT COUNT(*) FROM applications) AS totalApplications,
        (SELECT COUNT(*) FROM applications WHERE status='Applied') AS applied,
        (SELECT COUNT(*) FROM applications WHERE status='Accepted') AS accepted,
        (SELECT COUNT(*) FROM applications WHERE status='Rejected') AS rejected
    `;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(result[0]);
    });
});

/*
====================================
USER-SPECIFIC DASHBOARD ANALYTICS
GET /api/dashboard/:user_id
====================================
*/
router.get("/dashboard/:user_id", (req, res) => {
    const user_id = req.params.user_id;

    const query = `
        SELECT
        (SELECT COUNT(*) FROM jobs) AS totalJobs,
        (SELECT COUNT(*) FROM applications WHERE user_id = ?) AS totalApplications,
        (SELECT COUNT(*) FROM applications WHERE user_id = ? AND status='Applied') AS applied,
        (SELECT COUNT(*) FROM applications WHERE user_id = ? AND status='Accepted') AS accepted,
        (SELECT COUNT(*) FROM applications WHERE user_id = ? AND status='Rejected') AS rejected
    `;

    db.query(
        query,
        [user_id, user_id, user_id, user_id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            res.json(result[0]);
        }
    );
});

module.exports = router;