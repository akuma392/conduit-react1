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
import UserProfile from './UserProfile';
import UpdatePost from './UpdatePost';
import { UserProvider } from './UserContext';

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
    console.log(user, 'updateduser');
    this.setState({
      isLoggedIn: true,
      user,
      isVerifying: false,
    });
    localStorage.setItem(localStorageKey, user.token);
  };
  handleLogout = () => {
    localStorage.clear();
    this.setState({
      isLoggedIn: false,
      user: null,
    });
  };
  render() {
    let { isLoggedIn, isVerifying, user } = this.state;
    let { handleLogout, updatedUser } = this;

    if (isVerifying) {
      return <FullPageSpinner />;
    }
    return (
      <>
        <UserProvider value={{ isLoggedIn, user, handleLogout, updatedUser }}>
          <Header />
          {isLoggedIn ? (
            <LoggedInUser
              user={this.state.user}
              updatedUser={this.updatedUser}
              handleLogout={this.handleLogout}
            />
          ) : (
            <UnAuthenticatedApp updatedUser={this.updatedUser} />
          )}
        </UserProvider>
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
        <Setting
        // user={props.user}
        // updatedUser={props.updatedUser}
        // handleLogout={props.handleLogout}
        />
      </Route>
      {/* <Route path="/articles/:slug" component={SinglePost} /> */}

      <Route path="/articles/edit/:slug">
        <UpdatePost />
      </Route>
      <Route path="/articles/:slug">
        <SinglePost />
      </Route>
      {/* <Route path="/profiles/:username" component={UserProfile} /> */}
      <Route path="/profiles/:username">
        <UserProfile user={props.user} />
      </Route>
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
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/articles/:slug" component={SinglePost} />
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  );
}
export default App;
