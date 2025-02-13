import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import questionRoutes from "./routes/questions";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from frontend
app.use(cors({
  origin: 'http://localhost:5173', // Change to your frontend URL if different
  credentials: true,               // Enable cookies if needed
}));

app.use(express.json()); // Parse JSON
app.use("/users", userRoutes); // Mount user routes
app.use("/questions", questionRoutes); // Mount question routes

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
