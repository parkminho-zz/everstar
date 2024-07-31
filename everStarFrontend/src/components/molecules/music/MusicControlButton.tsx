/** React */
import React, { useState, useEffect } from "react";
import styled from "styled-components";

/** Components */
import MusicProgressbar from "./MusicProgressbar";

interface MusicControlButtonProps {
  duration: number; // Duration in seconds
}

const MusicControlButton: React.FC<MusicControlButtonProps> = ({
  duration,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const handlePlayPauseRestart = () => {
    if (isPlaying) {
      // If currently playing, pause the music
      setIsPlaying(false);
    } else if (currentTime >= duration) {
      // If music is finished, restart from the beginning
      setCurrentTime(0);
      setIsPlaying(true);
    } else {
      // If currently paused, resume the music
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const newTime = prev + 1;
          if (newTime >= duration) {
            clearInterval(interval!);
            setIsPlaying(false);
            return duration;
          }
          return newTime;
        });
      }, 1000);
    } else if (!isPlaying && interval) {
      clearInterval(interval);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, duration]);

  return (
    <ButtonContainer>
      <MusicProgressbar
        musicDuration={duration}
        value={currentTime / duration}
        onChange={(value) => setCurrentTime(value * duration)}
        initialValue={currentTime / duration}
      />
      <Button onClick={handlePlayPauseRestart}>
        {isPlaying
          ? "멈추기"
          : currentTime >= duration
            ? "재생하기"
            : "재생하기"}
      </Button>
    </ButtonContainer>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;

  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

export default MusicControlButton;
