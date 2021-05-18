import React from 'react';
import { Profile_URL } from '../utils/constant';

class UserProfileHero extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowing: this.props.profile.following,
      profile: null,
    };
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
        this.setState({ isFollowing: profile.following });
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
      .then((res) => res.json())
      .then(({ profile }) => {
        console.log(profile, 'fetch');
        this.setState({ isFollowing: profile.following, profile: profile });
      })
      .catch((errors) => console.log(errors));
  };

  render() {
    console.log(this.state.isFollowing, this.state.profile, 'following');
    return (
      <div className="h-56 w-full  bg-gray-100 flex justify-center items-center flex-col relative">
        <div className=" ml-8">
          <img
            className="w-34 h-24 rounded-full "
            src={this.props.profile.image || '/images/smiley.jpg'}
            alt=""
          />

          <p className=" text-xl text-center font-bold mt-5">
            {this.props.profile.username}
          </p>

          <button
            className="absolute bottom-4 right-20 border-2 border-solid p-2 border-gray-600 rounded outline-none"
            onClick={
              this.state.isFollowing
                ? () => this.unFollowUser(this.props.profile.username)
                : () => this.followUser(this.props.profile.username)
            }
          >
            {this.state.isFollowing
              ? `unfollow ${this.props.profile.username}`
              : `follow ${this.props.profile.username}`}
          </button>
        </div>
      </div>
    );
  }
}

export default UserProfileHero;
