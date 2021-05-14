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

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.activeTag !== this.state.activeTag
    ) {
      this.fetchData();
    }
  }
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
    return (
      <>
        <Hero />

        <div className="padding">
          <div className="container col-xs-4 item-start post">
            <section className="span-xs-3">
              <FeedNav
                activeTag={this.state.activeTag}
                emptyTag={this.emptyTag}
              />
              <Posts articles={this.state.articles} />
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
