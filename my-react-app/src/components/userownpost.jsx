import { useState } from "react";

export const UserOwnPost = (props) => {
  const [messageText, setMessageText] = useState("");
  const {
    authorId,
    postId,
    userProfile,
    authToken,
    setPosts,
    deletePost,
    postMessage,
    postToEdit,
    setPostToEdit,
  } = props;
  if (userProfile._id === authorId) {
    return (
      <div className="userPostBtns">
        <button
          className="editBtn"
          onClick={() => {
            setPostToEdit(postId);
            let editBox = document.getElementById("editingBox");
            editBox.style.display = "flex";
          }}
        >
          Edit
        </button>
        <button
          onClick={async () => {
            await deletePost(authToken, postId);
            setPosts((existingPosts) => {
              return existingPosts.filter((item) => item._id !== postId);
            });
          }}
          className="delBtn"
        >
          Delete
        </button>
      </div>
    );
  } else {
    return <></>;
  }
};
