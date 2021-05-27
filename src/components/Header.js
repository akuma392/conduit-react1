import { NavLink, Link } from 'react-router-dom';
import { useContext } from 'react';
import UserContext from './UserContext';

function Header() {
  let { isLoggedIn, user } = useContext(UserContext);
  console.log(isLoggedIn, user, 'header');
  return (
    <div className="flex justify-between py-5 px-12 bg-gray-100 items-center border-2 border-gray-600">
      <div>
        {/* <img
          src="https://launchpad.altcampus.school/images/altcampus-logo.svg"
          alt=""
        /> */}
        <Link
          to="/"
          className="text-2xl text-green-500 font-bold hover:text-green-500"
        >
          Conduit
        </Link>
      </div>
      <nav className="flex">
        {isLoggedIn ? <LoggedIn user={user} /> : <Nonloggedin />}
      </nav>
    </div>
  );
}

function Nonloggedin() {
  return (
    <>
      <NavLink to="/" exact activeClassName="font-bold">
        <p className="text-xl">Home</p>
      </NavLink>
      <NavLink to="/signup" activeClassName="font-bold">
        <p className="mx-8 text-xl">Signup</p>
      </NavLink>
      <NavLink to="/login" activeClassName="font-bold">
        <p className="text-xl">Login</p>
      </NavLink>
    </>
  );
}

function LoggedIn(props) {
  let { isLoggedIn, user } = useContext(UserContext);
  return (
    <>
      <NavLink to="/" exact activeClassName="font-bold">
        <p className="text-xl hover:text-gray-500">Home</p>
      </NavLink>
      <NavLink to="/new-post" activeClassName="font-bold">
        <p className="mx-8 text-xl hover:text-gray-500">create post</p>
      </NavLink>
      <NavLink to="/setting" activeClassName="font-bold">
        <p className="text-xl mr-8 hover:text-gray-500">setting</p>
      </NavLink>

      <NavLink to="/profile" activeClassName="font-bold">
        <p className="text-xl hover:text-gray-500">{user.username}</p>
      </NavLink>
    </>
  );
}
export default Header;
