import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import routes from './routes.js';

import MainPage from './Components/Pages/ChatPage.jsx';
import Login from './Components/Pages/LoginPage.jsx';
import NotFound from './Components/Pages/404';
import NavbarComponent from './Components/NavbarComponent';

import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(userData ? userData : null);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

function App() {
  return (
    <div className="h-100">
      <NavbarComponent></NavbarComponent>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.chatPagePath()} element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            } />
            <Route path={routes.loginPagePath()} element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;