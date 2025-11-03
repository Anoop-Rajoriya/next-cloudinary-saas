"use client";

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Video } from "@/types";
import VideoCard from "@/component/VideoCard";

function Dashboard() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const handleDownload = useCallback(() => {}, []);
  const fetchVideos = useCallback(async () => {
    setisLoading(true);
    try {
      const response = await axios.get("/api/videos");
      const data = response.data;
      if (Array.isArray(data)) {
        setVideos(data);
      } else throw new Error("Unexpacted response formate");
    } catch (error) {
      console.error(error);
      toast("Failed to fetch videos (see console)");
    } finally {
      setisLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="loading loading-spinner loading-md"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Videos</h1>
      {videos.length === 0 ? (
        <div className="text-center text-lg text-gray-500">
          No videos available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onDownload={handleDownload}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
