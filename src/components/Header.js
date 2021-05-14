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
        <NavLink to="/" exact activeClassName="font-bold">
          <p className="text-xl">Home</p>
        </NavLink>
        <NavLink to="/signup" activeClassName="font-bold">
          <p className="mx-8 text-xl">Signup</p>
        </NavLink>
        <NavLink to="login" activeClassName="font-bold">
          <p className="text-xl">Login</p>
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;
