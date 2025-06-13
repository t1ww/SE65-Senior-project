import cors from "cors";
import express, { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const TEMP_DIR = path.join(__dirname, "temp");
fs.ensureDirSync(TEMP_DIR);

const EXECUTION_TIMEOUT = 5000; // ms
const MAX_OUTPUT_LENGTH = 1000; // chars

// Test case interfaces
interface TestCase {
    input: string;
    expectedOutput: string;
}
interface TestResult {
    input: string;
    output: string;
    expected: string;
    passed: boolean;
    error?: string;
}

// Request and Response interfaces
interface RunCodeRequest {
    code: string;
    testCases: TestCase[];
}
interface RunCodeResponse {
    results: TestResult[];
}

app.post("/run", async (req: Request, res: Response): Promise<void> => {
    // Get request
    const request: RunCodeRequest = req.body;

    if (!request.code || !Array.isArray(request.testCases)) {
        res.status(400).json({ error: "Invalid input" });
        return;
    }

    // Create temp file
    const fileName = `temp_${Date.now()}`;
    const cppFilePath = path.join(TEMP_DIR, `${fileName}.cpp`);
    const exeFilePath = path.join(TEMP_DIR, fileName);

    try {
        await fs.writeFile(cppFilePath, request.code);

        await new Promise<void>((resolve, reject) => {
            exec(`g++ "${cppFilePath}" -o "${exeFilePath}"`, (err, _stdout, stderr) => {
                if (err) reject(stderr || err.message);
                else resolve();
            });
        });

        const results = await Promise.allSettled(
            request.testCases.map(({ input, expectedOutput }: TestCase) => {
                return new Promise<TestResult>((resolve) => {
                    const child = spawn(exeFilePath, [], { stdio: ["pipe", "pipe", "pipe"] });

                    let output = "";
                    let errorOutput = "";
                    const timer = setTimeout(() => {
                        child.kill();
                        errorOutput += "Process timeout.";
                    }, EXECUTION_TIMEOUT);

                    child.stdout.on("data", (data: Buffer) => {
                        output += data.toString();
                        if (output.length > MAX_OUTPUT_LENGTH) {
                            output = output.substring(0, MAX_OUTPUT_LENGTH) + "...(truncated)";
                            child.kill();
                        }
                    });

                    child.stderr.on("data", (data: Buffer) => {
                        errorOutput += data.toString();
                    });

                    child.on("close", () => {
                        clearTimeout(timer);
                        output = output.trim();
                        resolve({
                            input,
                            output,
                            expected: expectedOutput,
                            passed: output === expectedOutput,
                            error: errorOutput ? errorOutput.trim() : undefined
                        });
                    });

                    if (child.stdin) {
                        child.stdin.write(input + "\n");
                        child.stdin.end();
                    }
                });
            })
        );

        const finalResults: TestResult[] = results.map(r => 
            r.status === "fulfilled" ? r.value : { 
                input: "", output: "", expected: "", passed: false, error: r.reason?.toString() 
            }
        );

        const response: RunCodeResponse = { results: finalResults };
        res.json(response);

    } catch (error: unknown) {
        console.error("Server Error:", error);
        res.status(500).json({ error: (error as Error).toString() });
    } finally {
        try {
            await fs.remove(cppFilePath);
            await fs.remove(exeFilePath);
        } catch (cleanupErr) {
            console.error("Cleanup Error:", cleanupErr);
        }
    }
});

app.listen(3000, () => console.log("Server running on port 3000"));