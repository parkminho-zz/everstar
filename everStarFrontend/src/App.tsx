import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainPage from './pages/MainPage';
import SignUpPage from './pages/SignUpPage';

import { Header } from './components/molecules/Header/Header';

// 리액트 쿼리 클라이언트 생성
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className='container'>
          <Header type='everstar' />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/signup' element={<SignUpPage />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
