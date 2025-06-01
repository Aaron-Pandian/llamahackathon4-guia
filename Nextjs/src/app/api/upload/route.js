import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileExt = file.name.split(".").pop()?.toLowerCase();
    const publicId = `${Date.now()}-${file.name}`;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "auto",
            folder: "chatgpt-clone",
            public_id: publicId,
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    // If it's a PDF or Word doc, generate a preview of page 1
    let previewImageUrl = null;
    if (["pdf", "doc", "docx"].includes(fileExt)) {
      previewImageUrl = cloudinary.url(result.public_id + ".png", {
        page: 1,
        transformation: [{ width: 1200 }],
      });
    }

    return NextResponse.json({
      success: true,
      originalFileUrl: result.secure_url,
      previewImageUrl,
      publicId: result.public_id,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Upload failed", details: error.message },
      { status: 500 }
    );
  }
}
