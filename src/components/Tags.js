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
      <div className="tag text-center bg-gray-200 w-1/3">
        <h2 className="text-xl font-bold">Popular tags</h2>
        <ul className="flex flex-wrap mt-5 w-auto">
          {filterTag.map((elm) => {
            return (
              <li className="mb-1 ml-2" key={elm}>
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
