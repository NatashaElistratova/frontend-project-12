import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/index.jsx';

const NavbarComponent = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <Navbar bg="white" data-bs-theme="light" shadow="sm" className="justify-content-between">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn
          ? (
            <Button type="button" onClick={() => auth.logOut()}>
              {t('actions.logout')}
            </Button>
          ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
