import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchAllPosts } from "../api/api";

export const AuthorizedUserPostPage = (props) => {
  const { authToken, makePost, posts, setPosts } = props;
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  const [newPriceBody, setNewPriceBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [willDeliver, setWillDeliver] = useState(false);
  const postSearching = (post, text) => {
    console.log(post.title.toLowerCase(), "HELOOOOOO");
    return post.title.toLowerCase().includes(text.toLowerCase());
  };
  if (authToken !== null && authToken !== "") {
    return (
      <div className="postAndSearch">
        {" "}
        <form
          className="makePost"
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const result = await makePost(
                newPostTitle,
                newPostBody,
                newPriceBody,
                willDeliver,
                authToken
              );
              setNewPriceBody("");
              setNewPostTitle("");
              setNewPostBody("");
              let newArr = [...posts, result.data.post];
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
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            if (hasSearched) {
              let newArr = await fetchAllPosts(authToken);
              if (newArr) {
                const filteredPosts = newArr.filter((post) =>
                  postSearching(post, searchTerm)
                );
                const postsToDisplay = searchTerm.length
                  ? filteredPosts
                  : newArr;
                await setPosts(postsToDisplay);
                setSearchTerm("");
              } else {
                return <div>Loading</div>;
              }
            } else {
              const filteredPosts = posts.filter((post) =>
                postSearching(post, searchTerm)
              );
              const postsToDisplay = searchTerm.length ? filteredPosts : posts;
              setPosts(postsToDisplay);
              setSearchTerm("");
              setHasSearched(true);
            }
          }}
        >
          <label htmlFor="searchBar" />
          Search:
          <input
            type="textarea"
            value={searchTerm}
            id="searchBar"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (hasSearched) {
            let newArr = await fetchAllPosts(authToken);
            if (newArr) {
              const filteredPosts = newArr.filter((post) =>
                postSearching(post, searchTerm)
              );
              const postsToDisplay = searchTerm.length ? filteredPosts : newArr;
              await setPosts(postsToDisplay);
              setSearchTerm("");
            } else {
              return <div>Loading</div>;
            }
          } else {
            const filteredPosts = posts.filter((post) =>
              postSearching(post, searchTerm)
            );
            const postsToDisplay = searchTerm.length ? filteredPosts : posts;
            setPosts(postsToDisplay);
            setSearchTerm("");
            setHasSearched(true);
          }
        }}
      >
        <label htmlFor="searchBar" />
        Search:
        <input
          type="textarea"
          value={searchTerm}
          id="searchBar"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    );
  }
};
