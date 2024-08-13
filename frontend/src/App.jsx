import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import routes from './routes.js';

import MainPage from './components/pages/ChatPage.jsx';
import Login from './components/pages/LoginPage.jsx';
import Signup from './components/pages/SignupPage.jsx';
import NotFound from './components/pages/404.jsx';
import NavbarComponent from './components/NavbarComponent.jsx';

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  return user.token ? (
    children
  ) : (
    <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

const App = () => (
  <div className="d-flex flex-column h-100">
    <BrowserRouter>
      <NavbarComponent />
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
  </div>
);

export default App;
