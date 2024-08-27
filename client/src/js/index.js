document.getElementById("showLogin").addEventListener("click", function () {
  document.getElementById("loginModal").classList.remove("hidden");
});

document.getElementById("showSignup").addEventListener("click", function () {
  document.getElementById("signupModal").classList.remove("hidden");
});

document.getElementById("closeLogin").addEventListener("click", function () {
  document.getElementById("loginModal").classList.add("hidden");
});

document.getElementById("closeSignup").addEventListener("click", function () {
  document.getElementById("signupModal").classList.add("hidden");
});

document.getElementById("openSignup").addEventListener("click", function () {
  document.getElementById("loginModal").classList.add("hidden");
  document.getElementById("signupModal").classList.remove("hidden");
});

document.getElementById("openLogin").addEventListener("click", function () {
  document.getElementById("signupModal").classList.add("hidden");
  document.getElementById("loginModal").classList.remove("hidden");
});
