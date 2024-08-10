import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import routes from './routes.js';

import MainPage from './components/pages/ChatPage.jsx';
import Login from './components/pages/LoginPage.jsx';
import Signup from './components/pages/SignupPage.jsx';
import NotFound from './components/pages/404.jsx';
import NavbarComponent from './components/NavbarComponent.jsx';

import AuthContext from './contexts/index.jsx';
import useAuth from './hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [loggedIn, setLoggedIn] = useState(userData || null);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('user');
    setLoggedIn(false);
  };

  const getAuthHeader = () => {
    if (userData && userData.token) {
      return { Authorization: `Bearer ${userData.token}` };
    }

    return {};
  };

  return (
    <AuthContext.Provider value={{
      loggedIn, logIn, logOut, getAuthHeader,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return auth.loggedIn ? (
    children
  ) : (
    <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <AuthProvider>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route
            path={routes.chatPagePath()}
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path={routes.loginPagePath()} element={<Login />} />
          <Route path={routes.signupPagePath()} element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </div>
);

export default App;
