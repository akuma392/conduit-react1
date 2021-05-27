import React from 'react';
import { Link } from 'react-router-dom';
import { signup_URL } from '../utils/constant';
import { withRouter } from 'react-router';
import UserContext from './UserContext';
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      errors: {
        email: '',
        password: '',
        username: '',
      },
    };
  }
  static contextType = UserContext;
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;

    switch (name) {
      case 'email':
        errors.email = this.validateEmail(value) ? '' : 'Email is not valid';
        break;
      case 'password':
        errors.password =
          value.length < 6 ? 'Password cant be less than 6 letter' : '';
        break;
      case 'username':
        errors.username =
          value.length < 6 ? 'Username cant be less than 6 letter' : '';
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSubmit = (event) => {
    let { username, email, password } = this.state;
    let { updatedUser } = this.context;
    event.preventDefault();

    fetch(signup_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ user }) => {
        updatedUser(user);
        this.setState({ email: '', username: '', password: '' });
        this.props.history.push('/');
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  render() {
    let { email, password, username } = this.state.errors;
    return (
      <div className="w-full max-w-xs mx-auto">
        <label className="text-2xl font bold text-center">User Sign up</label>
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={this.handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="email"
            >
              email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="email"
              placeholder="email"
              onChange={this.handleInput}
              value={this.state.email}
              id={email && 'errors'}
              name="email"
            />
          </div>
          <p className="text-sm text-red-500 font-bold text-center">{email}</p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="username"
            >
              username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="username"
              onChange={this.handleInput}
              value={this.state.username}
              id={username && 'errors'}
              name="username"
            />
          </div>
          <p className="text-sm text-red-500 font-bold text-center">
            {username}
          </p>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-xl font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id={password && 'errors'}
              type="password"
              placeholder="******************"
              value={this.state.password}
              onChange={this.handleInput}
              name="password"
            />
          </div>
          <p className="text-sm text-red-500 font-bold text-center">
            {password}
          </p>
          <div className="flex items-center justify-between">
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button> */}
            <input
              className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              type="submit"
              disabled={email || password || username}
              value="Sign up"
            />
            <Link to="/login" className="text-xl font-bold text-green-500">
              login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Signup);
