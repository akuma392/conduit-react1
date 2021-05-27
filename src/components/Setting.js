import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { verify_URL } from '../utils/constant';
import Loader from './Loader';
import UserContext from './UserContext';

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      bio: '',
      image: '',
      errors: {
        email: '',
        username: '',
        image: '',
      },
    };
  }
  static contextType = UserContext;
  handleInput = ({ target }) => {
    let { name, value } = target;

    this.setState({ [name]: value });
  };
  componentDidMount() {
    let { user } = this.context;
    console.log(user, 'component did mount');
    this.setState({
      email: user.email,
      username: user.username,
      image: user.image,
    });
  }
  handleSubmit = (event) => {
    let { username, email, bio, image } = this.state;
    let { user, updatedUser } = this.context;
    event.preventDefault();

    fetch(verify_URL, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${user.token}`,
      },
      body: JSON.stringify({ user: { username, email, bio, image } }),
    })
      .then((res) => {
        // if (!res.ok) {
        //   return res.json().then(({ errors }) => {
        //     return Promise.reject(errors);
        //   });
        // }
        return res.json();
      })
      .then(({ user }) => {
        updatedUser(user);
        // this.setState({ email: '', username: '', password: '' });
        this.props.history.push('/');
      });
    //   .catch((errors) => {
    //     this.setState({ errors });
    //   });
  };

  render() {
    let { handleLogout } = this.context;
    if (!this.state.username) {
      return <Loader />;
    }
    return (
      <>
        <h2 className="text-3xl mt-8 text-center font-bold">Your Settings</h2>
        <form className="w-2/5 mx-auto my-5" onSubmit={this.handleSubmit}>
          <input
            className="w-full py-2 my-2 px-8 rounded shadow appearance-none border border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="Url of profile picture"
            name="image"
            onChange={this.handleInput}
            value={this.state.image}
          />
          <input
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="what's this article about?"
            value={this.state.username}
            name="username"
            onChange={this.handleInput}
          />
          <textarea
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            name=""
            id=""
            cols="30"
            rows="8"
            placeholder="sort bio about you?"
            value={this.state.bio}
            name="bio"
            onChange={this.handleInput}
          ></textarea>
          <input
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="Enter tags"
            value={this.state.email}
            onChange={this.handleInput}
            disabled
          />
          <input
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="new password"
            value={this.state.password}
            name="password"
            onChange={this.handleInput}
          />
          <div className="text-right">
            <input
              className="bg-green-500 hover:bg-green-700  text-white font-bold py-2 mt-5 px-10 text-xl rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="update profile"
            />
          </div>
        </form>
        <div className="w-2/5 mx-auto">
          <Link to="/">
            <input
              className="hover:bg-red-400 hover:border-none hover:text-white font-bold py-2 mt-5 mb-12 px-10 text-sm rounded focus:outline-none focus:shadow-outline border-2 border-solid border-red-300 text-red-300"
              type="submit"
              value="or click for logout"
              onClick={handleLogout}
            />
          </Link>
        </div>
      </>
    );
  }
}

export default withRouter(Setting);
