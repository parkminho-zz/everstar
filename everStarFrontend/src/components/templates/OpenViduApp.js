import { OpenVidu } from 'openvidu-browser';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { Component } from 'react';
import './App.css';
import UserVideoComponent from './UserVideoComponent';

import Chance from 'chance';

const chance = new Chance();

let OVScreen;
let sessionScreen;

// User name and session name global variables
var myUserName;
var mySessionId;
var screensharing = false;

function generateSessionId() {
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

export const OpenViduAppWrapper = () => {
  const { sessionId } = useParams();
  return <OpenViduApp sessionId={sessionId} />;
};

class OpenViduApp extends Component {
  constructor(props) {
    super(props);

    const sessionIdFromURL = this.props.sessionId || generateSessionId();
    console.log('URL에서 가져온 세션ID 또는 랜덤 생성: ', sessionIdFromURL);

    // These properties are in the state's component in order to re-render the HTML whenever their values change
    this.state = {
      mySessionId: sessionIdFromURL,
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      session: undefined,
      mainStreamManager: undefined, // Main video of the page. Will be the 'publisher' or one of the 'subscribers'
      publisher: undefined,
      subscribers: [],
      isAudioMuted: false,
      isVideoMuted: false,
      isSpeakerMuted: false,
      isChatOpen: false,
    };

    this.joinSession = this.joinSession.bind(this);
    this.leaveSession = this.leaveSession.bind(this);
    this.switchCamera = this.switchCamera.bind(this);
    this.handleChangeSessionId = this.handleChangeSessionId.bind(this);
    this.handleChangeUserName = this.handleChangeUserName.bind(this);
    this.handleMainVideoStream = this.handleMainVideoStream.bind(this);
    this.onbeforeunload = this.onbeforeunload.bind(this);
    this.clip = this.clip.bind(this);
    this.toggleAudio = this.toggleAudio.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
    this.toggleSpeaker = this.toggleSpeaker.bind(this);
    this.publishScreenShare = this.publishScreenShare.bind(this);
  }

  clip() {
    var url = ''; // <a>태그에서 호출한 함수인 clip 생성
    var textarea = document.createElement('textarea');
    //url 변수 생성 후, textarea라는 변수에 textarea의 요소를 생성

    document.body.appendChild(textarea); //</body> 바로 위에 textarea를 추가(임시 공간이라 위치는 상관 없음)
    url = window.document.location.href; //url에는 현재 주소값을 넣어줌
    textarea.value = url + '/' + this.state.mySessionId; // textarea 값에 url를 넣어줌
    textarea.select(); //textarea를 설정
    document.execCommand('copy'); // 복사
    alert('URL이 복사되었습니다.', textarea.value); // 알림창

    document.body.removeChild(textarea); //extarea 요소를 없애줌
  }

  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunload);
  }

  onbeforeunload(event) {
    this.leaveSession();
  }

  handleChangeSessionId(e) {
    this.setState({
      mySessionId: e.target.value,
    });
  }

  handleChangeUserName(e) {
    this.setState({
      myUserName: e.target.value,
    });
  }

  handleMainVideoStream(stream) {
    if (this.state.mainStreamManager !== stream) {
      this.setState({
        mainStreamManager: stream,
      });
    }
  }

  deleteSubscriber(streamManager) {
    let subscribers = this.state.subscribers;
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      subscribers.splice(index, 1);
      this.setState({
        subscribers: subscribers,
      });
    }
  }

  joinSession() {
    // --- 1) Get an OpenVidu object ---

    this.OV = new OpenVidu();

    // 'OVCamera' will handle Camera operations.
    // 'OVScreen' will handle screen sharing operations
    OVScreen = new OpenVidu();

    // --- 2) Init a session ---

    sessionScreen = OVScreen.initSession();

    this.setState(
      {
        session: this.OV.initSession(),
      },
      () => {
        var mySession = this.state.session;
        sessionScreen = OVScreen.initSession(); // Initialize sessionScreen here
        // --- 3) Specify the actions when events take place in the session ---

        // On every new Stream received...
        mySession.on('streamCreated', (event) => {
          // Subscribe to the Stream to receive it. Second parameter is undefined
          // so OpenVidu doesn't create an HTML video by its own
          var subscriber = mySession.subscribe(event.stream, undefined);
          var subscribers = this.state.subscribers;
          subscribers.push(subscriber);

          // Update the state with the new subscribers
          this.setState({
            subscribers: subscribers,
          });
          console.log('Subscribers: ', subscribers);
        });

        // On every Stream destroyed...
        mySession.on('streamDestroyed', (event) => {
          // Remove the stream from 'subscribers' array
          this.deleteSubscriber(event.stream.streamManager);
        });

        // On every asynchronous exception...
        mySession.on('exception', (exception) => {
          console.warn(exception);
        });

        // --- 4) Connect to the session with a valid user token ---

        // Get a token from the OpenVidu deployment
        this.getToken().then((token) => {
          // First param is the token got from the OpenVidu deployment. Second param can be retrieved by every user on event
          // 'streamCreated' (property Stream.connection.data), and will be appended to DOM as the user's nickname
          mySession
            .connect(token, { clientData: this.state.myUserName })
            .then(async () => {
              // --- 5) Get your own camera stream ---

              // Init a publisher passing undefined as targetElement (we don't want OpenVidu to insert a video
              // element: we will manage it on our own) and with the desired properties
              let publisher = await this.OV.initPublisherAsync(undefined, {
                audioSource: undefined, // The source of audio. If undefined default microphone
                videoSource: undefined, // The source of video. If undefined default webcam
                publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
                publishVideo: true, // Whether you want to start publishing with your video enabled or not
                resolution: '640x480', // The resolution of your video
                frameRate: 30, // The frame rate of your video
                insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
                mirror: false, // Whether to mirror your local video or not
              });

              // --- 6) Publish your stream ---

              mySession.publish(publisher);

              // Obtain the current video device in use
              var devices = await this.OV.getDevices();
              var videoDevices = devices.filter((device) => device.kind === 'videoinput');
              var currentVideoDeviceId = publisher.stream
                .getMediaStream()
                .getVideoTracks()[0]
                .getSettings().deviceId;
              var currentVideoDevice = videoDevices.find(
                (device) => device.deviceId === currentVideoDeviceId
              );

              // Set the main video in the page to display our webcam and store our Publisher
              this.setState({
                currentVideoDevice: currentVideoDevice,
                mainStreamManager: publisher,
                publisher: publisher,
              });
            })
            .catch((error) => {
              console.log(
                'There was an error connecting to the session:',
                error.code,
                error.message
              );
            });
        });
      }
    );
  }

  leaveSession() {
    // --- 7) Leave the session by calling 'disconnect' method over the Session object ---

    const mySession = this.state.session;

    if (mySession) {
      mySession.disconnect();
    }

    // Empty all properties...
    this.OV = null;
    this.setState({
      session: undefined,
      subscribers: [],
      mySessionId: this.state.mySessionId,
      myUserName: 'Participant' + Math.floor(Math.random() * 100),
      mainStreamManager: undefined,
      publisher: undefined,
    });
  }

  async switchCamera() {
    try {
      const devices = await this.OV.getDevices();
      var videoDevices = devices.filter((device) => device.kind === 'videoinput');

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== this.state.currentVideoDevice.deviceId
        );

        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = this.OV.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          //newPublisher.once("accessAllowed", () => {
          await this.state.session.unpublish(this.state.mainStreamManager);

          await this.state.session.publish(newPublisher);
          this.setState({
            currentVideoDevice: newVideoDevice[0],
            mainStreamManager: newPublisher,
            publisher: newPublisher,
          });
        }
      }
    } catch (e) {
      console.error(e);
    }
  }

  toggleAudio() {
    const newAudioState = !this.state.isAudioMuted;
    this.state.publisher.publishAudio(!newAudioState);
    this.setState({ isAudioMuted: newAudioState });
  }

  toggleVideo() {
    const newVideoState = !this.state.isVideoMuted;
    this.state.publisher.publishVideo(!newVideoState);
    this.setState({ isVideoMuted: newVideoState });
  }

  toggleSpeaker() {
    const newSpeakerState = !this.state.isSpeakerMuted;
    this.state.subscribers.forEach((subscriber) => {
      subscriber.subscribeToAudio(!newSpeakerState);
    });
    this.setState({ isSpeakerMuted: newSpeakerState });
  }

  // toggleShare() {
  //   const newShareState = !this.state.isShared;
  //   this.state.subscribers.forEach((subscriber) => {
  //     subscriber.subscribeToAudio(!newSpeakerState);
  //   });
  //   this.setState({ isSpeakerMuted: newSpeakerState });
  // }

  publishScreenShare() {
    if (!screensharing) {
      let publisherScreen = OVScreen.initPublisher(
        undefined,
        {
          videoSource: 'screen',
          publishAudio: false,
          mirror: false,
        },
        (error) => {
          if (error) {
            console.error('Error initializing screen sharing:', error);
          }
        }
      );

      // Publish screen sharing stream
      sessionScreen.publish(publisherScreen).then(() => {
        screensharing = true;
        console.log('화면 공유 시작');
        publisherScreen.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .addEventListener('ended', () => {
            console.log('User pressed the "Stop sharing" button');
            sessionScreen.unpublish(publisherScreen);
            screensharing = false;
            sessionScreen = null; // Reset sessionScreen variable
            console.log('화면 공유 중지');
          });
      });
    } else {
      // Unpublish screen sharing stream
      sessionScreen.unpublish(sessionScreen.streams[0]);
      screensharing = false;
      sessionScreen = null; // Reset sessionScreen variable
      console.log('화면 공유 중지');
    }
  }

  // publishScreenShare() {
  //   // --- 9.1) To create a publisherScreen set the property 'videoSource' to 'screen'
  //   var publisherScreen = OVScreen.initPublisher('container-screens', { videoSource: 'screen' });

  //   // --- 9.2) Publish the screen share stream only after the user grants permission to the browser
  //   publisherScreen.once('accessAllowed', (event) => {
  //     document.getElementById('buttonScreenShare').style.visibility = 'hidden';
  //     screensharing = true;
  //     // If the user closes the shared window or stops sharing it, unpublish the stream
  //     publisherScreen.stream
  //       .getMediaStream()
  //       .getVideoTracks()[0]
  //       .addEventListener('ended', () => {
  //         console.log('User pressed the "Stop sharing" button');
  //         sessionScreen.unpublish(publisherScreen);
  //         document.getElementById('buttonScreenShare').style.visibility = 'visible';
  //         screensharing = false;
  //       });
  //     sessionScreen.publish(publisherScreen);
  //   });

  //   publisherScreen.on('videoElementCreated', function (event) {
  //     appendUserData(event.element, sessionScreen.connection);
  //     event.element['muted'] = true;
  //   });

  //   publisherScreen.once('accessDenied', (event) => {
  //     console.error('Screen Share: Access Denied');
  //   });
  // }

  render() {
    const mySessionId = this.state.mySessionId;
    const myUserName = this.state.myUserName;

    return (
      <div className='container'>
        {this.state.session === undefined ? (
          <div id='join'>
            <div id='img-div'>
              <img src='resources/images/openvidu_grey_bg_transp_cropped.png' alt='OpenVidu logo' />
            </div>
            <div id='join-dialog' className='jumbotron vertical-center'>
              <h1> Join a video session </h1>
              <form className='form-group' onSubmit={this.joinSession}>
                <p>
                  <label>닉네임 </label>
                  <input
                    className='form-control'
                    type='text'
                    id='userName'
                    value={myUserName}
                    onChange={this.handleChangeUserName}
                    required
                  />
                </p>
                <p>
                  <label>세션ID</label>
                  <input
                    className='form-control'
                    type='text'
                    id='sessionId'
                    value={mySessionId}
                    onChange={this.handleChangeSessionId}
                    required
                    readOnly
                  />
                </p>
                <p className='text-center'>
                  <input
                    className='btn btn-lg btn-success'
                    name='commit'
                    type='submit'
                    value='참여하기'
                  />
                </p>
              </form>
              <button className='btn btn-lg btn-primary' onClick={this.clip}>
                공유하기
              </button>
            </div>
          </div>
        ) : null}

        {this.state.session !== undefined ? (
          <div id='session'>
            <div id='session-header'>
              <h1 id='session-title'>{mySessionId}</h1>
              <input
                className='btn btn-large btn-danger'
                type='button'
                id='buttonLeaveSession'
                onClick={this.leaveSession}
                value='Leave session'
              />
              <input
                className='btn btn-large btn-success'
                type='button'
                id='buttonSwitchCamera'
                onClick={this.switchCamera}
                value='Switch Camera'
              />
            </div>

            <div>
              <button className='btn btn-lg btn-primary' onClick={this.clip}>
                공유하기
              </button>
              <input
                className='btn btn-large btn-primary'
                type='button'
                onClick={this.toggleAudio}
                value={this.state.isAudioMuted ? 'Unmute Audio' : 'Mute Audio'}
              />
              <input
                className='btn btn-large btn-primary'
                type='button'
                onClick={this.toggleVideo}
                value={this.state.isVideoMuted ? 'Unmute Video' : 'Mute Video'}
              />
              <input
                className='btn btn-large btn-primary'
                type='button'
                onClick={this.toggleSpeaker}
                value={this.state.isSpeakerMuted ? 'Unmute Speaker' : 'Mute Speaker'}
              />
              <input
                className='btn btn-large btn-info'
                type='button'
                onClick={() => this.setState({ isChatOpen: !this.state.isChatOpen })}
                value={this.state.isChatOpen ? 'Chatting on' : 'Chatting Off'}
              />
              <input
                className='btn btn-large btn-primary'
                type='button'
                onClick={this.publishScreenShare}
                value='화면공유'
              />
            </div>

            {this.state.mainStreamManager !== undefined ? (
              <div id='main-video' className='col-md-6'>
                <UserVideoComponent streamManager={this.state.mainStreamManager} />
              </div>
            ) : null}
            <div id='video-container' className='col-md-6'>
              {/* {this.state.publisher !== undefined ? (
                <div
                  className="stream-container col-md-6 col-xs-6"
                  onClick={() => this.handleMainVideoStream(this.state.publisher)}
                >
                  <UserVideoComponent streamManager={this.state.publisher} />
                </div>
              ) : null} */}
              {this.state.subscribers.map((sub, i) => (
                <div
                  key={sub.id}
                  className='stream-container col-md-6 col-xs-6'
                  onClick={() => this.handleMainVideoStream(sub)}
                >
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
              {this.state.isChatOpen && (
                <div id='chat-container' className={chatClass}>
                  {/* Chat component will be here */}
                  채팅창입니다! 여기
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */
  async getToken() {
    const sessionId = await this.createSession(this.state.mySessionId);
    return await this.createToken(sessionId);
  }

  async createSession(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/chat/sessions',
      { customSessionId: sessionId },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The sessionId
  }

  async createToken(sessionId) {
    const response = await axios.post(
      APPLICATION_SERVER_URL + 'api/chat/sessions/' + sessionId + '/connections',
      {},
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data; // The token
  }
}
