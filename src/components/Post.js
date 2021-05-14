import React from 'react';
import { Link } from 'react-router-dom';

function Post(props) {
  const { author, createdAt, title, description, favoritesCount } =
    props.articles;
  return (
    <article className="post w-5/12 ml-12">
      <header className="flex justify-between item-center">
        <div className=" flex item-center">
          <Link to="/profile">
            <img
              className="author-img"
              src={author.image || '/images/smiley.jpg'}
              alt={author.username}
            />
          </Link>
          <div className="post-details">
            <Link to="/profile">
              <p className="post-author">{author.username}</p>
            </Link>
            <time className="post-time" datetime="">
              {createdAt}
            </time>
          </div>
        </div>
        <div className="like-btn text-green-700 border-2 border-green-600 border-solid p-2">
          <span className="mr-2">&hearts;</span>
          <span>{favoritesCount}</span>
        </div>
      </header>
      <Link to={`/articles/${props.articles.slug}`}>
        <div className="post-body">
          <h2 className="post-title">{title}</h2>
          <p className="post-text">{description}</p>
        </div>
      </Link>
      <footer>
        <Link className="read-more-btn" to={`/articles/${props.articles.slug}`}>
          Read More
        </Link>
      </footer>
    </article>
  );
}

export default Post;
