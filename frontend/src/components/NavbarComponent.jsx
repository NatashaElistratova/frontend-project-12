import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { logOut } from '../slices/authSlice';

const NavbarComponent = () => {
  const user = useSelector((state) => state.auth.user);
  const { t } = useTranslation();

  return (
    <Navbar bg="white" data-bs-theme="light" shadow="sm" className="justify-content-between">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {user.token
          ? (
            <Button type="button" onClick={() => logOut()}>
              {t('actions.logout')}
            </Button>
          ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
