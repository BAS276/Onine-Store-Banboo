const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/send-email', async (req, res) => {
    const { to, subject, text } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        };

       const info = await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "E-mail envoyé avec succès !"  , info});

    } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error);
        res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail." });
    }
});

module.exports = router;
