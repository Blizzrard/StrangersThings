import { useState } from "react";
import { useLocation } from "react-router-dom";
import { postMessage } from "../api/api";

export default function SinglePost() {
  const location = useLocation();
  const [messageText, setMessageText] = useState("");
  const authToken = localStorage.getItem("token");
  const { post } = location.state;
  let messages = post.messages;
  console.log(authToken);
  if (post && post.isAuthor === false && authToken) {
    return (
      <div className="posts">
        <h1>{post.title}</h1>
        <span>Price: {post.price}</span>
        <span>Description: {post.description}</span>
        <span>Will Deliver: {post.willDeliver.toString()}</span>
        <span>Location: {post.location}</span>
        <span>Owner: {post.author.username}</span>
        <form
          id={`${post._id}_btn`}
          onSubmit={(e) => {
            e.preventDefault();
            postMessage(authToken, post._id, messageText);
            setMessageText("");
          }}
        >
          <input
            value={messageText}
            type="textarea"
            onChange={(e) => setMessageText(e.target.value)}
          />
          <button>Message</button>
        </form>
      </div>
    );
  } else if (post) {
    return (
      <div className="posts">
        <h1>{post.title}</h1>
        <span>Price: {post.price}</span>
        <span>Description: {post.description}</span>
        <span>Will Deliver: {post.willDeliver.toString()}</span>
        <span>Location: {post.location}</span>
        <span>Owner: {post.author.username}</span>
      </div>
    );
  } else if (post && post.isAuthor === true) {
    return (
      <div className="posts">
        <h1>{post.title}</h1>
        <span>Price: {post.price}</span>
        <span>Description: {post.description}</span>
        <span>Will Deliver: {post.willDeliver.toString()}</span>
        <span>Location: {post.location}</span>
        <div className="messages">
          {messages.map((message) => {
            return (
              <div className="singleMessage">
                <h1>From: {message.fromUser.username}</h1>
                <p>Message: {message.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else if (!post) {
    return <div>Loading</div>;
  }
}
