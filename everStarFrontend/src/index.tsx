import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Store } from './store/Store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const persistor = persistStore(Store);

root.render(
  <Provider store={Store}>
    <App />
    {/* <PersistGate loading={null} persistor={persistor}>
    </PersistGate> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
// serviceWorkerRegistration.unregister();  // 필요 시 주석 해제
serviceWorkerRegistration.register();
