import React, { Component } from 'react';
import {Col, Panel, Alert, FormGroup, FormControl, ControlLabel, Button, ListGroup, ListGroupItem} from 'react-bootstrap';

export default class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chatHeight: 100,
    }
  }


  componentDidMount() {
    const viewportHeight = document.documentElement.clientHeight
    const navHeight = document.querySelector('.navbar-inverse').clientHeight
    const tol = 100;
    const chatHeight = viewportHeight - navHeight - tol;

    this.setState({ chatHeight })

    //this.compose.focus();
  }


  render() {
    const friends = [
      {name: 'Fran'},
      {name: 'Lucas'},
    ]


    return (
      <div>
        <Col xs={8}>
          <Panel style={{height: `${this.state.chatHeight}px`}}>
            I AM CHAT
          </Panel>
        </Col>
        <Col xs={4}>
          <Panel style={{height: `${this.state.chatHeight}px`}}>
            <ListGroup fill>
              {friends.map((f, index) => (
                <ListGroupItem key={index} href="#">{f.name}</ListGroupItem>
              ))}
            </ListGroup>
          </Panel>
        </Col>

        <Col xs={12}>
          <Panel ref={ref => this.compose = ref}>
            Text
          </Panel>
        </Col>

      </div>
    );
  }
}
