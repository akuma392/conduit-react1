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
            <Link to={`/profiles/${author.username}`}>
              <p className="post-author">{author.username}</p>
            </Link>
            <time className="post-time" dateTime="">
              {createdAt}
            </time>
          </div>
        </div>
        <div
          className={
            favoritesCount === 0
              ? 'text-green-700 border-2 border-green-600 border-solid like-btn p-2 cursor-pointer'
              : `bg-green-600 text-white like-btn p-2 cursor-pointer border-2 border-solid border-green-600`
          }
          onClick={
            favoritesCount === 0
              ? () => props.favoriteArticle(props.articles.slug)
              : () => props.unFavoriteArticle(props.articles.slug)
          }
        >
          <span className="mr-2">&hearts;</span>
          <span>{favoritesCount}</span>
        </div>
      </header>
      <Link to={`/articles/${props.articles.slug}`}>
        <div className="post-body">
          <h2 className="post-title my-2 font-bold">{title}</h2>
          <p className="post-text pr-12">
            {description.substring(0, 50).concat('....')}
          </p>
        </div>
      </Link>
      <footer>
        <Link className="read-more-btn" to={`/articles/${props.articles.slug}`}>
          <p className="text-gray-600 text-sm hover:underline hover:text-black">
            Read More
          </p>
        </Link>
      </footer>
    </article>
  );
}

export default Post;
