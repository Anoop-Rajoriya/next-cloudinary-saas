import { PrismaClient } from "@/generated/prisma/client";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;
    const title = (formData.get("title") as string) || "";
    const description = (formData.get("description") as string) || "";
    const originalSize = (formData.get("originalSize") as string) || "0";

    if (!file) {
      return NextResponse.json({ error: "File required" }, { status: 400 });
    }

    // video upload
    const uploadResult = await uploadFileToCloudinary(file, "video", "videos", {
      transformation: [{ quality: "auto", fetch_format: "mp4" }],
    });

    const video = await prisma.video.create({
      data: {
        title,
        description,
        publicId: uploadResult.public_id,
        originalSize,
        compressedSize: String(uploadResult.bytes),
        duration: uploadResult.duration || 0,
      },
    });

    return NextResponse.json(video);
  } catch (error) {
    console.error("api/protected/video POST error:", error);
    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 }
    );
  }
}
