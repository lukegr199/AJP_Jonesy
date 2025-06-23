import { forwardRef, useImperativeHandle, useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useMusicTracks } from "@/components/hooks/useMusicTracks";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
// import { ref } from "node:process";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

export interface MusicPlayerHandle {
  playTrackById: (id: string) => void;
}

export const MusicPlayer = forwardRef<MusicPlayerHandle, MusicPlayerProps>(
  ({ autoPlay = false }, ref) => {
  const musicTracks = useMusicTracks();
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = musicTracks[currentTrackIndex];

  useImperativeHandle(ref, () => ({
    playTrackById: (id: string) => {
      const index = musicTracks.findIndex((t) => t.id === id);
      if (index !== -1) {
        setCurrentTrackIndex(index);
        setIsPlaying(true);
      }
    },
  }));

  const updateProgress = () => {
    if (!audioRef.current) return;
    const currentTime = audioRef.current.currentTime;
    const total = audioRef.current.duration || 0;
    setProgress((currentTime / total) * 100);
  };

  const handleTrackEnd = () => {
    setCurrentTrackIndex((prev) =>
      prev < musicTracks.length - 1 ? prev + 1 : 0
    );
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
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const playPreviousTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === 0 ? musicTracks.length - 1 : prev - 1
    );
  };

  const playNextTrack = () => {
    setCurrentTrackIndex((prev) =>
      prev === musicTracks.length - 1 ? 0 : prev + 1
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Wait until tracks are loaded
  useEffect(() => {
    if (!musicTracks.length || !currentTrack) return;

    const audio = new Audio(currentTrack.audioUrl);
    audioRef.current = audio;

    audio.volume = volume;
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", () => {
      setDuration(audio.duration);
    });
    audio.addEventListener("ended", handleTrackEnd);

    if (autoPlay) {
      audio.play().catch((e) => console.log("Autoplay prevented:", e));
    }

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", () => {});
      audio.removeEventListener("ended", handleTrackEnd);
    };
  }, [musicTracks]);

  // Update audio source when track changes
  useEffect(() => {
    if (!audioRef.current || !currentTrack) return;

    audioRef.current.src = currentTrack.audioUrl;
    audioRef.current.load();
    if (isPlaying) {
      audioRef.current.play().catch((e) => console.log("Play failed:", e));
    }
  }, [currentTrackIndex, currentTrack]);

  // Play/pause state sync
  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying
      ? audioRef.current.play().catch((e) => console.log("Play failed:", e))
      : audioRef.current.pause();
  }, [isPlaying]);

  // Volume/mute sync
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  if (!musicTracks.length || !currentTrack) return null;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        <img
          src={currentTrack.coverArt}
          alt={currentTrack.title}
          className="w-16 h-16 rounded-md object-cover"
        />
        <div className="flex-1">
          <h3 className="font-medium">{currentTrack.title}</h3>
          <p className="text-sm text-gray-400">
            {Array.isArray(currentTrack.artists)
              ? currentTrack.artists.join(", ")
              : currentTrack.artists}
          </p>
        </div>

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

      <div className="mt-4 space-y-1">
        <Slider
          value={[progress]}
          max={100}
          step={0.1}
          onValueChange={handleProgressChange}
          className="cursor-pointer bg-gray-900"
        />
        <div className="flex justify-between text-xs text-gray-400">
          <span>{isNaN((progress / 100) * duration) ? '0:00' : formatTime((progress / 100) * duration)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="text-white hover:bg-white/10"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
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
);
