process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason) => {
    console.error('Unhandled Rejection:', reason);
});


import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs-extra";
import path from "path";
import { exec, spawn } from "child_process";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

app.use(express.json());
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
}));

const TEMP_DIR = path.join(__dirname, "temp");
fs.ensureDirSync(TEMP_DIR);

app.post("/run", async (req, res): Promise<any> => {
    const { code, testCases } = req.body;

    if (!code || !Array.isArray(testCases)) {
        return res.status(400).json({ error: "Invalid input" });
    }

    const fileName = `temp_${Date.now()}`;
    const cppFilePath = path.join(TEMP_DIR, `${fileName}.cpp`);
    const exeFilePath = path.join(TEMP_DIR, fileName);

    try {
        await fs.writeFile(cppFilePath, code);

        await new Promise((resolve, reject) => {
            exec(`g++ "${cppFilePath}" -o "${exeFilePath}"`, (err, stdout, stderr) => {
                if (err) return reject(stderr || err.message);
                resolve(stdout);
            });
        });

        const results = await Promise.all(
            testCases.map(({ input, expectedOutput }: { input: string; expectedOutput: string }) => {
                return new Promise<{ input: string; output: string; expected: string; passed: boolean }>((resolve) => {
                    const child = spawn(exeFilePath, []);

                    let output = "";
                    child.stdout.on("data", (data: Buffer) => {
                        output += data.toString();
                    });

                    child.stderr.on("data", (data: Buffer) => {
                        console.error(`stderr: ${data.toString()}`);
                    });

                    child.on("close", () => {
                        output = output.trim();
                        resolve({
                            input,
                            output,
                            expected: expectedOutput,
                            passed: output === expectedOutput,
                        });
                    });

                    if (child.stdin) {
                        child.stdin.write(input);
                        child.stdin.end();
                    }
                });
            })
        );

        res.json({ results });

    } catch (error: unknown) {
        res.status(500).json({ error: (error as Error).toString() });
    } finally {
        fs.remove(cppFilePath).catch(() => { });
        fs.remove(exeFilePath).catch(() => { });
    }
});

app.listen(BACKEND_PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${BACKEND_PORT}`);
});
