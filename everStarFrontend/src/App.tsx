import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MyPage } from 'pages/MyPage';
import { EverstarPage } from 'pages/EverstarPage';
import { TutorialPage } from 'pages/TutorialPage';
import { EarthPage } from 'pages/EarthPage';
import { SplashPageRedirector } from 'pages/SplashPageRedirector';
import { SignUpPage } from 'pages/SignUpPage';
import { LoginPage } from 'pages/LoginPage';
import { OAuthCallback } from 'pages/OAuthCallback';
import './firebase-messaging-sw';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Routes>
            <Route path='/' element={<SplashPageRedirector />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/signup/:userEmail*' element={<SignUpPage />} />
            <Route path='/tutorial' element={<TutorialPage />} />
            <Route path='/earth/*' element={<EarthPage />} />
            <Route path='/everstar/:pet/*' element={<EverstarPage />} />
            <Route path='/pets/*' element={<EarthPage />} />
            <Route path='/mypage/*' element={<MyPage />} />
            <Route path='/oauth/*' element={<OAuthCallback />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
