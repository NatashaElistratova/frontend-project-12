import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

function NavbarComponent() {
    return (
        <Navbar bg="white" data-bs-theme="light" shadow="sm" fixed="top">
            <Container>
                <Navbar.Brand href="/">MY AWESOME CHAT</Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default NavbarComponent;
