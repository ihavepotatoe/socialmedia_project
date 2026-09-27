import { post } from "./apiclient.js";

export async function registerUser(userData) {
  return post("/auth/register", userData);
}
export async function loginUser(userData) {
  return post("/auth/login", userData);
}
