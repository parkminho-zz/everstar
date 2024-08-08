// UserVideoComponent.tsx
import React from 'react';
import { StreamManager } from 'openvidu-browser';
import { Video } from './Video';

interface UserVideoComponentProps {
  streamManager: StreamManager;
}

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({ streamManager }) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <div>
      {streamManager !== undefined ? (
        <div className='p-4 border rounded-md shadow-lg streamcomponent'>
          <Video streamManager={streamManager} />
          <div className='mt-2'>
            <p className='text-sm font-medium'>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
