import React, { Component } from 'react';
import './App.css';
import Upload from './pages/Upload';
import Search from './pages/Search';
import MenuBar from './components/MenuBar';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  state = { activeItem: 'bio' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className="App-content">
          <BrowserRouter>
            <MenuBar />
            <Route exact path="/" component={Upload} />
            <Route path="/upload" component={Upload} />
            <Route path="/search" component={Search} />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
