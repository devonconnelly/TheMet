import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { searchHistoryAtom } from '@/store';
import { useAtom } from 'jotai';
import { addToHistory } from '@/lib/userData';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
    const [searchField, setSearchField] = useState()
    const [isExpanded, setIsExpanded] = useState(false)
    const router = useRouter()
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)
    let token = readToken()
    
    async function submitForm(e) {
        e.preventDefault()
        setIsExpanded(false)
        setSearchHistory(await addToHistory(`title=true&q=${searchField}`)) 

        router.push('/artwork?title=true&q=' + searchField)

    }

    function logout() {
      setIsExpanded(false)
      removeToken()
      router.push('/login')
    }
  
    
  return (
    <>
    <Navbar expanded={isExpanded} expand="lg" className="fixed-top navbar-dark bg-primary">
      <Container>
        <Navbar.Brand>Devon Connelly</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={(() => setIsExpanded(!isExpanded))} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link legacyBehavior passHref active={router.pathname === "/"} href="/" onClick={(() => setIsExpanded(false))}>Home</Nav.Link>
            {token && <Nav.Link legacyBehavior passHref active={router.pathname === "/search"} href="/search" onClick={(() => setIsExpanded(false))}>Advanced Search</Nav.Link>}
          </Nav>
          {!token && 
          <Nav>
            <Nav.Link legacyBehavior passHref active={router.pathname === "/register"} href="/register" onClick={(() => setIsExpanded(false))}>Register</Nav.Link>
            <Nav.Link legacyBehavior passHref active={router.pathname === "/login"} href="/login" onClick={(() => setIsExpanded(false))}>Login</Nav.Link>
          </Nav>
          }
          &nbsp;{token && <Form className="d-flex" onSubmit={submitForm}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>}&nbsp;
            <Nav>
              {token &&
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <Link legacyBehavior passHref active={router.pathname === "/favourites"} href="/favourites" >
                  <NavDropdown.Item onClick={(() => setIsExpanded(false))}>Favourites</NavDropdown.Item>
                </Link>
                <Link legacyBehavior passHref active={router.pathname === "/history"} href="/history" >
                  <NavDropdown.Item onClick={(() => setIsExpanded(false))}>Search History</NavDropdown.Item>
                </Link>
                <NavDropdown.Item onClick={(() => logout())}>Log Out</NavDropdown.Item>
              </NavDropdown>}
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <br />
    <br />
    </>
  )
}
