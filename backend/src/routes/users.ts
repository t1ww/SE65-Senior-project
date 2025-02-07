import { Router } from "express";
import pool from "../database";
import bcrypt from "bcrypt";
import { Interface } from "readline";

const router = Router();

// Get all users
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Add a new user
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    res.status(201).json({ id: (result as any).insertId, name, email });
    } catch (err) {
      const error = err as { message: string };  // Type assertion
      console.error("Database Error:", error.message);
      res.status(500).json({ error: "Failed to add user", details: error.message });
    }
    
});

export default router;
