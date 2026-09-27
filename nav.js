const authLink = document.getElementById("authLink");
const accessToken = localStorage.getItem("accessToken");

if (accessToken) {
  authLink.textContent = "Logout";
  authLink.href = "#";

  authLink.addEventListener("click", (event) => {
    event.preventDefault();

    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

    window.location.href = "./index.html";
  });
} else {
  authLink.textContent = "Login";
  authLink.href = "./index.html";
}
