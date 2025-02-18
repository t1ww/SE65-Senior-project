import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// API endpoint to execute code
app.post("/run", async (req: Request, res: Response): Promise<any> => {
  const { code } = req.body;
  if (!code) return res.status(400).json({ error: "No code provided" });

  // Generate a unique filename
  const fileName = `code_${Date.now()}.ts`;
  const filePath = path.join(__dirname, "sandbox", fileName);

  // Save the code to a temporary TypeScript file
  fs.writeFileSync(filePath, code);

  // Run the code using Docker (sandboxed execution)
  exec(
    `docker run --rm -v ${filePath}:/app/script.ts node:18-alpine sh -c "cd /app && npx ts-node script.ts"`,
    (error, stdout, stderr) => {
      // Delete the file after execution
      fs.unlinkSync(filePath);

      if (error)
        return res.status(500).json({ error: stderr || error.message });
      res.json({ output: stdout.trim() });
    }
  );
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
