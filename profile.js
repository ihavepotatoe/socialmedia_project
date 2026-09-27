import {
  getProfile,
  getProfilePosts,
  followProfile,
  unFollowProfile,
  getProfileFollowing,
} from "./profileclient.js";

const profileBox = document.getElementById("profileBox");
const message = document.getElementById("message");
const profilePosts = document.getElementById("profilePosts");
const followButton = document.getElementById("followButton");
const loggedInUsername = localStorage.getItem("username");
const params = new URLSearchParams(window.location.search);

const profileUsername =
  params.get("username") || localStorage.getItem("username");

async function loadProfile() {
  try {
    const result = await getProfile(profileUsername);
    const profile = result.data;

    if (profileUsername === loggedInUsername) {
      followButton.style.display = "none";
    } else {
      followButton.style.display = "block";
    }

    profileBox.innerHTML = `
    <h2>${profile.name}</h2>
    <p>${profile.bio || "No bio"}</p>`;
  } catch (error) {
    message.textContent = error.message;
  }
}

async function loadProfilePosts() {
  try {
    const result = await getProfilePosts(profileUsername);
    const posts = result.data;

    posts.forEach((post) => {
      const postElement = document.createElement("div");

      postElement.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body || ""}</p>
      `;

      profilePosts.appendChild(postElement);
    });
  } catch (error) {
    message.textContent = error.message;
  }
}

followButton.addEventListener("click", async () => {
  try {
    if (followButton.textContent === "follow") {
      await followProfile(profileUsername);
      followButton.textContent = "unfollow";
    } else {
      await unFollowProfile(profileUsername);
      followButton.textContent = "follow";
    }
  } catch (error) {
    message.textContent = error.message;
  }
});

async function checkFollowStatus() {
  try {
    const result = await getProfileFollowing(loggedInUsername);

    const following = result.data.following;

    const isFollowing = following.some(
      (profile) => profile.name === profileUsername,
    );

    if (isFollowing) {
      followButton.textContent = "unfollow";
    } else {
      followButton.textContent = "follow";
    }
  } catch (error) {
    message.textContent = error.message;
  }
}

loadProfile();
loadProfilePosts();

if (profileUsername !== loggedInUsername) {
  checkFollowStatus();
}
