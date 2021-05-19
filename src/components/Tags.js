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

    let filterTag = this.state.tags.filter((elm) => elm);
    return (
      <div className="tag text-center bg-gray-200">
        <h2 className="text-2xl font-bold">Popular tags</h2>
        <ul className="grid grid-cols-3 gap-1 mt-5">
          {filterTag.map((elm) => {
            return (
              <li className="mb-1" key={elm}>
                <button
                  onClick={() => this.props.addTag(elm)}
                  className="border-2 border-solid border-gray-400 text-gray-700 hover:bg-black hover:bg-opacity-80 hover:text-white text-xs font-bold py-1 px-2 rounded"
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
