import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

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
      <div className='container'>
        <Routes>
          <Route path='/' element={<SplashPage />} />
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
