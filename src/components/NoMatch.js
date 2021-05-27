import { Link } from 'react-router-dom';

function NoMatch(props) {
  let route = props.match.params[0];
  console.log(route);

  let unAthorizedRoute = [
    '/new-post',
    '/profile',
    '/setting',
    '/profiles',
    '/articles',
  ];

  if (unAthorizedRoute.includes(route)) {
    return (
      <center>
        <h2 className="text-2xl  font-bold mt-12 mb-5 text-red-400 text-center">
          You are not authorized to access this.
        </h2>
        <p className="text-lg mb-12 text-center">Please sign up or login</p>
        <div className="flex justify-center">
          <Link className="mr-12" to="/signup">
            <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
              sign up
            </button>
          </Link>
          <Link to="/login">
            <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none">
              login
            </button>
          </Link>
        </div>
      </center>
    );
  }
  return (
    <>
      <h2 className="text-3xl font-bold my-12 text-center">
        404!! No match found
      </h2>

      <Link to="/">
        <div className="text-center">
          <button className="btn btn-primary bg-green-500 hover:bg-green-700 text-base text-white font-bold py-2 px-4 rounded">
            Go back to home
          </button>
        </div>
      </Link>
    </>
  );
}

export default NoMatch;
