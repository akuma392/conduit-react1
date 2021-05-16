import React from 'react';
import { articles_URL } from '../utils/constant';
import Loader from './Loader';
import { Link, withRouter } from 'react-router-dom';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
  };

  componentDidMount() {
    let slug = this.props.match.params.slug;
    fetch(articles_URL + `/` + slug)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          article: data.article,
        })
      );
  }
  render() {
    if (!this.state.article) {
      return <Loader />;
    }
    let slug = this.props.match.params.slug;
    console.log(slug);

    let { article } = this.state;
    console.log(this.props.user, 'text');
    return (
      <>
        <div className="h-64 w-full  bg-black bg-opacity-75 text-white ">
          <h2 className="font-bold text-2xl my-5 pt-16 ml-8">
            {article.title}
          </h2>
          <div className=" ml-8">
            <img
              className="author-img"
              src={article.author.image || '/images/smiley.jpg'}
              alt={article.author.username}
            />
            <p className="post-author text-xl text-white">
              {this.state.article.author.username}
            </p>

            <time className="post-time text-white text-sm" datetime="">
              {article.createdAt}
            </time>
          </div>
        </div>

        <div className="w-3/4 mx-auto my-12 max-w-7xl">
          <p className="text-xl py-5">{article.description}</p>
        </div>
        <div className="text-center p-5">
          {article.tagList.length
            ? article.tagList.map((tag) => {
                return (
                  <span className="mr-5 p-2 border-2 border-solid border-gray-300 hover:text-blue-400 rounded">
                    {tag}
                  </span>
                );
              })
            : ''}
        </div>
        <div className="mt-12 mx-auto text-xl">
          {!this.props.user ? (
            <p className="text-center text-sm">
              <Link
                className="text-green-600 font-bold hover:underline mr-2"
                to="/login"
              >
                Sign in
              </Link>
              or
              <Link
                className="text-green-600 font-bold hover:underline mx-2"
                to="/signup"
              >
                Sign up
              </Link>
              to add comments on this article.
            </p>
          ) : (
            ''
          )}
        </div>
      </>
    );
  }
}

export default withRouter(SinglePost);
