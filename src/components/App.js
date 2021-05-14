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
  }

  render() {
    return (
      <>
        <Header />

        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/articles/:slug" component={SinglePost} />
      </>
    );
  }
}

export default App;
