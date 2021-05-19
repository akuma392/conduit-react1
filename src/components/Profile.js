import React from 'react';
import ProfileHero from './ProfileHero';
import { articles_URL } from '../utils/constant';
import Posts from './Posts';
import Pagination from './Pagination';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activetab: 'author',
      articles: [],
      profile: null,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    let { activetab } = this.state;
    let { user } = this.props;
    fetch(articles_URL + `?${activetab}=${user.username}`)
      .then((res) => res.json())
      .then((data) =>
        this.setState({
          articles: data.articles,
        })
      );
  };

  handleActiveTab = (tab) => {
    console.log(tab, this.state.activetab);
    this.setState(
      {
        activetab: tab,
      },
      () => this.fetchData()
    );
  };
  render() {
    return (
      <>
        <ProfileHero user={this.props.user} />

        <div className="flex mx-16 my-8 border-b  mx-4 border-gray-300 border-solid">
          <div
            id={this.state.activetab === 'author' ? 'active' : ''}
            className="pb-2"
          >
            <button
              className="outline-none p-2 focus:outline-none focus:border-none "
              onClick={() => this.handleActiveTab('author')}
            >
              My articles
            </button>
          </div>
          <div
            className="ml-5"
            id={this.state.activetab === 'favorited' ? 'active' : ''}
          >
            <button
              className="outline-none p-2 focus:outline-none focus:border-none"
              onClick={() => this.handleActiveTab('favorited')}
            >
              Favorited articles
            </button>
          </div>
        </div>
        <Posts articles={this.state.articles} />
        <Pagination />
      </>
    );
  }
}

export default Profile;
