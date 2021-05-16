import { Route, Link } from 'react-router-dom';

function FeedNav(props) {
  return (
    <nav className="feed-nav">
      <ul className="flex">
        {props.user && (
          <li className="feed-nav-item">
            <Link
              className="mx-2 text-xl "
              id={!props.user ? 'active' : ''}
              to="/"
            >
              <span className="text-gray-700">your feed</span>
            </Link>
          </li>
        )}
        <li className="feed-nav-item " onClick={props.emptyTag}>
          <Link
            className="ml-5  text-xl "
            to="/"
            id={props.activeTag ? '' : 'active'}
          >
            Global Feed
          </Link>
        </li>
        {props.activeTag && (
          <li className="feed-nav-item">
            <Link
              className="ml-5 text-xl"
              id={props.activeTag ? 'active' : ''}
              to="/"
            >
              # {props.activeTag}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default FeedNav;
