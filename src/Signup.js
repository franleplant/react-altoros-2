import React, { Component } from 'react';
import {Col, Panel, Alert, FormGroup, FormControl, ControlLabel, Button} from 'react-bootstrap';
import firebase from 'firebase';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      fields: {}
    }
  }

  handleOnChange(fieldName, event) {
    const value = event.target.value;
    this.setState(state => {
      state.fields[fieldName] = value;
      return state;
    })
  }

  async onSubmit(event) {
    event.preventDefault();
    this.setState({
      error: ''
    })

    const { email, password } = this.state.fields;

    try {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
      window.location = '/chat'

    } catch (error) {
      this.setState({
        error: `${error.message} (Error Code: ${error.code})`
      });
    }
  }

  render() {
    const autocontrol = fieldName => ({
      name: fieldName,
      value: this.state.fields[fieldName] || "",
      onChange: this.handleOnChange.bind(this, fieldName),
    })


    let errorMessage = null;
    if (this.state.error) {
      errorMessage = (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>Oh snap! You got an error!</h4>
          <p>{this.state.error}</p>
        </Alert>
      )
    }

    return (
      <Col xs={12} md={6}>
        <Panel>
          <form onSubmit={this.onSubmit.bind(this)}>
            <FormGroup>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                placeholder="john@doe.com"
                type="email"
                required
                {...autocontrol('email')}
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                placeholder=""
                required
                {...autocontrol('password')}
              />
            </FormGroup>

            <Button bsStyle="primary" className="pull-right" type="submit">Sign Up</Button>
          </form>

          {errorMessage}

        </Panel>
      </Col>
    );
  }
}
