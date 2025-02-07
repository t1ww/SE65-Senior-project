import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // Parse JSON
app.use("/users", userRoutes); // Mount user routes

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
