import React, { useEffect, useState, Fragment } from "react";
import { useOutletContext } from "react-router-dom";

export default function Posts() {
  const fetchAllPosts = useOutletContext();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    try {
      Promise.all([fetchAllPosts()]).then((values) => {
        setPosts(values[0]);
      });
    } catch (error) {}
  }, []);

  console.log(posts, "HELLLLLLLLLLO", posts.title);
  return (
    <div>
      {posts.map((post) => {
        return (
          <React.Fragment key={post._id}>
            <h1>{post.title}</h1>
            <div>{post.description}</div>{" "}
          </React.Fragment>
        );
      })}
    </div>
  );
}
