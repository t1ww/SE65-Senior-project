import { Router } from "express";

const router = Router();

// Mock list of questions (Replace with database later)
const questions = [
  { id: 1, title: "boothforce" },
  { id: 2, title: "Knapsack Problem" },
  { id: 3, title: "lulu" }
];

// ✅ GET route to fetch all questions
router.get("/", async (req, res) => {
  res.json(questions);
});

export default router;
