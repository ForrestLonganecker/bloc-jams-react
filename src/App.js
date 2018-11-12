import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Library from './components/Library/Library';
import Album from './components/Album/Album';
import Logo from './data/patrick-hendry-396277-unsplash.jpg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
        <h1 className="App-title">Bloc Jams</h1>
          <nav>
            <Link className="App-Link" to='/'>Landing</Link>
            <img className="App-logo" src={Logo} alt="Leaf image logo" />
            <Link className="App-Link" to='/library'>Library</Link>
          </nav>
        </header>
        <main>
          <Route exact path='/' component={Landing} />
          <Route path='/library' component={Library} />
          <Route path='/album/:slug' component={Album} />
        </main>
      </div>
    );
  }
}

export default App;
