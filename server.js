const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./db');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/booking');
const adminRoutes = require('./routes/admin');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

app.use('/auth', authRoutes);
app.use('/booking', bookingRoutes);
app.use('/admin', adminRoutes);

//admin
const bcrypt = require('bcrypt');

const adminPassword = 'admin123'; 
const saltRounds = 10;

bcrypt.hash(adminPassword, saltRounds, (err, hash) => {
    if (err) throw err;
    const sql = "INSERT INTO user (username, password, role) VALUES (?, ?, ?)";
    db.query(sql, ['admin', hash, 'admin'], (error, result) => {
        if (error) throw error;
        console.log("Admin user inserted successfully!");
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
