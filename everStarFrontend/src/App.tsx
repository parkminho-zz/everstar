import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from 'pages/LoginPage';
import { MyPage } from 'pages/MyPage';
import { EverstarPage } from 'pages/EverstarPage';
import { TutorialPage } from 'pages/TutorialPage';
import { EarthPage } from 'pages/EarthPage';
import { SplashPage } from 'pages/SplashPage';
import { ProfilePage } from 'pages/ProfilePage';
import { SignUpPage } from 'pages/SignUpPage';

function App() {
  return (
    <Router>
      <div className='flex flex-col items-center justify-center w-screen h-screen overflow-hidden'>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/splash' element={<SplashPage />} />
          <Route path='/signup/*' element={<SignUpPage />} />
          <Route path='/profile/*' element={<ProfilePage />}></Route>
          <Route path='/tutorial' element={<TutorialPage />}></Route>
          <Route path='/earth/*' element={<EarthPage />}></Route>
          <Route path='/everstar/*' element={<EverstarPage />}></Route>
          <Route path='/mypage/*' element={<MyPage />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
