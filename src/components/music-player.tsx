import { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface Track {
  id: string;
  title: string;
  artist: string;
  audioUrl: string;
  coverArt: string;
}

interface MusicPlayerProps {
  tracks?: Track[];
  autoPlay?: boolean;
}

const defaultTracks: Track[] = [
  {
    id: "1",
    title: "Whatever You Need",
    artist: "AJP Jonesy",
    audioUrl: "#", // Replace with actual audio URL
    coverArt:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80",
  },
  {
    id: "2",
    title: "German",
    artist: "AJP Jonesy",
    audioUrl: "#", // Replace with actual audio URL
    coverArt:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&q=80",
  },
  {
    id: "3",
    title: "Head in a Hood",
    artist: "AJP Jonesy",
    audioUrl: "#", // Replace with actual audio URL
    coverArt:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&q=80",
  },
];

export function MusicPlayer({
  tracks = defaultTracks,
  autoPlay = false,
}: MusicPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentTrack = tracks[currentTrackIndex];

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    // Set up event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", handleTrackEnd);

    // Load initial track
    audio.src = currentTrack.audioUrl;
    audio.volume = volume;
    if (autoPlay)
      audio.play().catch((e) => console.log("Autoplay prevented:", e));

    return () => {
      // Clean up event listeners
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", handleTrackEnd);
      audio.pause();
    };
  }, []);

  // Handle track changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();

    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Play prevented:", e));
    }
  }, [currentTrackIndex, currentTrack]);

  // Handle play/pause changes
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Play prevented:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  // Handle volume changes
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const updateProgress = () => {
    if (!audioRef.current) return;

    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration || 0;
    setProgress((currentTime / duration) * 100);
  };

  const handleTrackEnd = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      setCurrentTrackIndex(0);
    }
  };

  const handleProgressChange = (value: number[]) => {
    if (!audioRef.current) return;

    const newProgress = value[0];
    const newTime = (newProgress / 100) * (audioRef.current.duration || 0);
    audioRef.current.currentTime = newTime;
    setProgress(newProgress);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0] / 100;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1));
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        {/* Cover Art */}
        <img
          src={currentTrack.coverArt}
          alt={currentTrack.title}
          className="w-16 h-16 rounded-md object-cover"
        />

        {/* Track Info */}
        <div className="flex-1">
          <h3 className="font-medium">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400">{currentTrack.artist}</p>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={playPreviousTrack}
            className="text-white hover:bg-white/10"
          >
            <SkipBack className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlayPause}
            className="text-white hover:bg-white/10"
          >
            {isPlaying ? (
              <Pause className="h-5 w-5" />
            ) : (
              <Play className="h-5 w-5" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={playNextTrack}
            className="text-white hover:bg-white/10"
          >
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-4 space-y-1">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleProgressChange}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{formatTime((progress / 100) * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume Control */}
      <div className="mt-4 flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-white hover:bg-white/10"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </Button>

        <Slider
          value={[isMuted ? 0 : volume * 100]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 cursor-pointer"
        />
      </div>
    </div>
  );
}
