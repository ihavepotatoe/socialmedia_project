import { getPost, updatePost } from "./postclient.js";

const form = document.getElementById("editPostForm");
const titleInput = document.getElementById("title");
const bodyInput = document.getElementById("body");
const message = document.getElementById("message");

const params = new URLSearchParams(window.location.search);
const postId = params.get("id");

console.log("POST ID:", postId);
console.log("TYPE:", typeof postId);

async function loadPost() {
  try {
    const result = await getPost(postId);
    const post = result.data;

    titleInput.value = post.title;
    bodyInput.value = post.body || "";
  } catch (error) {
    message.textContent = error.message;
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const postData = {
    title: titleInput.value,
    body: bodyInput.value,
  };
  try {
    console.log("UPDATING ID:", postId);
    await updatePost(postId, postData);

    message.textContent = "post updated succesfully";
  } catch (error) {
    message.textContent = error.message;
  }
});

loadPost();
