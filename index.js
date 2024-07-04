const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Login endpoint
app.post('/login', (req, res) => {
    // Extract username and password from request body
    const usr = req.body.username;
    const pwd = req.body.password;

    // Validate the credentials
    if (usr === 'zama' && pwd === 'abcdef') {
        // Create a JWT payload
        const payload = {
            'name': usr,
            'admin': false
        };

        // Sign the token with a secret key
        const token = jwt.sign(
            JSON.stringify(payload),
            'jwt-secret',
            {
                algorithm: 'HS256'
            }
        );

        // Send the token as response
        res.send({
            'token': token
        });
    } else {
        // Invalid credentials
        res.status(403).send({ 'err': 'Invalid username or password' });
    }
});

// Resource endpoint
app.get('/resource', (req, res) => {
    // Extract the token from the Authorization header
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'jwt-secret');
        // Send a response with a message containing the username
        res.send({
            'msg': `Hello, ${decoded.name}! Your JSON Web Token has been verified.`
        });
    } catch (err) {
        // Invalid token
        res.status(401).send({
            'err': 'Bad JWT!'
        });
    }
});

// Admin resource endpoint
app.get('/admin_resource', (req, res) => {
    // Extract the token from the Authorization header
    const token = req.headers['authorization'].split(' ')[1];

    try {
        // Verify the token
        const decoded = jwt.verify(token, 'jwt-secret');
        // Check if the user is an admin
        if (decoded.admin) {
            // User is an admin
            res.send({
                'msg': 'Success!'
            });
        } else {
            // User is not an admin
            res.status(403).send({
                'msg': 'Your JWT was verified, but you are not an admin.'
            });
        }
    } catch (e) {
        // Invalid token
        res.sendStatus(401);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
