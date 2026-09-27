import { loginUser } from "./authclient.js";

const form = document.getElementById("loginForm");
const message = document.getElementById("message");
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  message.textContent = "you are already logged in";
  form.style.display = "none";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    email,
    password,
  };

  try {
    const result = await loginUser(userData);

    localStorage.setItem("accessToken", result.data.accessToken);
    localStorage.setItem("username", result.data.name);

    message.textContent = "login successfull";
    console.log(result);
  } catch (error) {
    message.textContent = error.message;
  }
});
