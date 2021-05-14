import React from 'react';

import { Route } from 'react-router-dom';

import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import SinglePost from './SinglePost';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: null,
    };
  }
  updatedUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
    });
  };

  render() {
    return (
      <>
        <Header state={this.state} />

        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup">
          <Signup updatedUser={this.updatedUser} />
        </Route>
        <Route path="/login">
          <Login updatedUser={this.updatedUser} />
        </Route>
        <Route path="/articles/:slug" component={SinglePost} />
      </>
    );
  }
}

export default App;
