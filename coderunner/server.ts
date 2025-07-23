import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs-extra";
import path from "path";
import { exec, spawn } from "child_process";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const CODERUNNER_PORT = process.env.CODERUNNER_PORT;

const app = express();
app.use(express.json());
app.use(cors({
    origin: FRONTEND_ORIGIN, // frontend port
    credentials: true
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
        // Save C++ code to file
        await fs.writeFile(cppFilePath, code);

        // Compile the C++ code
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

                    // Write input to the child process via stdin
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
        setTimeout(() => {
            fs.remove(cppFilePath)
                .then(() => console.log("Deleted cpp:", cppFilePath))
                .catch((err) => console.error("Failed to delete .cpp file:", err));

            let exeFilePathFixed = `${exeFilePath}.exe`;
            fs.remove(exeFilePathFixed)
                .then(() => console.log("Deleted exe:", exeFilePathFixed))
                .catch((err) => console.error("Failed to delete .exe file:", err));
        }, 100); // Delay to ensure file isn't in use
    }

});

app.listen(CODERUNNER_PORT, () => console.log(`Server running on port ${CODERUNNER_PORT}`));
