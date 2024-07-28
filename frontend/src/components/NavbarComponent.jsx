import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import useAuth from '../hooks/index.jsx';

const NavbarComponent = () => {
  const auth = useAuth();

  return (
    <Navbar bg="white" data-bs-theme="light" shadow="sm" className="justify-content-between">
      <Container>
        <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        {auth.loggedIn
          ? (
            <Button type="button" onClick={() => auth.logOut()}>
              Выйти
            </Button>
          ) : null}
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
