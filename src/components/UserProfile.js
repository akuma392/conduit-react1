import React from 'react';
import { Profile_URL } from '../utils/constant';
import FullPageSpinner from './FullPageSpinner';
import User from './User';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };
  }

  componentDidMount() {
    fetch(Profile_URL, {
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
      .then(({ user }) => this.setState({ user: user }))
      .catch((errors) => console.log(errors));
  }

  render() {
    if (this.state.user) {
      return <FullPageSpinner />;
    }

    return (
      <>
        <User />
      </>
    );
  }
}

export default UserProfile;
