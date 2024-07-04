import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const NavbarComponent = () => (
  <Navbar bg="white" data-bs-theme="light" shadow="sm">
    <Container>
      <Navbar.Brand href="/">MY AWESOME CHAT</Navbar.Brand>
    </Container>
  </Navbar>
);

export default NavbarComponent;
