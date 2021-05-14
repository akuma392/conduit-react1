import React from 'react';

import { Route, Switch } from 'react-router-dom';

import { verify_URL } from '../utils/constant';
import { localStorageKey } from '../utils/constant';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import SinglePost from './SinglePost';
import FullPageSpinner from './FullPageSpinner';
import Profile from './Profile';
import Setting from './Setting';
import NewPost from './NewPost';
import NoMatch from './NoMatch';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      user: null,
      isVerifying: true,
    };
  }

  componentDidMount() {
    let key = localStorage[localStorageKey];
    if (key) {
      fetch(verify_URL, {
        method: 'GET',
        headers: {
          authorization: `Token ${key}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        })
        .then(({ user }) => this.updatedUser(user))
        .catch((errors) => console.log(errors));
    } else {
      this.setState({ isVerifying: false });
    }
  }

  updatedUser = (user) => {
    this.setState({
      isLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem(localStorageKey, user.token);
  };

  render() {
    if (this.state.isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <>
        <Header state={this.state} />
        {this.state.isLoggedIn ? (
          <LoggedInUser />
        ) : (
          <UnAuthenticatedApp updatedUser={this.updatedUser} />
        )}
      </>
    );
  }
}

function LoggedInUser(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/new-post">
        <NewPost />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/setting">
        <Setting />
      </Route>
      <Route path="/articles/:slug" component={SinglePost} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
function UnAuthenticatedApp(props) {
  return (
    <Switch>
      <Route path="/" exact>
        <Home />
      </Route>
      <Route path="/signup">
        <Signup updatedUser={props.updatedUser} />
      </Route>
      <Route path="/login">
        <Login updatedUser={props.updatedUser} />
      </Route>
      <Route path="/articles/:slug" component={SinglePost} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
export default App;