import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import useAuth from '../hooks/useAuth';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
  const {roles, isAdmin, status, isUser} = useAuth()
  console.log(roles, isAdmin, status, isUser);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">Theater</Navbar.Brand>
          <Nav className="ml-auto ">
            {(!isAdmin) && (!isUser) && <Nav.Link href="/">Home</Nav.Link> }
            {(!isAdmin) && (!isUser) && <Nav.Link href="/register">Register</Nav.Link> }
            {(!isAdmin) && (!isUser) && <Nav.Link href="/login">Login</Nav.Link> }
            
            {(isUser) && <Nav.Link href="/dash/booking">showToBook</Nav.Link>}
            {(isUser) && <Nav.Link href="/dash/booking/tickets">Tickets</Nav.Link>}
            {(isUser) && <Nav.Link href="/dash/booking/profile">Profile</Nav.Link>}
             
            
            {/* {(isAdmin) && <Nav.Link href="/dash/booking">showToBook</Nav.Link>} */}
            {(isAdmin)&& <Nav.Link href="/dash/Admin/user">UserList</Nav.Link>}
            {(isAdmin)&& 

              <NavDropdown
              id="nav-dropdown-dark-example"
              title="Movie"
              menuVariant="dark"
              >
              <NavDropdown.Item href="#action/3.1"><Nav.Link href="/dash/Admin/movie">movies List</Nav.Link></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"><Nav.Link href="/dash/Admin/movie/new">Create New Movie</Nav.Link></NavDropdown.Item>
              </NavDropdown>
            
            }
            {(isAdmin)&& 

              <NavDropdown
              id="nav-dropdown-dark-example"
              title="Shows"
              menuVariant="dark"
              >
              <NavDropdown.Item href="#action/3.1"><Nav.Link href="/dash/Admin/show">Shows List</Nav.Link></NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2"><Nav.Link href="/dash/Admin/show/new">Create New Show</Nav.Link></NavDropdown.Item>
              </NavDropdown>

              }
            {(isAdmin)&& <Nav.Link href="/dash/booking/profile">Profile</Nav.Link>}
          </Nav>
        </Container>
      </Navbar>
    </> 
)}


export default Header