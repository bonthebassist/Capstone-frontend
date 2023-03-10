import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useContext } from 'react'
import { AuthContext } from "../context/AuthProvider"
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import HorizontalLogo from '../Chuta-logo-horizontal-01.svg'
import HorizontalLogoWhite from '../Chuta-logo-horizontal-white-01.svg'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

function NavbarBoots() {
  
  //Context
  const { auth, setAuth } = useContext(AuthContext)

  //Log out function
  const Logout = () => {
    console.log("in the logout function")
    setAuth({ user_id: "", token: "" })
    localStorage.clear();
  }

  return (
    <>
      {[true, 'sm', 'md'].map((expand) => (
        <Navbar key={expand} fixed="top" expand={expand} className="mb-3" bg="dark" variant="dark">
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand to="/" id="site-title">
                <img
                  src={HorizontalLogoWhite}
                  height='40'
                  alt='Chuta'
                  loading='lazy'
                />
              </Navbar.Brand>

            </LinkContainer>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}><Icon icon="charm:menu-hamburger" color="white" width="30" height="30" /></Navbar.Toggle>
            <Navbar.Offcanvas

              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <img
                    src={HorizontalLogo}
                    height='50'
                    alt='Chuta'
                    loading='lazy'
                  />
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">

                  {!auth.user_id ?
                    <>
                      <LinkContainer to="/Login">
                        <Nav.Link>Login</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/Register">
                        <Nav.Link>Sign Up</Nav.Link>
                      </LinkContainer>
                    </>
                    :
                    <>
                      <LinkContainer to="/Home">
                        <Nav.Link>Home</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/Schools">
                        <Nav.Link>Schools</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/Students">
                        <Nav.Link>Students</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/Attendance">
                        <Nav.Link>Attendance</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/Invoice">
                        <Nav.Link>Invoicing</Nav.Link>
                      </LinkContainer>
                      <LinkContainer to="/MyDetails">
                        <Nav.Link>My Details</Nav.Link>
                      </LinkContainer>
                      <Button variant="light" onClick={Logout}><span className='stealth-link'><Link to="/">Logout</Link></span></Button>
                    </>
                  }

                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavbarBoots;