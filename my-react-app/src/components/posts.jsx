import React, { useEffect, useState, Fragment } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { makePost } from "../api/api";

export default function Posts() {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [newPriceBody, setNewPriceBody] = useState("");
  const {
    fetchAllPosts,
    posts: [posts, setPosts],
    authToken: [authToken, setAuthToken],
    userProfile: [userProfile, setUserProfile],
    myData,
  } = useOutletContext();
  useEffect(() => {
    try {
      Promise.all([fetchAllPosts(), myData(authToken)]).then((values) => {
        setPosts(values[0]);
        setUserProfile(values[1]);
      });
    } catch (error) {}
  }, []);
  const authorizedUserPostPage = () => {
    if (authToken !== null && authToken !== "") {
      return (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const result = await makePost(
                newPostTitle,
                newPostBody,
                newPriceBody,
                authToken
              );
              setNewPriceBody("");
              setNewPostTitle("");
              setNewPostBody("");
            } catch (error) {}
          }}
        >
          <label htmlFor="newPostTitleEntry">Title: </label>
          <input
            id="newPostTitleEntry"
            type="textarea"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
          />
          <label htmlFor="newBodyTitleEntry">Description: </label>
          <input
            id="newBodyTitleEntry"
            type="textarea"
            value={newPostBody}
            onChange={(e) => setNewPostBody(e.target.value)}
          />
          <label htmlFor="newPriceTitleEntry">Price: </label>
          <input
            id="newPriceTitleEntry"
            type="textarea"
            value={newPriceBody}
            onChange={(e) => setNewPriceBody(e.target.value)}
          />
          <button className="postSubmitBtn">Submit</button>
        </form>
      );
    }
  };
  const userOwnPost = (postId) => {
    if (userProfile._id === postId) {
      return (
        <div>
          <button className="editBtn">Edit</button>
          <button className="delBtn">Delete</button>
        </div>
      );
    }
  };
  console.log(authToken, userProfile, posts);
  if (authToken !== "" && userProfile) {
    return (
      <div>
        {authorizedUserPostPage()}
        {posts.map((post) => {
          return (
            <React.Fragment key={post._id}>
              <Link to={`/posts/${post._id}`}>
                <h1>{post.title}</h1>
              </Link>
              <div>{post.description}</div> {userOwnPost(post.author._id)}
            </React.Fragment>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
