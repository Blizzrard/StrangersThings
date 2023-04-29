import { useState } from "react";
import { updatePost, fetchAllPosts } from "../api/api";

export default function EditBox(props) {
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [newPriceBody, setNewPriceBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [willDeliver, setWillDeliver] = useState(false);
  const [location, setLocation] = useState("");
  const { authToken, posts, setPosts, postToEdit, setPostToEdit } = props;
  return (
    <div className="editBox" id="editingBox">
      {" "}
      <form
        className="editPost"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const result = await updatePost(
              authToken,
              postToEdit,
              newPostTitle,
              newPostBody,
              newPriceBody,
              location,
              willDeliver
            );
            setNewPriceBody("");
            setNewPostTitle("");
            setNewPostBody("");
            setWillDeliver(false);
            setLocation("");
            let editBox = document.getElementById("editingBox");
            editBox.style.display = "none";
            let newArr = await fetchAllPosts(authToken)
            return setPosts(newArr);
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
        <textarea
          id="newBodyTitleEntry"
          rows={5}
          cols={75}
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
        <label htmlFor="newLocationEntry">Location: </label>
        <input
          id="newLocationEntry"
          type="textarea"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="deliveryMethod">Will Deliver?: </label>
        <select
          id="deliveryMethod"
          onChange={(e) => setWillDeliver(e.target.value)}
        >
          <option value="false">No</option>
          <option value="true">Yes</option>
        </select>
        <button className="postSubmitBtn">Submit</button>
      </form>
    </div>
  );
}
