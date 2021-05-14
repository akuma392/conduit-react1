import { NavLink } from 'react-router-dom';

function Header(props) {
  return (
    <div className="flex justify-between py-5 px-12 bg-gray-100 items-center border-2 border-gray-600">
      <div>
        <img
          src="https://launchpad.altcampus.school/images/altcampus-logo.svg"
          alt=""
        />
      </div>
      <nav className="flex">
        {props.state.isLoggedIn ? <LoggedIn /> : <Nonloggedin />}
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
      <NavLink to="login" activeClassName="font-bold">
        <p className="text-xl">Login</p>
      </NavLink>
    </>
  );
}

function LoggedIn(props) {
  return (
    <>
      <NavLink to="/" exact activeClassName="font-bold">
        <p className="text-xl">Home</p>
      </NavLink>
      <NavLink to="/signup" activeClassName="font-bold">
        <p className="mx-8 text-xl">create post</p>
      </NavLink>
      <NavLink to="login" activeClassName="font-bold">
        <p className="text-xl mr-8">setting</p>
      </NavLink>

      <NavLink to="login" activeClassName="font-bold">
        <p className="text-xl">profile</p>
      </NavLink>
    </>
  );
}
export default Header;
