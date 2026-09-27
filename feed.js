import { getPosts } from "./postclient.js";

const postBox = document.getElementById("postBox");
const message = document.getElementById("message");
const searchInput = document.getElementById("searchInput");

let allPosts = [];

async function loadPosts() {
  try {
    const result = await getPosts();

    allPosts = result.data;

    displayPosts(allPosts);
  } catch (error) {
    message.textContent = error.message;
  }
}

function displayPosts(posts) {
  postBox.innerHTML = "";

  posts.forEach((post) => {
    const postElement = document.createElement("div");

    postElement.addEventListener("click", () => {
      window.location.href = `./post.html?id=${post.id}`;
    });

    postElement.innerHTML = `
<h2>${post.title}</h2>
<p>${post.body || ""}</p>
`;

    postBox.appendChild(postElement);
  });
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredPosts = allPosts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchTerm) ||
      post.body?.toLowerCase().includes(searchTerm)
    );
  });
  displayPosts(filteredPosts);
});

loadPosts();
