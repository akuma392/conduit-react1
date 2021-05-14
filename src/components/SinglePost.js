import React from 'react';
import { articles_URL } from '../utils/constant';
import Loader from './Loader';

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
    console.log(article);
    return (
      <>
        <div className="h-64 w-full  bg-black bg-opacity-75 text-white">
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

        <div className="w-3/4 mx-auto my-12">
          <p className="text-xl py-5">{article.description}</p>
        </div>
        <div>
          <p>{article.taglist}</p>
        </div>
      </>
    );
  }
}

export default SinglePost;
