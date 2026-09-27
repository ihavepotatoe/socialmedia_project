import { registerUser } from "./authclient.js";

const form = document.getElementById("registerForm");
const message = document.getElementById("message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const userData = {
    name,
    email,
    password,
  };

  try {
    const result = await registerUser(userData);
    message.textContent = "Registration successfull!";
    console.log(result);
  } catch (error) {
    message.textContent = error.message;
  }
});
