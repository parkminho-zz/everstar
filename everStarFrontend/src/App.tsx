import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { MyPage } from 'pages/MyPage';
import { EverstarPage } from 'pages/EverstarPage';
import { TutorialPage } from 'pages/TutorialPage';
import { EarthPage } from 'pages/EarthPage';
import { SplashPage } from 'pages/SplashPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SignUpPage } from 'pages/SignUpPage';
import { LoginPage } from 'pages/LoginPage';
import { OAuthCallback } from 'pages/OAuthCallback';
import { Store, persistor } from 'store/Store'; // Store와 persistor를 가져옵니다.

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className='container'>
              <Routes>
                <Route path='/' element={<SplashPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup/:userEmail*' element={<SignUpPage />} />
                <Route path='/profile/*' element={<ProfilePage />}></Route>
                <Route path='/tutorial' element={<TutorialPage />}></Route>
                <Route path='/earth/*' element={<EarthPage />}></Route>
                <Route path='/everstar/*' element={<EverstarPage />}></Route>
                <Route path='/mypage/*' element={<MyPage />}></Route>
                <Route path='/oauth/*' element={<OAuthCallback />} />
              </Routes>
            </div>
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
