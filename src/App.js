import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Row} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import firebase from 'firebase'

// TODO: chat protecton from unauth-users
class App extends Component {
  async onLogOut(event) {
    await firebase.auth().signOut()
    window.location = "/login"
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged(
      user => {
        this.forceUpdate();
      },
      error => {
        debugger
      }
    )
  }

  componentWillUnmount() {
    this.unsubscribe();
  }


  render() {
    const user = firebase.auth().currentUser
    let userStatus = null;
    if (user) {
      userStatus = (
        <Nav pullRight>
          <Navbar.Text> {user.email} </Navbar.Text>
          <NavItem eventKey={1} href="#" onClick={this.onLogOut.bind(this)}>Log Out</NavItem>
        </Nav>
      );
    }


    return (
      <div style={{width: '90%', margin: 'auto'}}>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Altoros</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <LinkContainer to={'/login'}>
                <NavItem eventKey={1} href="#">Log In</NavItem>
              </LinkContainer>

              <LinkContainer to={'/signup'}>
                <NavItem eventKey={2} href="#">Sign Up</NavItem>
              </LinkContainer>

              <LinkContainer to={'/chat'}>
                <NavItem eventKey={3} href="#">Chat</NavItem>
              </LinkContainer>
            </Nav>

            {userStatus}

          </Navbar.Collapse>
        </Navbar>

        <Row>
          {this.props.children}
        </Row>
      </div>
    );
  }
}

export default App;
