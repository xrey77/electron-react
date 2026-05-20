import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import logo from '../assets/images/icon.png';
import Login from './Login';
import Register from './Register';

export default function Header() {
    const [expanded, setExpanded] = useState(false);
    const [loginShow, setLoginShow] = useState(false); 
    const [registerShow, setRegisterShow] = useState(false); 

    const [username, setUsername] = useState<string>('');
    const [userpic, setUserpic] = useState<string>('');
  
    useEffect(() => {
      const usrname = sessionStorage.getItem('USERNAME');
      const usrpic = sessionStorage.getItem("USERPIC");
    
      if (usrname) setUsername(usrname);
      else setUsername(''); // Default
    
      if (usrpic) setUserpic(usrpic);
      else setUserpic('/images/pix.png');
    },[]);
  
    const Logout = () => {
      sessionStorage.removeItem('USERID');
      sessionStorage.removeItem('USERNAME');
      sessionStorage.removeItem('USERPIC');
      sessionStorage.removeItem('TOKEN');
      location.reload();
    }

    const handleLoginClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        setLoginShow(true);
        setExpanded(false); 
    }

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault(); 
        setRegisterShow(true);
        setExpanded(false); 
    }




    return (
        <>
        <Navbar 
            bg="warning"
            variant="warning"
            expanded={expanded}>
        <Container>
          <Navbar.Brand href="/"><img className='logo' src={logo} alt='' /><span>&nbsp;ELECTRON REACT</span></Navbar.Brand>
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-left">                
              <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/">Home</Nav.Link>
              <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/aboutus">About Us</Nav.Link>
              <Nav.Link as={Link} onClick={() => setExpanded(false)} to="/contactus">Contact Us</Nav.Link>
            </Nav>

            <Nav className="ms-auto">                
              <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>              
              <Nav.Link onClick={handleRegisterClick}>Register</Nav.Link>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>        
      <Login show={loginShow} onHide={() => setLoginShow(false)} />      
      <Register show={registerShow} onHide={() => setRegisterShow(false)} />      

      </>
    );
}