// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS for the React frontend
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to match your React app's URL
  methods: ['GET', 'POST'],
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Mock user data
const users = [
  { id: 1, email: 'khaled@gmail.com', password: '1234' },
  { id: 2, email: 'ilnar@gmail.com', password: '1234' },
];

// POST route for login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
