import React from 'react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      username: '',
      error: {
        email: '',
        password: '',
        username: '',
      },
    };
  }
  validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleInput = ({ target }) => {
    let { name, value } = target;
    let error = this.state.error;

    switch (name) {
      case 'email':
        error.email = this.validateEmail(value) ? '' : 'Email is not valid';
        break;
      case 'password':
        error.password =
          value.length < 6 ? 'Password cant be less than 6 letter' : '';
        break;
      case 'username':
        error.username =
          value.length < 6 ? 'Username cant be less than 6 letter' : '';
        break;

      default:
        break;
    }

    this.setState({ error, [name]: value });
  };

  render() {
    let { email, password, username } = this.state.error;
    return (
      <div className="w-full max-w-xs mx-auto">
        <label className="text-2xl font bold text-center">User Sign up</label>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
              id={email && 'error'}
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
              id={username && 'error'}
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
              id={password && 'error'}
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
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign Up
            </button>
            <Link to="/login" className="text-xl font-bold text-green-500">
              login
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

export default Signup;
