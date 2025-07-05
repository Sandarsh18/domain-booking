/*const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/bookings', (req, res) => {
    db.query('SELECT * FROM bookings', (err, results) => {
        if (err) return res.status(500).send('Error fetching bookings');
        res.json(results);
    });
});

router.post('/approve', (req, res) => {
    const { id } = req.body;
    db.query('UPDATE bookings SET status = "approved" WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send('Error updating booking');
        res.redirect('/dashboard.html');
    });
});

router.post('/reject', (req, res) => {
    const { id } = req.body;
    db.query('UPDATE bookings SET status = "rejected" WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send('Error updating booking');
        res.redirect('/dashboard.html');
    });
});

module.exports = router;  // ✅ Ensure proper export
*/
const express = require('express');
const router = express.Router();
const db = require('../db');

// ✅ Fetch bookings with usernames
router.get('/bookings', (req, res) => {
    db.query(`
        SELECT bookings.id, bookings.domain_name, bookings.booking_date, bookings.status, user.username 
        FROM bookings 
        JOIN user ON bookings.user_id = user.id
    `, (err, results) => {
        if (err) return res.status(500).json({ error: 'Error fetching bookings' });
        res.json(results);
    });
});

// ✅ Approve booking (Use PUT & req.params)
router.put('/approve/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE bookings SET status = "approved" WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Error updating booking' });
        res.json({ success: true });
    });
});

// ✅ Reject booking (Use PUT & req.params)
router.delete('/reject/:id', (req, res) => {
    const { id } = req.params;
    db.query('UPDATE bookings SET status = "rejected" WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ error: 'Error updating booking' });
        res.json({ success: true });
    });
});

module.exports = router;


