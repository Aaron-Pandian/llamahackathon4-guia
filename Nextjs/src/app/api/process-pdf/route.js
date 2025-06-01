import { spawn } from "child_process";
import path from "path";

export async function POST(req) {
  const body = await req.json();
  const { pdfUrl, answers } = body;

  return new Promise((resolve) => {
    const scriptPath = path.join(
      process.cwd(),
      "scripts",
      "fill_pdf_fields.py"
    );
    const python = spawn("python", [scriptPath]);

    const input = JSON.stringify({ pdf_url: pdfUrl, answers: answers || {} });
    python.stdin.write(input);
    python.stdin.end();

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => (output += data.toString()));
    python.stderr.on("data", (data) => (error += data.toString()));

    python.on("close", (code) => {
      if (code !== 0 || error) {
        console.error("Python error:", error);
        return resolve(
          new Response(JSON.stringify({ error }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      }

      try {
        const result = JSON.parse(output);
        resolve(
          new Response(JSON.stringify(result), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      } catch (err) {
        resolve(
          new Response(JSON.stringify({ error: "Invalid JSON from Python" }), {
            status: 500,
          })
        );
      }
    });
  });
}
