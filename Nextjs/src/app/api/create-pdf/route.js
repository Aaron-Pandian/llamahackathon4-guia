import { spawn } from "child_process";
import path from "path";
import fs from "fs";

export async function POST(req) {
  const data = await req.json();

  const scriptPath = path.join(process.cwd(), "scripts", "pdf_filler.py");
  const outputPath = path.join(process.cwd(), "scripts", "output.pdf");

  console.log("▶️ Running script from:", scriptPath);
  console.log("📁 Saving PDF to:", outputPath);
  console.log("📨 Input data:", data);

  return new Promise((resolve) => {
    const python = spawn("python", [scriptPath]);

    // Send JSON data to the Python script via stdin
    python.stdin.write(JSON.stringify(data));
    python.stdin.end();

    let stderr = "";
    let stdout = "";

    // Collect errors
    python.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    // Collect logs (optional)
    python.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    python.on("close", (code) => {
      console.log("📤 Python script exit code:", code);
      if (stdout) console.log("📄 Script stdout:", stdout);
      if (stderr) console.error("❌ Script stderr:", stderr);

      const pdfExists = fs.existsSync(outputPath);
      console.log("📦 Does PDF exist?", pdfExists);

      if (code === 0 && pdfExists) {
        const fileBuffer = fs.readFileSync(outputPath);
        console.log("✅ Sending PDF back to client");

        // Optionally delete file after sending
        // fs.unlinkSync(outputPath);

        resolve(
          new Response(fileBuffer, {
            status: 200,
            headers: {
              "Content-Type": "application/pdf",
              "Content-Disposition": "attachment; filename=generated.pdf",
            },
          })
        );
      } else {
        console.error("❌ PDF not found or script failed");
        resolve(
          new Response(
            JSON.stringify({
              error: "PDF creation failed",
              stderr,
              code,
              pdfExists,
            }),
            {
              status: 500,
              headers: { "Content-Type": "application/json" },
            }
          )
        );
      }
    });
  });
}
