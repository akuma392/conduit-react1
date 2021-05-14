import React from 'react';

import Loader from './Loader';
import Post from './Post';

function Posts(props) {
  if (!props.articles) {
    console.log(props.articles, 'hi');
    return <Loader />;
  }
  if (props.articles.length < 1) {
    return <h2 className="my-8 ml-8 text-xl font-bold">No articles found!!</h2>;
  }
  console.log(props.articles, 'hello');
  return (
    <div>
      {props.articles.map((elm) => {
        return <Post key={elm.slug} articles={elm} />;
      })}
    </div>
  );
}

export default Posts;
