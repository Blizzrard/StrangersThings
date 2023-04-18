const COHORT_NAME = "2301-FTB-MT-WEB-PT";
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

export default async function fetchAllPosts() {
  const response = await fetch(`${BASE_URL}/posts`);
  const data = await response.json();
  console.log(data.data.posts, "Hello");
  return data.data.posts;
}
