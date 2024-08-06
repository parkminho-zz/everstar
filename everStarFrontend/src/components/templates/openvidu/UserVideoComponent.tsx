import React from "react";
import { Video } from "./OvVideo";
import { StreamManager } from "openvidu-browser";

interface UserVideoComponentProps {
  streamManager: StreamManager;
  subscribers: StreamManager[]; // Array of subscribers
}

export const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
  subscribers,
}) => {
  const getNicknameTag = (stream: StreamManager): string => {
    return JSON.parse(stream.stream.connection.data).clientData;
  };

  const adjustGridPlacement = (subscriberCount: number) => {
    if (subscriberCount <= 1) {
      return "center";
    }
    return "normal";
  };

  const renderSubscribers = () => {
    const totalStreams = subscribers.length + 1; // Including the main publisher
    const gridPlacement = adjustGridPlacement(totalStreams);

    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: gridPlacement === "center" ? "1fr" : "1fr 1fr",
          gap: "20px",
        }}
      >
        {/* Main publisher video */}
        <div className="w-full max-w-lg p-4 bg-white border border-gray-300 rounded-lg shadow-md">
          <Video streamManager={streamManager} />
          <div className="mt-2">
            <p className="text-center text-gray-800">{getNicknameTag(streamManager)}</p>
          </div>
        </div>
      </div>
    );
  };

  return <>{renderSubscribers()}</>;
};
