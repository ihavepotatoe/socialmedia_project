import { get, put } from "./apiclient.js";

export async function getProfile(username) {
  return get(`/social/profiles/${username}`);
}

export async function getProfilePosts(username) {
  return get(`/social/profiles/${username}/posts`);
}

export async function followProfile(username) {
  return put(`/social/profiles/${username}/follow`);
}

export async function unFollowProfile(username) {
  return put(`/social/profiles/${username}/unfollow`);
}

export async function getProfileFollowing(username) {
  return get(`/social/profiles/${username}?_following=true`);
}
