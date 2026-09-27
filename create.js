import { createPost } from "./postclient.js";

const form = document.getElementById("createPostForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const body = document.getElementById("body").value;
  const postData = {
    title,
    body,
  };
  try {
    const result = await createPost(postData);

    message.textContent = "Post created successfully";
    console.log(result);
  } catch (error) {
    message.textContent = error.message;
  }
});
