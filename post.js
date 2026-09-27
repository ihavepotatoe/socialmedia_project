import { getPost, deletePost } from "./postclient.js";

const postBox = document.getElementById("postBox");
const message = document.getElementById("message");
const params = new URLSearchParams(window.location.search);
const postId = params.get("id");
const editButton = document.getElementById("editButton");
const username = localStorage.getItem("username");
const deleteButton = document.getElementById("deleteButton");

if (!postId) {
  message.textContent = " no post ID was provided";
  throw new Error("post id is missing");
}

async function loadPosts() {
  try {
    const result = await getPost(postId);
    const post = result.data;

    postBox.innerHTML = `
        <h1>${post.title}</h1>
        <p>
        Author:
        <a href="/profile.html?username=${post.author.name}">
        ${post.author.name}
        </a>
        </p>
        <p>${post.body || ""}</p>`;

    if (post.author.name === username) {
      editButton.style.display = "block";
      deleteButton.style.display = "block";
    } else {
      editButton.style.display = "none";
      deleteButton.style.display = "none";
    }
  } catch (error) {
    message.textContent = error.message;
  }
}

loadPosts();

editButton.addEventListener("click", () => {
  window.location.href = `/edit.html?id=${postId}`;
});

deleteButton.addEventListener("click", async () => {
  try {
    await deletePost(postId);

    message.textContent = "post deleted";

    window.location.href = "/feed";
  } catch (error) {
    message.textContent = error.message;
  }
});
