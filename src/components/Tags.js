import React from 'react';
import { tags_URL } from '../utils/constant';
import Loader from './Loader';

class Tags extends React.Component {
  state = {
    tags: null,
  };
  componentDidMount() {
    fetch(tags_URL)
      .then((res) => res.json())
      .then((data) => this.setState({ tags: data.tags }));
  }
  render() {
    if (!this.state.tags) {
      return <Loader />;
    }
    console.log(this.state.tags, 'tags');
    return (
      <div className="tag text-center">
        <h2 className="text-2xl font-bold">Popular tags</h2>
        <ul className="grid grid-cols-2 grid-3 w-64">
          {this.state.tags.map((elm) => {
            return (
              <li className="p-2 my-1 " key={elm}>
                <button
                  onClick={() => this.props.addTag(elm)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  {elm}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Tags;
