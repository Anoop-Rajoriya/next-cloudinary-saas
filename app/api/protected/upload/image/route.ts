import { NextResponse, NextRequest } from "next/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file)
      return NextResponse.json({ error: "File required" }, { status: 400 });

    const uploadResult = await uploadFileToCloudinary(file);

    return NextResponse.json({
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("api/protected/image POST error: ", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
