"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

// Max file size 50 MB
const MaxFileSize = 50 * 1024 * 1024;

function VideoUpload() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) return toast("Select video file");
    if (file.size > MaxFileSize) return toast("File size too large");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("originalSize", file.size.toString());
    formData.append("title", title);
    formData.append("description", description);

    setIsUploading(true);
    try {
      const response = await axios.post("/api/protected/upload/video", formData);
      if (response.status !== 200) throw new Error("Failed to send request");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      toast(error instanceof Error ? error.message : "Uploading failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Video File</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="file-input file-input-bordered w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
  );
}

export default VideoUpload;
