import { Link } from 'react-router-dom';
import { useContext } from 'react';

import UserContext from './UserContext';

function FeedNav(props) {
  let { user } = useContext(UserContext);
  return (
    <nav className="feed-nav">
      <ul className="flex">
        {user && (
          <li className="feed-nav-item" onClick={props.yourFeed}>
            <Link
              className="ml-8 text-base "
              id={props.activeTag === 'your feed' ? 'active' : ''}
              to="/"
            >
              <span className="text-gray-700 text-base">your feed</span>
            </Link>
          </li>
        )}
        <li className="feed-nav-item " onClick={props.emptyTag}>
          <Link
            className="ml-2  text-base "
            to="/"
            id={props.activeTag ? '' : 'active'}
          >
            <span className="text-base">Global Feed</span>
          </Link>
        </li>
        {props.activeTag && (
          <li className="feed-nav-item">
            <Link
              className="ml-2 text-base"
              id={
                props.activeTag && props.activeTag !== 'your feed'
                  ? 'active'
                  : ''
              }
              to="/"
            >
              <span className="text-base">
                {props.activeTag && props.activeTag !== 'your feed'
                  ? `# ${props.activeTag}`
                  : ''}
              </span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default FeedNav;
