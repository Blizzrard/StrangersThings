import { useState } from "react";
import { useLocation } from "react-router-dom";
import { postMessage } from "../api/api";

export default function SinglePost() {
  const location = useLocation();
  const [messageText, setMessageText] = useState("");
  console.log(location, messageText);
  const authToken = localStorage.getItem("token");
  const { post } = location.state;
  // console.log(post);
  if (post)
    return (
      <div className="posts">
        <h1>{post.title}</h1>
        <span>Price: {post.price}</span>
        <span>Description: {post.description}</span>
        <span>Will Deliver: {post.willDeliver}</span>
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
  else if (!post) {
    return <div>Loading</div>;
  }
}
