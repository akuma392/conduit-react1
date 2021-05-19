import React from 'react';
import { Profile_URL } from '../utils/constant';
import FullPageSpinner from './FullPageSpinner';
import User from './User';
import { withRouter } from 'react-router-dom';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isFollowing: false,
    };
  }

  componentDidMount() {
    let username = this.props.match.params.username;
    console.log(username);
    fetch(Profile_URL + `/${username}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(({ errors }) => {
          return Promise.reject(errors);
        });
      })
      .then(({ profile }) => this.setState({ user: profile }))
      .catch((errors) => console.log(errors));
  }
  followUser = (username) => {
    fetch(Profile_URL + `/${username}` + '/follow', {
      method: 'POST',
      headers: {
        authorization: `Token ${this.props.user.token}`,
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
      .then(({ profile }) => {
        this.setState({ isFollowing: true, user: profile });
      })
      .catch((errors) => console.log(errors));
  };
  unFollowUser = (username) => {
    fetch(Profile_URL + `/${username}` + '/follow', {
      method: 'DELETE',
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then(({ profile }) => {
        this.setState({ isFollowing: false });
        this.props.history.push(`/profiles/${profile.username}`);
      })
      .catch((errors) => console.log(errors));
  };
  render() {
    console.log(this.props.user, 'do you know');
    if (!this.state.user) {
      return <FullPageSpinner />;
    }

    return (
      <>
        <User
          profile={this.state.user}
          followUser={this.followUser}
          unFollowUser={this.unFollowUser}
          isFollowing={this.state.isFollowing}
          user={this.props.user}
        />
      </>
    );
  }
}

export default withRouter(UserProfile);
