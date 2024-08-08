/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
  OpenVidu,
  Publisher,
  Subscriber,
  Session,
  StreamManager,
  Device,
  StreamEvent,
  ExceptionEvent,
} from 'openvidu-browser';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CircleButton } from '../atoms/buttons/CircleButton';
import { Glass } from 'components/molecules/Glass/Glass';
import { InputField } from 'components/organics/input/InputFields';
import Chatting from 'components/organics/Openvidu/Chatting';
import UserVideoComponent from '../organics/Openvidu/UserVideoComponent';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://i11b101.p.ssafy.io/';

type Props = {
  sessionId: string;
};

export const OpenViduApp = () => {
  const { sessionId } = useParams<Props>();
  const [, setOV] = useState<OpenVidu | null>(null);
  const [mySessionId] = useState<string>(sessionId || 'default_session_id');
  const [myUserName, setMyUserName] = useState<string>('방문자' + Math.floor(Math.random() * 100));
  const [userNameOk, setUserNameOk] = useState<boolean>(true);
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
  const [, setCurrentVideoDevice] = useState<MediaDeviceInfo | Device | undefined>(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('세션아이디 params:', sessionId);
  }, [sessionId]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      leaveSession();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const clip = () => {
    const textarea = document.createElement('textarea');
    document.body.appendChild(textarea);
    const currentUrl = `${window.location.href}`;
    const slashCount = (currentUrl.match(/\//g) || []).length;

    let url;
    if (slashCount === 5) {
      url = `${currentUrl}/${mySessionId}`;
    } else {
      url = currentUrl;
    }
    textarea.value = url;
    textarea.select();
    document.execCommand('copy');
    alert(`URL이 복사되었습니다. ${textarea.value}`);
    document.body.removeChild(textarea);
  };

  const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (name.length > 10) {
      alert('10글자 이내로 다시 입력하세요');
      setUserNameOk(false);
    } else {
      setUserNameOk(true);
    }
    setMyUserName(e.target.value);
  };

  // 세션 아이디 변경하는 함수 (사용하지는 않는데 혹시 몰라서 남겨둠)
  // const handleChangeSessionId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setMySessionId(e.target.value);
  // };

  // 메인비디오 스트림 변경하는 함수 (사용하지는 않는데 혹시 몰라서 남겨둠)
  // const handleMainVideoStream = (stream: StreamManager) => {
  //   if (mainStreamManager !== stream) {
  //     setMainStreamManager(stream);
  //   }
  // };

  const deleteSubscriber = (streamManager: StreamManager) => {
    setSubscribers(subscribers.filter((sub) => sub !== streamManager));
  };

  const joinSession = () => {
    const OV = new OpenVidu();
    setOV(OV);
    const mySession = OV.initSession();

    subscribers.map((sub) => {
      console.log('[찐] USER DATA: ', sub.stream.connection.data);
    });

    mySession.on('streamCreated', (event: StreamEvent) => {
      console.log('여기 시작됨 created');

      subscribers.map((sub) => {
        console.log('[찐] USER DATA: ', sub.stream.connection.data);
      });

      const subscriber = mySession.subscribe(event.stream, 'subscriber');
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event: StreamEvent) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception: ExceptionEvent) => {
      console.warn(exception);
    });

    createToken(mySessionId).then((token) => {
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
        })
        .catch((error) => {
          console.log('There was an error connecting to the session:', error.code, error.message);
        });
    });
  };

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

      createToken(mySessionId).then((token) => {
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

  const getToken = async (): Promise<string> => {
    const sessionId = await createSession(mySessionId);
    return createToken(sessionId);
  };

  const createSession = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions`,
      { customSessionId: sessionId },
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/sessions/${sessionId}/connections`,
      {},
      { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('[토큰]: ', response.data);
    return response.data; // The token
  };

  return (
    <div className='w-full h-full'>
      <Glass
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
            className='jumbotron vertical-center w-[390px] h-[316px] flex-shrink-0 bg-white rounded-lg shadow-md flex flex-col justify-center items-center '
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
              <p className='mt-5'>
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
              </p>
              <p className='mt-4'>
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
              </p>
              <div className='flex flex-row items-center justify-center gap-3 mt-6 text-center'>
                <button
                  className={`cursor-pointer flex items-center justify-center rounded-lg px-4 text-center shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] ${userNameOk ? 'bg-white text-black hover:bg-bgorange' : 'disabled:bg-greyscaleblack-20 disabled:text-greyscaleblack-60'} w-[106px] h-[40px]`}
                  onClick={() => navigate(-1)}
                >
                  뒤로가기
                </button>
                <input
                  className={`cursor-pointer flex items-center justify-center rounded-lg px-4 text-center shadow-[0px_4px_8px_#dbe5ec99,0px_0px_1px_1px_#dbe5ec99] ${userNameOk ? 'bg-white text-black hover:bg-bgorange' : 'disabled:bg-greyscaleblack-20 disabled:text-greyscaleblack-60'} w-[106px] h-[40px]`}
                  name='commit'
                  type='submit'
                  value='입장하기'
                  disabled={!userNameOk}
                />
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id='session flex flex-col justify-center items-center w-full'>
          <div id='session-header' className='flex flex-row justify-around w-full mt-6'>
            <h1 id='session-title' className='kor-h-h2'>
              채널명 {mySessionId}
            </h1>
            <input
              className='w-[200px] h-[40px] border rounded-md shadow-md mr-0 hover:shadow-md cursor-pointer'
              type='button'
              id='buttonClip'
              onClick={clip}
              value='Copy URL'
            />
          </div>
          <div className='flex flex-row items-center justify-center w-full h-4/5'>
            <div className='flex flex-col items-center justify-center w-1/6 gap-8 h-4/5'>
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
            <div className='flex flex-row w-full gap-4 h-4/5'>
              {mainStreamManager !== undefined ? (
                <UserVideoComponent streamManager={mainStreamManager} />
              ) : null}
              {subscribers.map((sub, i) => (
                <div
                  key={i}
                  className='box-border stream-container col-md-3'
                  // onClick={() => handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
            <div className='flex flex-col items-center justify-center w-1/6 gap-8 h-4/5'>
              <CircleButton
                theme={isChatOpen ? 'hover' : 'white'}
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
            {isChatOpen && (
              <div className='w-[400px] h-[600px] bg-white shadow-lg flex flex-row justify-center items-center'>
                <Chatting userName={myUserName} />
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenViduApp;
