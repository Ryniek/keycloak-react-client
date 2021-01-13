import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import Welcome from './Welcome';
import Secured from './Secured';
import './App.css';
import axios from 'axios';
import Keycloak from 'keycloak-js';

class App extends Component {

  state = {
    response : '',
  }

  callApiGet = () => {
    axios.get(`https://api-gateway-zagle.herokuapp.com/hello` , {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(res => {
        this.setState({ response : res.data });
        console.log('Odpowiedz serwera: ' + res.data)
      })
      .catch(() => console.log("Coś nie tak ;p"))
  }

  removeToken = () => {
    localStorage.removeItem('token')
    console.log('Wylogowano - usunięto token')
    const keycloak = Keycloak('/keycloak.json');
    axios.get('https://zagle-app-kejlok.herokuapp.com/auth/realms/zagle/protocol/openid-connect/logout?id_token_hint=' + keycloak.get('idToken'));
    console.log('Wylogowano - usunięto sesję')
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <ul>
            <li><Link to="/">public component</Link></li>
            <li><Link to="/secured">secured component</Link></li>
            <li onClick={this.callApiGet}>Kliknij by wywołać GET /hello z backendu</li>
            <p>{this.state.response}</p>
            <li onClick={this.removeToken}><Link to="/">Logout</Link></li>
          </ul>
          <Route exact path="/" component={Welcome} />
          <Route path="/secured" component={Secured} />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
