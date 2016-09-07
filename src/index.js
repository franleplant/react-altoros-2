import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router'
import firebase from 'firebase';
import App from './App';
import Chat from './Chat'
import Signup from './Signup'
import Login from './Login'

 // Initialize Firebase
const config = {
  apiKey: "AIzaSyB7nQIBUUYchIekvxQnrtb4Adcfoiz-m1Y",
  authDomain: "react-chat-3e357.firebaseapp.com",
  databaseURL: "https://react-chat-3e357.firebaseio.com",
  storageBucket: "",
};

firebase.initializeApp(config);


ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="chat" component={Chat}/>
      <Route path="signup" component={Signup}/>
      <Route path="login" component={Login}/>
    </Route>
  </Router>
), document.getElementById('root'))
