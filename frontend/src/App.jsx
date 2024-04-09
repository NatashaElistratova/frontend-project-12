import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './Components/Pages/MainPage';
import Login from './Components/Pages/Login';
import NotFound from './Components/Pages/404';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;