
const express = require('express');
const router = express.Router();
const db = require('../db');

// Book a domain
router.post('/book', (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });

    const { domain_name } = req.body;
    const user_id = req.session.user.id; // Get user ID from session

    db.query('INSERT INTO bookings (user_id, domain_name,status) VALUES (?, ?,"pending")', [user_id, domain_name], (err) => {
        if (err) return res.status(500).json({ message: 'Error booking domain' });
        res.status(200).json({ message: 'Domain booked successfully' });
    });
});

// Get user bookings
router.get('/user-bookings', (req, res) => {
    if (!req.session.user) return res.status(401).json({ message: 'Unauthorized' });

    const user_id = req.session.user.id;
    db.query('SELECT * FROM bookings WHERE user_id = ?', [user_id], (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching bookings' });
        res.json(results);
    });
});

module.exports = router;

