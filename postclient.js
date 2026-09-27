import { put, get, post, del } from "./apiclient.js";

/**
 * gets all posts
 * @returns {Promise<object>} api response containning all posts.
 */
export async function getPosts() {
  return get("/social/posts");
}

/**
 * gets a single post using its id
 * @param {number | string} id
 * @returns {promise<object>} api response containing specific post
 */
export async function getPost(id) {
  return get(`/social/posts/${id}?_author=true`);
}

/**
 * creates a new post
 * @param {object} postData
 * @returns {promise<object>} api response with the created post
 */
export async function createPost(postData) {
  return post("/social/posts", postData);
}

export async function updatePost(id, postData) {
  return put(`/social/posts/${id}`, postData);
}

export async function deletePost(id) {
  return del(`/social/posts/${id}`);
}
