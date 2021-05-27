import React, { useContext } from 'react';
import { articles_URL } from '../utils/constant';
import Loader from './Loader';
import { Link, withRouter } from 'react-router-dom';
import UserContext from './UserContext';

class SinglePost extends React.Component {
  state = {
    article: null,
    error: '',
    comments: [],
    commentBody: '',
  };
  static contextType = UserContext;
  // componentDidMount() {
  //   let slug = this.props.match.params.slug;

  //   fetch(articles_URL + `/` + slug)
  //     .then((res) => res.json())
  //     .then((data) =>
  //       this.setState({
  //         article: data.article,
  //       })
  //     );
  // }
  async componentDidMount() {
    let slug = this.props.match.params.slug;

    try {
      let article = await fetch(articles_URL + `/` + slug).then((res) =>
        res.json()
      );
      // .then((data) =>
      //   this.setState({
      //     article: data.article,
      //   })
      // );
      let comments = await fetch(articles_URL + `/` + slug + '/comments').then(
        (res) => res.json()
      );
      // .then(({ comments }) =>
      //   this.setState({
      //     comments: comments,
      //   })
      // );

      this.setState({
        article: article.article,
        comments: comments.comments,
      });
    } catch (error) {
      console.log(error);
    }
  }
  handleDelete = (slug) => {
    let user = this.props.user;
    console.log(slug, 'crud');
    fetch(articles_URL + `/` + slug, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Token ${user.token}`,
      },
    }).then((data) => this.props.history.push('/'));
  };
  addComment = (event) => {
    let { user } = this.context;
    event.preventDefault();
    let slug = this.props.match.params.slug;
    fetch(articles_URL + `/` + slug + '/comments', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${user.token}`,
      },
      body: JSON.stringify({
        comment: {
          body: this.state.commentBody,
        },
      }),
    })
      .then((res) => res.json())
      .then((comment) => {
        console.log(comment, 'add comment');
        this.setState({ commentBody: '' });
        // this.props.history.push(`/articles/${this.props.match.params.slug}`);
        this.componentDidMount();
      });
  };

  deleteComment = (id) => {
    let slug = this.props.match.params.slug;
    let { user } = this.context;
    fetch(articles_URL + `/` + slug + '/comments/' + id, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${user.token}`,
      },
    }).then((comment) => {
      this.componentDidMount();
    });
  };

  handleComment = (event) => {
    console.log(event.target.value);
    this.setState({
      commentBody: event.target.value,
    });
  };
  render() {
    if (!this.state.article) {
      return <Loader />;
    }

    let { article } = this.state;
    let { user } = this.context;

    return (
      <>
        <div className=" w-full  bg-black bg-opacity-75 text-white pb-5">
          <h2 className="font-bold text-2xl my-5 pt-16 ml-28">
            {article.title}
          </h2>
          <div className=" ml-32">
            <img
              className="author-img"
              src={article.author.image || '/images/smiley.jpg'}
              alt={article.author.username}
            />
            <Link to={`/profiles/${this.state.article.author.username}`}>
              <p className="post-author text-xl text-green-200 text-white">
                {this.state.article.author.username}
              </p>
            </Link>

            <time className="post-time text-white text-xs" dateTime="">
              {article.createdAt}
            </time>
          </div>
          <div>
            {user && user.username === article.author.username ? (
              <CRUD article={article} handleDelete={this.handleDelete} />
            ) : (
              ''
            )}
          </div>
        </div>
        <div className="w-3/4 mx-auto my-2 max-w-7xl">
          <p className="text-lg mt-5 font-bold text-black-600 py-2">
            {article.description}
          </p>
        </div>
        <div className="w-3/4 mx-auto mb-12 mt-5 max-w-7xl">
          <p className="text-base text-gray-700 py-2">{article.body}</p>
        </div>
        <div className="text-center p-5">
          {article.tagList.length
            ? article.tagList.map((tag, i) => {
                return (
                  <span
                    key={i}
                    className="mr-5 p-2 border-2 border-solid border-gray-300 hover:text-blue-400 rounded text-base"
                  >
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
            <Comment
              comments={this.state.comments}
              handleComment={this.handleComment}
              addComment={this.addComment}
              state={this.state.commentBody}
            />
          )}
        </div>
        <ul className="w-1/2 mx-auto my-8">
          {this.state.comments.length === 0 ? (
            'No comments added yet'
          ) : (
            <Comments
              comments={this.state.comments}
              article={this.state.article}
              deleteComment={this.deleteComment}
            />
          )}
        </ul>
      </>
    );
  }
}

function Comments(props) {
  let { user } = useContext(UserContext);
  let articleAuthor = props.article.author.username;
  let LoggedInUser = user ? user.username : null;
  return (
    <>
      {props.comments.map((comment) => {
        return (
          <li
            key={comment.id}
            className="mb-8 p-5 border-2 border-solid border-gray-200"
          >
            <p className="ml-12 my-2 text-xl">{comment.body}</p>

            <div className="flex justify-between items-center">
              <div className=" ml-8 mt-5 flex items-center">
                <section className="flex items-center">
                  <Link to={`/profiles/${comment.author.username}`}>
                    <img
                      className="w-6 h-6 rounded-full "
                      src={comment.author.image || '/images/smiley.jpg'}
                      alt=""
                    />

                    <p className=" text-xs text-center mx-2 font-bold">
                      {comment.author.username}
                    </p>
                  </Link>
                </section>
                <time className=" text-xs" dateTime="">
                  {comment.createdAt}
                </time>
              </div>
              {articleAuthor === LoggedInUser ||
              comment.author.username === LoggedInUser ? (
                <i
                  className="fas fa-trash-alt cursor-pointer"
                  onClick={() => props.deleteComment(comment.id)}
                ></i>
              ) : (
                ''
              )}
            </div>
          </li>
        );
      })}
    </>
  );
}
function CRUD(props) {
  return (
    <div className="my-5 ml-32">
      <Link to={`/articles/edit/${props.article.slug}`}>
        <button className="bg-green-800 bg-opacity-90 hover:bg-green-900 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Edit
        </button>
      </Link>
      <button
        className="bg-red-800 ml-5 hover:bg-red-900 bg-opacity-90 text-gray-200 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => props.handleDelete(props.article.slug)}
      >
        Delete
      </button>
    </div>
  );
}

function Comment(props) {
  return (
    <>
      <form
        className="w-1/2 mx-auto my-8 p-12 border-2 border-solid border-gray-200 rounded"
        onSubmit={props.addComment}
      >
        <input
          className="w-full py-2 px-5 border-2 border-solid border-gray-200"
          type="text"
          placeholder="Add comment"
          name="body"
          onChange={props.handleComment}
          value={props.state}
        />
        <input
          type="submit"
          value="add comment"
          className="mt-8 bg-black bg-opacity-60 hover:bg-black hover:bg-opacity-80 text-white font-bold text-sm py-2 px-4"
        />
      </form>
    </>
  );
}

export default withRouter(SinglePost);
