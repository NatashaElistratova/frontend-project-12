import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import MainPage from './components/Pages/MainPage';
import Login from './components/Pages/Login';
import NotFound from './components/Pages/404';
import NavbarComponent from './components/NavbarComponent';

import AuthContext from './contexts/index.jsx';
// import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// const PrivateRoute = ({ children }) => {
//   const auth = useAuth();
//   const location = useLocation();

//   return (
//     auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
//   );
// };

function App() {
  return (
    <div className="h-100">
      <NavbarComponent></NavbarComponent>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
      
    </div>
    
  );
}

export default App;