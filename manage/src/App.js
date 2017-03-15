import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SignForm from './components/sign-form.js';

class App extends Component {
  render() {
    return (
      <div className="app">
        <nav>
          <img src={logo} className="app-logo" alt="logo" />
          <h2 className="app-intro">title</h2>
        </nav>
        <SignForm />
      </div>
    );
  }
}

export default App;
