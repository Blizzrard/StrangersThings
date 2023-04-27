import React, { useEffect, useState, Fragment } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deletePost, makePost, postMessage } from "../api/api";

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
      Promise.all([
        fetchAllPosts(authToken),
        myData(localStorage.getItem("token")),
      ]).then((values) => {
        setPosts(values[0]);
        setUserProfile(values[1]);
      });
    } catch (error) {}
  }, []);
  const AuthorizedUserPostPage = () => {
    if (authToken !== null && authToken !== "") {
      return (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            console.log("HELLO?");
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
              return result;
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
  const UserOwnPost = (authorId, postId) => {
    const [messageText, setMessageText] = useState("");
    if (userProfile._id === authorId) {
      return (
        <div>
          <button className="editBtn">Edit</button>
          <button
            onClick={() => deletePost(localStorage.getItem("token"), postId)}
            className="delBtn"
          >
            Delete
          </button>
        </div>
      );
    } else {
      return (
        <form
          id={`${postId}_btn`}
          onSubmit={(e) => {
            e.preventDefault();
            postMessage(authToken, postId, messageText);
          }}
        >
          <input
            value={messageText}
            type="textarea"
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button>Message</button>
        </form>
      );
    }
  };
  console.log(authToken, userProfile, posts);
  if (authToken !== "" && userProfile && posts) {
    return (
      <div>
        {AuthorizedUserPostPage()}
        {posts.map((post) => {
          return (
            <React.Fragment key={post._id}>
              <Link to={`/posts/${post._id}`} id={post._id}>
                <h1>{post.title}</h1>
              </Link>
              <div>{post.description}</div>{" "}
              {UserOwnPost(post.author._id, post._id)}
            </React.Fragment>
          );
        })}
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
