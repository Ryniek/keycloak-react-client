import React, { Component } from 'react';
import Keycloak from 'keycloak-js';
import axios from 'axios';

class Secured extends Component {


  constructor(props) {
    super(props);
    this.state = { keycloak: null, authenticated: false};
  }

  componentDidMount() {
    const keycloak = Keycloak('/keycloak.json');
    keycloak.init({onLoad: 'login-required', promiseType: 'native'}).then(authenticated => {
      this.setState({ keycloak: keycloak, authenticated: authenticated})
      localStorage.setItem('token', keycloak.token)
      localStorage.setItem('idToken', keycloak.idToken);
      console.log(localStorage.getItem('token'));
      console.log(keycloak);
    })
  }

  render() {
    if (this.state.keycloak) {
      if (this.state.authenticated) return (
        <div>
          <p>Jesteś uwierzytelniony</p>
        </div>
      ); else return (<div>Unable to authenticate!</div>)
    }
    return (
      <div>Initializing Keycloak...</div>
    );
  }
}
export default Secured;