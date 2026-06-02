const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

/*
====================================
REGISTER
POST /api/auth/register
====================================
*/
router.post("/register", async (req, res) => {

    try {

        const { name, email, password, role } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
            "INSERT INTO users(name,email,password,role) VALUES(?,?,?,?)",
            [name, email, hashedPassword, role],
            (err, result) => {

                if (err) {
                    return res.status(500).json({
                        error: err.message
                    });
                }

                res.json({
                    message: "User Registered Successfully"
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

/*
====================================
LOGIN
POST /api/auth/login
====================================
*/
router.post("/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.length === 0) {

                return res.status(400).json({
                    message: "User Not Found"
                });

            }

            const user = result[0];

            const isMatch = await bcrypt.compare(
                password,
                user.password
            );

            if (!isMatch) {

                return res.status(400).json({
                    message: "Invalid Password"
                });

            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                "SECRET_KEY",
                {
                    expiresIn: "1d"
                }
            );

            res.json({
                message: "Login Successful",
                token,
                role: user.role,
                userId: user.id,
                name: user.name
            });

        }
    );

});

module.exports = router;