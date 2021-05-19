import React from 'react';

import Hero from './Hero';
import Posts from './Posts';
import Tags from './Tags';
import FeedNav from './FeedNav';
import { articles_URL } from '../utils/constant';
import Pagination from './Pagination';

class Home extends React.Component {
  state = {
    articles: null,
    articlesCount: 0,
    articlesPerPage: 10,
    activePage: 1,
    activeTag: '',
  };
  componentDidMount() {
    this.fetchData();
  }

  emptyTag = () => {
    this.setState({ activeTag: '' });
  };
  addTag = (value) => {
    this.setState({ activeTag: value });
  };

  yourFeed = () => {
    fetch(articles_URL + '/feed', {
      method: 'GET',
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors);
          });
        }
        return res.json();
      })
      .then(({ articles }) => {
        this.setState({
          articles: articles,
          activeTag: 'your feed',
        });
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTag !== this.state.activeTag
    ) {
      this.fetchData();
    }
  }
  favoriteArticle = (slug) => {
    fetch(articles_URL + '/' + slug + '/favorite', {
      method: 'POST',
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
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
        this.fetchData();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  unFavoriteArticle = (slug) => {
    fetch(articles_URL + '/' + slug + '/favorite', {
      method: 'DELETE',
      headers: {
        authorization: `Token ${this.props.user.token}`,
      },
    })
      .then(({ article }) => {
        this.fetchData();
      })
      .catch((errors) => {
        console.log(errors);
      });
  };
  fetchData = () => {
    let limit = this.state.articlesPerPage;
    let offset = (this.state.activePage - 1) * limit;
    let tag = this.state.activeTag;

    fetch(
      articles_URL +
        `/?offset=${offset}&limit=${limit}` +
        (tag && `&tag=${tag}`)
    )
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          articles: data.articles,
          articlesCount: data.articlesCount,
        })
      );
  };

  updateCurrentPage = (index) => {
    this.setState({ activePage: index }, this.fetchData);
  };
  render() {
    console.log(this.state.articles, 'your feed');
    return (
      <>
        <Hero />

        <div className="padding">
          <div className="container col-xs-4 item-start post">
            <section className="span-xs-3">
              <FeedNav
                activeTag={this.state.activeTag}
                emptyTag={this.emptyTag}
                user={this.props.user}
                yourFeed={this.yourFeed}
              />
              <Posts
                articles={this.state.articles}
                favoriteArticle={this.favoriteArticle}
                unFavoriteArticle={this.unFavoriteArticle}
              />
              <Pagination
                articlesCount={this.state.articlesCount}
                articlesPerPage={this.state.articlesPerPage}
                active={this.state.activePage}
                updateCurrentPage={this.updateCurrentPage}
              />
            </section>
            <Tags addTag={this.addTag} />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
