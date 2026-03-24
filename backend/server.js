const express = require('express');
const app = express();

// Middleware (IMPORTANT)
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('AiReviewer Backend Running');
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});