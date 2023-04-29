import React from "react";
import { Link } from "react-router-dom";

export function PostsBody(props) {
  const { posts } = props;
  return (
    <div className="help">
      {" "}
      {posts.map((post) => {
        return (
          <React.Fragment key={post._id}>
            <Link to={`/posts/${post._id}`} id={post._id}>
              <h1>
                {post.title}
                <div>{post.description}</div>
              </h1>
            </Link>
          </React.Fragment>
        );
      })}
    </div>
  );
}
