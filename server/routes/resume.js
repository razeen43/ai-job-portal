const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const upload = multer({
    dest: "uploads/"
});

router.post(
    "/analyze-resume",
    upload.single("resume"),
    async (req, res) => {

        try {

            const pdfBuffer = fs.readFileSync(req.file.path);

            const data = await pdfParse(pdfBuffer);

            const text = data.text.toLowerCase();

            const skills = [
                "react",
                "node.js",
                "javascript",
                "python",
                "sql",
                "html",
                "css"
            ];

            let matchedSkills = [];
            let missingSkills = [];

            skills.forEach((skill) => {

                if (text.includes(skill)) {
                    matchedSkills.push(skill);
                } else {
                    missingSkills.push(skill);
                }

            });

            const matchScore = Math.round(
                (matchedSkills.length / skills.length) * 100
            );

            // Recommended Jobs
            let recommendations = [];

            if (matchedSkills.includes("react")) {
                recommendations.push("Frontend Developer");
            }

            if (matchedSkills.includes("node.js")) {
                recommendations.push("Backend Developer");
            }

            if (matchedSkills.includes("python")) {
                recommendations.push("Data Analyst");
            }

            if (
                matchedSkills.includes("react") &&
                matchedSkills.includes("node.js")
            ) {
                recommendations.push("Full Stack Developer");
            }

            console.log({
                matchScore,
                matchedSkills,
                missingSkills,
                recommendations
            });

            res.json({
                matchScore,
                matchedSkills,
                missingSkills,
                recommendations
            });

        } catch (error) {

            console.error(error);

            res.status(500).json({
                error: error.message
            });

        }

    }
);

module.exports = router;