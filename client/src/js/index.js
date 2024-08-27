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

function closeModal(modalId) {
  document.getElementById(modalId).classList.add("hidden");
}

document.getElementById("closeLogin").addEventListener("click", function () {
  closeModal("loginModal");
});

document.getElementById("closeSignup").addEventListener("click", function () {
  closeModal("signupModal");
});

window.addEventListener("click", function (event) {
  const loginModal = document.getElementById("loginModal");
  const signupModal = document.getElementById("signupModal");

  if (event.target === loginModal) {
    closeModal("loginModal");
  }

  if (event.target === signupModal) {
    closeModal("signupModal");
  }
});
