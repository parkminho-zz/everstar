import { Route, Routes } from 'react-router-dom';
import { MyInfo } from 'components/templates/MyInfo';
export const MyPage: React.FC = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow'>
        <Routes>
          <Route path='/' element={<MyInfo />} />
        </Routes>
      </div>
    </div>
  );
};
