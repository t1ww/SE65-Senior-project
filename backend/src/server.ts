import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import questionRoutes from "./routes/questions";
import answerRoutes from "./routes/answers"

dotenv.config();

const app = express();
const BACKEND_PORT = process.env.BACKEND_PORT;

app.use(cors({
  origin: `http://localhost:${process.env.FRONTEND_PORT}`
}));
app.use(express.json()); // Parse JSON
app.use("/users", userRoutes); // Mount user routes
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

app.listen(BACKEND_PORT, () => {
  console.log(`Server running at http://localhost:${BACKEND_PORT}`);
});
