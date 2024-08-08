/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { OpenVidu, Publisher, Subscriber, Session, StreamManager, Device } from 'openvidu-browser';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import Chance from 'chance';

import { Video } from './Video';
import { CircleButton } from '../../atoms/buttons/CircleButton';
import { Glass } from 'components/molecules/Glass/Glass';
import { InputField } from 'components/organics/input/InputFields';

const chance = new Chance();

function generateSessionId(): string {
  const word1 = chance.first();
  const word2 = chance.country({ full: true }).split(' ')[0];
  const word3 = chance.color({ format: 'name' });
  const word4 = chance.animal();

  return `${word1}-${word2}-${word3}-${word4}`.toLowerCase().replace(/\s+/g, '-');
}

const sessionId = generateSessionId();
console.log(sessionId);

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://i11b101.p.ssafy.io/';

export const OpenViduAppWrapper: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  return <OpenViduApp sessionId={sessionId} />;
};

type Props = {
  sessionId?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OpenViduApp: React.FC<Props> = ({ sessionId }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [mySessionId, setMySessionId] = useState<string>(sessionId || generateSessionId());
  const [myUserName, setMyUserName] = useState<string>(
    'Participant' + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [screensharing, setScreensharing] = useState<boolean>(false);
  const [exitClick, setExitClick] = useState<boolean>(false);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<
    MediaDeviceInfo | Device | undefined
  >(undefined);

  const clip = () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    const currentUrl = `${window.location.href}`;
    const slashCount = (currentUrl.match(/\//g) || []).length;

    let url;
    if (slashCount === 5) {
      // /가 5개인 경우 sessionId를 추가
      url = `${currentUrl}/${mySessionId}`;
    } else {
      // /가 6개인 경우 그대로 복사
      url = currentUrl;
    }
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    alert(`URL이 복사되었습니다. ${textarea.value}`);
    document.body.removeChild(textarea);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      leaveSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMySessionId(e.target.value);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMyUserName(e.target.value);
  };

  const handleMainVideoStream = (stream: StreamManager) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers(subscribers.filter((sub) => sub !== streamManager));
  };

  const joinSession = () => {
    const OV = new OpenVidu();
    setOV(OV);
    const mySession = OV.initSession();

    mySession.on('streamCreated', (event: any) => {
      console.log('여기 시작됨 created');
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);

      //   // 오디오 트랙 상태 확인 코드 추가
      //   const audioTracks = event.stream.getMediaStream().getAudioTracks();
      //   audioTracks.forEach((track: any) => {
      //     console.log("Audio Track Label:", track.label);
      //     console.log("Audio Track Enabled:", track.enabled);
      //   });
    });

    mySession.on('streamDestroyed', (event: any) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception: any) => {
      console.warn(exception);
    });

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          const publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: !isAudioMuted,
            publishVideo: !isVideoMuted,
            resolution: '640x480',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: false,
          });

          mySession.publish(publisher);

          const devices: Device[] = await OV.getDevices();
          const videoDevices = devices.filter((device) => device.kind === 'videoinput');
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId
          );

          setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setSession(mySession);

          console.log('연결 세션 ID:', mySessionId);
          console.log('연결 유저 ID:', myUserName);
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });
  };

  //   const joinSession = () => {
  //     const OVs = new OaccessAllowedpenVidu();
  //     setOV(OVs);
  //     setSession(OVs.initSession());
  //   };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setSession(undefined);
    setSubscribers([]);
    setMyUserName('Participant' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const toggleAudio = () => {
    console.log('audio: ', isAudioMuted);

    if (publisher) {
      setIsAudioMuted(!isAudioMuted);
      publisher.publishAudio(isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (publisher) {
      setIsVideoMuted(!isVideoMuted);
      publisher.publishVideo(isVideoMuted);
    }
  };

  const toggleSpeaker = () => {
    setIsSpeakerMuted(!isSpeakerMuted);
    subscribers.forEach((subscriber) => {
      subscriber.subscribeToAudio(isSpeakerMuted);
    });
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const toggleExit = () => {
    setExitClick(!exitClick);
    leaveSession();
  };

  const publishScreenShare = () => {
    if (!screensharing) {
      const OVScreen = new OpenVidu();
      const sessionScreen = OVScreen.initSession();

      getToken().then((token) => {
        sessionScreen.connect(token).then(() => {
          const publisherScreen = OVScreen.initPublisher(undefined, {
            videoSource: 'screen',
            publishAudio: false,
            mirror: false,
          });

          publisherScreen.once('accessAllowed', (event) => {
            publisherScreen.stream
              .getMediaStream()
              .getVideoTracks()[0]
              .addEventListener('ended', () => {
                console.log('User pressed the "Stop sharing" button');
                sessionScreen.unpublish(publisherScreen);
                setScreensharing(false);
              });
            sessionScreen.publish(publisherScreen);
            setScreensharing(true);
          });

          publisherScreen.once('accessDenied', (event) => {
            console.warn('ScreenShare: Access Denied');
          });
        });
      });
    } else {
      console.log('화면 공유 중지');
      setScreensharing(false);
    }
  };

  // const sendMessage = (message: string) => {
  //   if (session) {
  //     session.signal({
  //       data: message,
  //       to: [],
  //       type: 'chat',
  //     });
  //   }
  // };

  const getToken = async (): Promise<string> => {
    const sessionId = await createSession(mySessionId);
    return createToken(sessionId);
  };

  const createSession = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/chat/sessions`,
      { customSessionId: sessionId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/chat/sessions/${sessionId}/connections`,
      {},
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data; // The token
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTabletOrMobile = useMediaQuery({ maxWidth: 1199 });

  return (
    <div className='container'>
      <Glass
        variant={isMobile ? 'mobile' : isTabletOrMobile ? 'tablet' : 'desktop'}
        currentPage={1}
        totalPages={1}
        onPageChange={() => console.log('이동')}
        showPageIndicator={false}
        className='z-[-1] '
      />
      {session === undefined ? (
        <div id='join' className='flex flex-col items-center justify-center w-full h-full'>
          <div
            id='join-dialog'
            className='jumbotron vertical-center w-[390px] h-[316px] flex-shrink-0 bg-white rounded-lg shadow-md flex flex-col justify-center items-center'
          >
            <h1 className='kor-h-h2'>화상 채널 입장</h1>
            <form
              className='form-group'
              onSubmit={(e) => {
                console.log('세션 ID:', mySessionId);
                console.log('유저 ID:', myUserName);
                e.preventDefault();
                joinSession();
              }}
            >
              <p>
                <InputField
                  state='default'
                  label='사용자 이름을 입력해주세요'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  text={myUserName}
                  showCheckIcon={false}
                  onChange={handleChangeUserName}
                ></InputField>
                {/* <label></label>
                <input
                  className='form-control'
                  type='text'
                  id='userName'
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                /> */}
              </p>
              <p>
                <InputField
                  state='disable'
                  label='세션 ID'
                  showLabel={true}
                  showValidationText={false}
                  starshow={false}
                  text={mySessionId}
                  showCheckIcon={false}
                  readOnlyState={true}

                  // onChange={handleChangeSessionId}
                ></InputField>
                {/* <label>Session: </label>
                <input
                  className='form-control'
                  type='text'
                  id='sessionId'
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                  readOnly
                /> */}
              </p>
              <p className='text-center'>
                <input
                  className='btn btn-lg btn-success'
                  name='commit'
                  type='submit'
                  value='JOIN'
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id='session flex flex-col justify-center items-center'>
          <div id='session-header' className='flex flex-row justify-between'>
            <h1 id='session-title' className='kor-h-h2'>
              {mySessionId}
            </h1>
            <input
              className='w-[200px] h-[40px] border rounded-md shadow-md hover:shadow-md'
              type='button'
              id='buttonClip'
              onClick={clip}
              value='Copy URL'
            />
          </div>
          <div className='flex flex-row items-center justify-center'>
            <div className='flex flex-col items-center justify-center'>
              {/* <input
          className="btn btn-large btn-success"
          type="button"
          id="buttonSwitchCamera"
          onClick={switchCamera}
          value="Switch Camera"
        /> */}

              <CircleButton
                theme={isAudioMuted ? 'white' : 'hover'}
                onClick={toggleAudio}
                icon={isAudioMuted ? 'micOff' : 'mic'}
                disabled={false}
              />

              <CircleButton
                theme={isVideoMuted ? 'white' : 'hover'}
                onClick={toggleVideo}
                icon={isVideoMuted ? 'videoOff' : 'video'}
                disabled={false}
              />

              <CircleButton
                theme={isSpeakerMuted ? 'white' : 'hover'}
                onClick={toggleSpeaker}
                icon={isSpeakerMuted ? 'phoneStop' : 'phone'}
                disabled={false}
              />
            </div>
            <div className='flex flex-row z-1 bg-mainerror w-[3/5]'>
              {/* <div id='main-video' className='col-md-6'>
            </div> */}
              <div id='video-container' className='flex flex-wrap gap-4 col-md-6'>
                {mainStreamManager !== undefined ? (
                  <Video streamManager={mainStreamManager} />
                ) : null}

                {subscribers.map((sub, i) => (
                  <div
                    key={i}
                    className='box-border stream-container col-md-3'
                    // onClick={() => handleMainVideoStream(sub)}
                  >
                    <Video streamManager={sub} />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <CircleButton
                theme={isChatOpen ? 'white' : 'hover'}
                onClick={toggleChat}
                icon={'chat'}
                disabled={false}
              />

              <CircleButton
                theme={screensharing ? 'white' : 'hover'}
                onClick={publishScreenShare}
                icon={'share'}
                disabled={false}
              />

              <CircleButton
                theme={exitClick ? 'hover' : 'white'}
                onClick={toggleExit}
                icon={'exit'}
                disabled={false}
              />
            </div>
            {isChatOpen && <div className='w-[400px] h-[600px] bg-white shadow-lg'>채팅창</div>}
            {/* <input
                className='w-[200px] h-[40px] border rounded-md shadow-md hover:shadow-md'
                type='button'
                id='buttonLeaveSession'
                onClick={leaveSession}
                value='Leave session'
              /> */}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenViduApp;
