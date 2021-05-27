import React from 'react';

import { articles_URL } from '../utils/constant';
import { withRouter } from 'react-router';
import Loader from './Loader';
import UserContext from './UserContext';

class UpdatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      body: '',
      tagList: '',
      articleLoading: true,
      errors: {
        title: '',
        description: '',
        body: '',
        tagList: '',
      },
    };
  }
  static contextType = UserContext;
  handleInput = ({ target }) => {
    let { name, value } = target;
    let errors = this.state.errors;

    switch (name) {
      case 'title':
        errors.title = value.length < 1 ? '' : 'Enter title of article';
        break;
      case 'description':
        errors.description =
          value.description < 1 ? 'Enter descriptions of article' : '';
        break;
      // case 'tagList':
      //   this.state.tagList = this.state.tagList
      //     .split(',')
      //     .map((tag) => tag.trim());
      //   break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };
  componentDidMount() {
    let slug = this.props.match.params.slug;

    fetch(articles_URL + `/` + slug)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          title: data.article.title,
          description: data.article.description,
          body: data.article.body,
          tagList: data.article.tagList,
          articleLoading: false,
        })
      );
  }
  handleSubmit = (event) => {
    let { title, description, body, tagList } = this.state;
    let { user } = this.context;
    event.preventDefault();
    let slug = this.props.match.params.slug;
    console.log(tagList, 'article update');
    fetch(articles_URL + '/' + slug, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        authorization: `Token ${user.token}`,
      },
      body: JSON.stringify({
        article: {
          title,
          description,
          body,
          tagList:
            typeof tagList === 'object'
              ? tagList
              : tagList.split(',').map((tag) => tag.trim()),
        },
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ article }) => {
        this.setState({
          title: '',
          description: '',
          body: '',
          tagList: '',
          articleLoading: false,
        });
        this.props.history.push(`/articles/${article.slug}`);
      })
      .catch((errors) => {
        this.setState({ errors });
      });
  };
  render() {
    if (this.state.articleLoading) {
      return <Loader />;
    }

    return (
      <>
        <form
          className="w-2/3 mx-auto my-8 p-8 border-2 border-solid border-blue-200 "
          onSubmit={this.handleSubmit}
        >
          <h3 className="text-center text-2xl font-bold">Create article</h3>
          <input
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="Article Title"
            name="title"
            value={this.state.title}
            onChange={this.handleInput}
          />
          <input
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="what's this article about?"
            name="description"
            value={this.state.description}
            onChange={this.handleInput}
          />
          <textarea
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            name=""
            id=""
            cols="30"
            rows="4"
            placeholder="write your article?"
            name="body"
            value={this.state.body}
            onChange={this.handleInput}
          ></textarea>
          <input
            className="w-full py-5 my-2 px-8 rounded shadow appearance-none border border-blue-200 focus:outline-none focus:ring-1 focus:ring-blue-400"
            type="text"
            placeholder="Enter tags"
            name="tagList"
            value={this.state.tagList}
            onChange={this.handleInput}
          />
          <div className="text-right">
            <input
              className="bg-green-500 hover:bg-green-700  text-white font-bold py-2 mt-5 px-10 text-xl rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="update article"
            />
          </div>
        </form>
      </>
    );
  }
}

export default withRouter(UpdatePost);
