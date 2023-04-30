import React, { useContext, useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { deletePost, makePost, postMessage } from "../api/api";
import { AuthorizedUserPostPage } from "./authorizeduserpostpage";
import { UserOwnPost } from "./userownpost";
import Editbox from "./editbox";

export default function Posts() {
  const {
    fetchAllPosts,
    posts: [posts, setPosts],
    authToken: [authToken, setAuthToken],
    userProfile: [userProfile, setUserProfile],
    myData,
  } = useOutletContext();
  setAuthToken(localStorage.getItem("token"));
  useEffect(() => {
    try {
      Promise.all([fetchAllPosts(authToken), myData(authToken)]).then(
        (values) => {
          setPosts(values[0]);
          setUserProfile(values[1]);
        }
      );
    } catch (error) {}
  }, [authToken]);
  const [postToEdit, setPostToEdit] = useState("");
  if (authToken !== "" && userProfile && posts) {
    return (
      <div className="postBody">
        <AuthorizedUserPostPage
          authToken={authToken}
          makePost={makePost}
          posts={posts}
          setPosts={setPosts}
        />
        <Editbox
          authToken={authToken}
          posts={posts}
          setPosts={setPosts}
          postToEdit={postToEdit}
          setPostToEdit={setPostToEdit}
        />
        <div className="posts">
          {posts.map((post) => {
            return (
              <React.Fragment key={post._id}>
                <Link to={`/posts/${post._id}`} id={post._id} state={{ post }}>
                  <h1>{post.title}</h1>
                  <div>{post.description}</div>
                </Link>{" "}
                <UserOwnPost
                  authorId={post.author._id}
                  postId={post._id}
                  userProfile={userProfile}
                  deletePost={deletePost}
                  authToken={authToken}
                  setPosts={setPosts}
                  postMessage={postMessage}
                  postToEdit={postToEdit}
                  setPostToEdit={setPostToEdit}
                />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  } else if (authToken === null && posts) {
    return (
      <div className="postBody">
        <AuthorizedUserPostPage
          authToken={authToken}
          makePost={makePost}
          posts={posts}
          setPosts={setPosts}
        />
        <div className="posts">
          {posts.map((post) => {
            return (
              <React.Fragment key={post._id}>
                <Link to={`/posts/${post._id}`} id={post._id} state={{ post }}>
                  <h1>{post.title}</h1>
                  <div>{post.description}</div>
                </Link>{" "}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}
