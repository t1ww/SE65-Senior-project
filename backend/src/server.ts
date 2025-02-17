import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import questionRoutes from "./routes/questions";
import answerRoutes from "./routes/answers"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON
app.use("/users", userRoutes); // Mount user routes
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
