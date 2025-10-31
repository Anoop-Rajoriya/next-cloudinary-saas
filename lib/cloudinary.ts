import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type ReturnType = {
  public_id: string;
  secure_url: string;
  bytes: number;
  duration: number;
};

export async function uploadFileToCloudinary(
  file: File,
  resourceType: "image" | "video" = "image",
  destFolder = "images",
  opt: Record<string, any> = {}
): Promise<ReturnType> {
  if (!file) throw new Error("No file received");
  const buffer = Buffer.from(await file.arrayBuffer());
  const options = {
    folder: `next-cloudy-${destFolder}`,
    resource_type: resourceType,
    ...opt,
  };

  return new Promise((res, rej) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      options,
      (err, result) => {
        if (err) rej(err);
        else res(result as unknown as ReturnType);
      }
    );
    uploadStream.end(buffer);
  });
}
