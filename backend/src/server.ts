import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import questionRoutes from "./routes/questions";
import answerRoutes from "./routes/answers"

dotenv.config();

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
if (!process.env.FRONTEND_ORIGIN) {
  throw new Error("FRONTEND_ORIGIN environment variable is required");
}

const BACKEND_PORT = Number(process.env.BACKEND_PORT);
if (!process.env.BACKEND_PORT) {
  throw new Error("BACKEND_PORT environment variable is required");
}
if (isNaN(BACKEND_PORT)) {
  throw new Error("BACKEND_PORT must be a valid number");
}

app.use(cors({
  origin: FRONTEND_ORIGIN
}));
app.use(express.json()); // Parse JSON
app.use("/users", userRoutes); // Mount user routes
app.use("/questions", questionRoutes);
app.use("/answers", answerRoutes);


app.listen(BACKEND_PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${BACKEND_PORT}`);
});
