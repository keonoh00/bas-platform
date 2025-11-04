"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, StopCircle } from "lucide-react";
import clsx from "clsx";

export default function MoviePlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleStop = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);
    const handleEndedEvent = () => setIsPlaying(false);

    video.addEventListener("play", handlePlayEvent);
    video.addEventListener("pause", handlePauseEvent);
    video.addEventListener("ended", handleEndedEvent);

    return () => {
      video.removeEventListener("play", handlePlayEvent);
      video.removeEventListener("pause", handlePauseEvent);
      video.removeEventListener("ended", handleEndedEvent);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-base-900">
      <div className="relative w-[50%] aspect-video bg-black flex items-center justify-center">
        <video ref={videoRef} width={"100%"}>
          <source
            src={
              "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            }
            type="video/mp4"
          />
        </video>

        <button
          className={clsx(
            "absolute w-full h-full",
            isPlaying ? "hidden" : "bg-black/50 backdrop-blur-sm"
          )}
          onClick={isPlaying ? handlePause : handlePlay}
        >
          {isPlaying ? null : (
            <Play
              size={56}
              className="text-white self-center bg-blue w-full text-center"
            />
          )}
        </button>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={handlePlay}
          className="bg-base-800 hover:bg-base-700 p-3 rounded border border-base-700"
        >
          <Play size={24} className="text-white" />
        </button>
        <button
          onClick={handlePause}
          className="bg-base-800 hover:bg-base-700 p-3 rounded border border-base-700"
        >
          <Pause size={24} className="text-white" />
        </button>
        <button
          onClick={handleStop}
          className="bg-base-800 hover:bg-base-700 p-3 rounded border border-base-700"
        >
          <StopCircle size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}
