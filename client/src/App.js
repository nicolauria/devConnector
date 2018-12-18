import React, { Component } from 'react';
import NavBar from './components/layout/Navbar';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <h1>My React App</h1>
      </div>
    );
  }
}

export default App;
