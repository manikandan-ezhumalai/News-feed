import React, { Component } from 'react';


import {BrowserRouter, Route, Switch} from 'react-router-dom';


import Nav from './components/Nav';
import NotFound from './components/NotFound';

import Home from './pages/Home';
import Search from './pages/Search';
import Sources from './pages/Sources';
import About from './pages/About';
import TweetFeed from './pages/Tweet';

class App extends Component {
  
  constructor() {
    super();

    this.state = {
      windowWidth: window.innerWidth,
      showDrawer: false,
      searchKeyword: ''
    }
  }
  
  async updateWidth(){ //Monitors window width and minimizes drawer at > 900px
    await this.setState({
      windowWidth: window.innerWidth
    })

    if (this.state.windowWidth > 900) {
      this.setState({
        showDrawer: false
      })
    }
  }

  toggleDrawer() {
    this.setState({
      showDrawer: !this.state.showDrawer
    })
  }

  closeDrawer() {
    this.setState({
      showDrawer: false
    })
  }

  componentWillMount() {
    window.addEventListener('resize', this.updateWidth.bind(this))
  }
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Nav closeDrawer = {this.closeDrawer.bind(this)} toggleDrawer = {this.toggleDrawer.bind(this)}  showDrawer = {this.state.showDrawer} />
          <Switch>
            <Route exact path = '/' component = {Home} />
            <Route exact path = '/search/:id' component = {Search} />
            <Route exact path = '/sources' component = {Sources} />
            <Route exact path = '/about' component = {About} />
            <Route exact path = '/tweet' component = {TweetFeed} />
            <Route component = {NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
