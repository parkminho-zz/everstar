/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { OpenVidu, Publisher, Subscriber, Session, StreamManager } from "openvidu-browser";
import { useParams } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UserVideoComponent } from "./UserVideoComponent";
import Chance from "chance";
// import { Device } from "openvidu-browser"; // 필요한 경우 OpenVidu의 Device 타입을 가져옵니다.
import { CircleButton } from "../../atoms/buttons/CircleButton";

const chance = new Chance();

let OVScreen: OpenVidu;
let sessionScreen: Session | null = null;
let screensharing = false;

function generateSessionId(): string {
  const word1 = chance.first();
  const word2 = chance.country({ full: true }).split(" ")[0];
  const word3 = chance.color({ format: "name" });
  const word4 = chance.animal();

  return `${word1}-${word2}-${word3}-${word4}`.toLowerCase().replace(/\s+/g, "-");
}

const sessionId = generateSessionId();
console.log(sessionId);

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === "production" ? "" : "https://i11b101.p.ssafy.io/";

export const OpenViduAppWrapper: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  return <OpenViduApp sessionId={sessionId} />;
};

type Props = {
  sessionId?: string;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OpenViduApp: React.FC<Props> = ({ sessionId }) => {
  const [OV, setOV] = useState<OpenVidu | null>(null);
  const [mySessionId, setMySessionId] = useState<string>(sessionId || generateSessionId());
  const [myUserName, setMyUserName] = useState<string>(
    "Participant" + Math.floor(Math.random() * 100)
  );
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [mainStreamManager, setMainStreamManager] = useState<StreamManager | undefined>(undefined);
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isVideoMuted, setIsVideoMuted] = useState<boolean>(false);
  const [isSpeakerMuted, setIsSpeakerMuted] = useState<boolean>(false);
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  //   const [currentVideoDevice, setCurrentVideoDevice] = useState<
  //     MediaDeviceInfo | Device | undefined
  //   >(undefined);

  const clip = () => {
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    const url = `${window.location.href}/${mySessionId}`;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    alert(`URL이 복사되었습니다. ${textarea.value}`);
    document.body.removeChild(textarea);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      leaveSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
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

    mySession.on("streamCreated", (event: any) => {
      console.log("여기 시작됨 created");
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);

      //   // 오디오 트랙 상태 확인 코드 추가
      //   const audioTracks = event.stream.getMediaStream().getAudioTracks();
      //   audioTracks.forEach((track: any) => {
      //     console.log("Audio Track Label:", track.label);
      //     console.log("Audio Track Enabled:", track.enabled);
      //   });
    });

    mySession.on("streamDestroyed", (event: any) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception: any) => {
      console.warn(exception);
    });

    getToken().then((token) => {
      mySession
        .connect(token, { clientData: myUserName })
        .then(async () => {
          const publisher = await OV.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          mySession.publish(publisher);

          //   const devices: Device[] = await OV.getDevices();
          //   const videoDevices = devices.filter((device) => device.kind === "videoinput");
          //   const currentVideoDeviceId = publisher.stream
          //     .getMediaStream()
          //     .getVideoTracks()[0]
          //     .getSettings().deviceId;
          //   const currentVideoDevice = videoDevices.find(
          //     (device) => device.deviceId === currentVideoDeviceId
          //   );

          //   setCurrentVideoDevice(currentVideoDevice);
          setMainStreamManager(publisher);
          setPublisher(publisher);
          setSession(mySession);
        })
        .catch((error) => {
          console.log("There was an error connecting to the session:", error.code, error.message);
        });
    });
  };

  //   const joinSession = () => {
  //     const OVs = new OpenVidu();
  //     setOV(OVs);
  //     setSession(OVs.initSession());
  //   };

  const leaveSession = () => {
    if (session) {
      session.disconnect();
    }

    setSession(undefined);
    setSubscribers([]);
    setMyUserName("Participant" + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);
  };

  const toggleAudio = () => {
    if (publisher) {
      publisher.publishAudio(!isAudioMuted);
      setIsAudioMuted(!isAudioMuted);
    }
  };

  const toggleVideo = () => {
    if (publisher) {
      publisher.publishVideo(!isVideoMuted);
      setIsVideoMuted(!isVideoMuted);
    }
  };

  const toggleSpeaker = () => {
    subscribers.forEach((subscriber) => {
      if (subscriber.stream) {
        const audioTracks = subscriber.stream.getMediaStream().getAudioTracks();
        audioTracks.forEach((track) => {
          track.enabled = !isSpeakerMuted;
        });
      }
    });
    setIsSpeakerMuted(!isSpeakerMuted);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const publishScreenShare = () => {
    if (!screensharing) {
      const publisherScreen = OVScreen.initPublisher(
        undefined,
        {
          videoSource: "screen",
          publishAudio: false,
          mirror: false,
        },
        (error) => {
          if (error) {
            console.error("Error initializing screen sharing:", error);
          }
        }
      );

      sessionScreen?.publish(publisherScreen).then(() => {
        screensharing = true;
        console.log("화면 공유 시작");

        publisherScreen.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .addEventListener("ended", () => {
            console.log('User pressed the "Stop sharing" button');
            sessionScreen?.unpublish(publisherScreen);
            screensharing = false;
            sessionScreen = null;
            console.log("화면 공유 중지");
          });
      });
    } else {
      const publishers = sessionScreen?.streamManagers.filter(
        (manager) => manager.stream.typeOfVideo === "SCREEN"
      );
      if (publishers && publishers.length > 0) {
        sessionScreen?.unpublish(publishers[0] as Publisher);
      }
      sessionScreen = null;
      screensharing = false;
      console.log("화면 공유 중지");
    }
  };

  const sendMessage = (message: string) => {
    if (session) {
      session.signal({
        data: message,
        to: [],
        type: "chat",
      });
    }
  };

  const getToken = async (): Promise<string> => {
    const sessionId = await createSession(mySessionId);
    return createToken(sessionId);
  };

  const createSession = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/chat/sessions`,
      { customSessionId: sessionId },
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string): Promise<string> => {
    const response = await axios.post(
      `${APPLICATION_SERVER_URL}api/chat/sessions/${sessionId}/connections`,
      {},
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data; // The token
  };

  return (
    <div className="container">
      {session === undefined ? (
        <div id="join">
          <div id="join-dialog" className="jumbotron vertical-center">
            <h1> Join a video session </h1>
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault();
                joinSession();
              }}
            >
              <p>
                <label>Participant: </label>
                <input
                  className="form-control"
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label>Session: </label>
                <input
                  className="form-control"
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                  readOnly
                />
              </p>
              <p className="text-center">
                <input
                  className="btn btn-lg btn-success"
                  name="commit"
                  type="submit"
                  value="JOIN"
                />
              </p>
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <div className="flex flex-row items-center justify-center">
              <input
                className="w-[200px] h-[40px] border rounded-md shadow-md"
                type="button"
                id="buttonLeaveSession"
                onClick={leaveSession}
                value="Leave session"
              />
              {/* <input
          className="btn btn-large btn-success"
          type="button"
          id="buttonSwitchCamera"
          onClick={switchCamera}
          value="Switch Camera"
        /> */}

              <CircleButton
                theme={isAudioMuted ? "white" : "focus"}
                onClick={toggleAudio}
                icon="mic"
                disabled={false}
              />

              <CircleButton
                theme={isVideoMuted ? "focus" : "white"}
                onClick={toggleVideo}
                icon="video"
                disabled={false}
              />

              <CircleButton
                theme={isSpeakerMuted ? "focus" : "white"}
                onClick={toggleSpeaker}
                icon={isSpeakerMuted ? "phoneStop" : "phone"}
                disabled={false}
              />

              <CircleButton
                theme={isChatOpen ? "focus" : "white"}
                onClick={toggleChat}
                icon={"chat"}
                disabled={false}
              />

              <CircleButton
                theme={screensharing ? "focus" : "white"}
                onClick={publishScreenShare}
                icon={"share"}
                disabled={false}
              />

              <input
                className="w-[200px] h-[40px] border rounded-md shadow-md"
                type="button"
                id="buttonClip"
                onClick={clip}
                value="Copy URL"
              />
            </div>
          </div>

          <div className="flex flex-row">
            <div id="main-video" className="col-md-6">
              {mainStreamManager !== undefined ? (
                <UserVideoComponent streamManager={mainStreamManager} subscribers={subscribers} />
              ) : null}
            </div>
            <div id="video-container" className="col-md-6">
              {subscribers.map((sub, i) => (
                <div
                  key={i}
                  className="stream-container"
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <UserVideoComponent streamManager={sub} subscribers={subscribers} />
                </div>
              ))}
            </div>
            {isChatOpen && <div>채팅창</div>}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenViduApp;
