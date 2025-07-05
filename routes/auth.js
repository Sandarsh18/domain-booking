const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');

// User registration
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) return res.status(500).send('Error hashing password');
        db.query('INSERT INTO user (username, password, role) VALUES (?, ?, ?)', [username, hash, 'user'], (err) => {
            if (err) return res.status(500).send('Error registering user');
            res.redirect('/');
        });
    });
});

// User login
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM user WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) return res.status(400).send('Invalid credentials');
        bcrypt.compare(password, results[0].password, (err, match) => {
            if (!match) return res.status(400).send('Invalid credentials');
            req.session.user = results[0];
            res.redirect(results[0].role === 'admin' ? '/dashboard.html' : '/user-dashboard.html');
        });
    });
});

module.exports = router;  // ✅ Ensure proper export


