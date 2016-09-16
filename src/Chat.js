import React, { Component } from 'react';
import {Col, Panel, Label, Glyphicon, Form, FormControl, Button, ListGroup, ListGroupItem} from 'react-bootstrap';
import firebase from 'firebase';
import getUserColor from './color.js';

let Messages
let Userlist


export default class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      chatHeight: 100,
      userlist: [],
      messages: [],
      fields: {
        message: '',
      },
    }
  }


  componentDidMount() {
    //
    // Layout calculation
    //
    const viewportHeight = document.documentElement.clientHeight
    const navHeight = document.querySelector('.navbar-inverse').clientHeight
    const tol = 100;
    const chatHeight = viewportHeight - navHeight - tol;

    this.setState({ chatHeight })


    //
    // Data init
    //
    Messages = firebase.database().ref('messages')
    Userlist = firebase.database().ref('userlist')

    // Update online-userlist
    const user = firebase.auth().currentUser;
    const userRef = Userlist.push({
      user: user.email,
    });

    this.userlistId = userRef.key;

    // Get userlist and listen for changes
    Userlist.on('value', snapshot => {
      const userlistMap = snapshot.val();
      const userlist = Object.keys(userlistMap || []).map(id => userlistMap[id]);
      this.setState({ userlist })
    });


    // Get messages and listen to new ones
    Messages.on('value', snapshot => {
      const messageMap = snapshot.val() || [];
      const messages = Object.keys(messageMap).map(id => messageMap[id])
      this.setState({ messages })
    });

    // Cleanup
    window.addEventListener('beforeunload', this.componentWillUnmount.bind(this));
  }

  async componentWillUnmount() {

    Messages.off()
    Userlist.off()

    try {
    // remove user entry of the userlist
      await firebase.database().ref(`userlist/${this.userlistId}`).remove()
    } catch(err) {
      console.error(err)
      debugger;
    }
  }

  componentDidUpdate() {
    // Scroll to the bottom of the chat
    this.chat.scrollTop = this.chat.scrollHeight
  }



  handleSend(event) {
    event.preventDefault();
    const user = firebase.auth().currentUser;
    const message = this.state.fields.message;

    // Push new message
    Messages.push({
      user: user.email,
      message: message,
    });

    this.setState(state => {
      state.fields.message = ''
      return state;
    })
  }

  handleMessageChange(event) {
    const value = event.target.value;
    this.setState(state => {
      state.fields.message = value;
      return state;
    })
  }

  render() {

    const { userlist, messages } = this.state;


    return (
      <div>
        <Col xs={8}>
          <div>
            <Panel>
              <div
                ref={ref => this.chat = ref}
                style={{
                  height: `${this.state.chatHeight}px`,
                  overflow: 'scroll'
                }}
              >
                {messages.map((msg, index) => (
                  <p key={index}>
                    <Label bsStyle={getUserColor(msg.user)}>{msg.user}</Label>
                    <span style={{marginLeft: '10px'}}>{msg.message}</span>
                  </p>
                ))}
              </div>
            </Panel>
        </div>
        </Col>
        <Col xs={4}>
          <Panel style={{height: `${this.state.chatHeight}px`}}>
            <ListGroup fill>
              {userlist.map((f, index) => (
                <ListGroupItem key={index} href="#">
                <Glyphicon glyph="ok-sign" style={{color: 'green'}} />&nbsp;
                {f.user}
                </ListGroupItem>
            ))}
          </ListGroup>
        </Panel>
      </Col>

      {/* TODO: this can be abstracted into a component */}
      <Form onSubmit={this.handleSend.bind(this)}>
        <Col xs={10}>
          <FormControl
            value={this.state.fields.message}
            onChange={this.handleMessageChange.bind(this)}
            type="text"
            placeholder="start typing"
          />
        </Col>

        <Col xs={2}>
          <Button type="submit" disabled={!this.state.fields.message}>Send</Button>
        </Col>
      </Form>

    </div>
  );
}
}
