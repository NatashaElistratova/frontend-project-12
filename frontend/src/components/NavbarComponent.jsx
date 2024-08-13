import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../slices/authSlice';
import routes from '../routes';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  const handleLogout = () => {
    dispatch(logOut());
    navigate(routes.loginPagePath());
  };

  return (
    <Navbar bg="white" data-bs-theme="light" shadow="sm" className="justify-content-between">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {user.token
          ? (
            <Button role="button" type="button" onClick={handleLogout}>
              {t('actions.logout')}
            </Button>
          ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
