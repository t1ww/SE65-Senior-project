import { Router, Request, Response } from "express";
import pool from "@/database";

const router = Router();

// Get all questions
router.get("/", async (req: Request, res: Response): Promise<any> => {
  try {
    const [rows] = await pool.query("SELECT * FROM questions");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Get a question by id
router.get("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const [rows]: any = await pool.query("SELECT * FROM questions WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Database error" });
  }
});

// Create a new question
router.post("/", async (req: Request, res: Response): Promise<any> => {
  const {
    questionName,
    questionDescription,
    hint,
    startingCode,
    correctAnswerCode,
    testCases,
    estimatedRuntime,
    timeComplexity
  } = req.body;

  try {
    // Convert testCases to a JSON string if necessary
    const testCasesStr = JSON.stringify(testCases);
    const [result]: any = await pool.query(
      "INSERT INTO questions (questionName, questionDescription, hint, startingCode, correctAnswerCode, testCases, estimatedRuntime, timeComplexity) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [questionName, questionDescription, hint, startingCode, correctAnswerCode, testCasesStr, estimatedRuntime, timeComplexity]
    );

    res.status(201).json({
      id: result.insertId,
      questionName,
      questionDescription,
      hint,
      startingCode,
      correctAnswerCode,
      testCases,
      estimatedRuntime,
      timeComplexity
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create question", details: (err as any).message });
  }
});

// Update an existing question
router.put("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  const {
    questionName,
    questionDescription,
    hint,
    startingCode,
    correctAnswerCode,
    testCases,
    estimatedRuntime,
    timeComplexity
  } = req.body;

  try {
    const testCasesStr = JSON.stringify(testCases);
    const [result]: any = await pool.query(
      "UPDATE questions SET questionName = ?, questionDescription = ?, hint = ?, startingCode = ?, correctAnswerCode = ?, testCases = ?, estimatedRuntime = ?, timeComplexity = ? WHERE id = ?",
      [questionName, questionDescription, hint, startingCode, correctAnswerCode, testCasesStr, estimatedRuntime, timeComplexity, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json({ message: "Question updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to update question", details: (err as any).message });
  }
});

// Delete a question
router.delete("/:id", async (req: Request, res: Response): Promise<any> => {
  const { id } = req.params;
  try {
    const [result]: any = await pool.query("DELETE FROM questions WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Question not found" });
    }
    res.json({ message: "Question deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete question", details: (err as any).message });
  }
});

export default router;
