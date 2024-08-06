import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyCK8xtwPUso_WTxQpBS4GLfC4NLGIKL92U',
  authDomain: 'everstar-73a1c.firebaseapp.com',
  projectId: 'everstar-73a1c',
  storageBucket: 'everstar-73a1c.appspot.com',
  messagingSenderId: '215819035225',
  appId: '1:215819035225:web:c802133116dada08960748',
  measurementId: 'G-ZQ7RN4F560',
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log('권한 요청 중...');

  const permission = await Notification.requestPermission();
  if (permission === 'denied') {
    console.log('알림 권한 허용 안됨');
    return;
  }

  console.log('알림 권한이 허용됨');

  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_VAPIDKEY,
  });

  if (token) console.log('token :', token);
  else console.log('Can not get Token');

  onMessage(messaging, (payload) => {
    console.log('메시지가 도착했습니다.', payload);
    // ...
  });
}
requestPermission();

// Service Worker 등록 코드
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker 등록 성공1:', registration);
    })
    .catch((error) => {
      console.log('Service Worker 등록 실패:', error);
    });
}
