document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }), // Include the name field
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registered successfully:", data);

        // Optionally, store the token in localStorage or handle it as needed
        localStorage.setItem("token", data.token);

        // Redirect to another page or show a success message
        window.location.href = "/success.html"; // Adjust this path as needed
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        alert(
          "Registration failed: " + (errorData.message || "Please try again.")
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration. Please try again later.");
    }
  });

const passwordInput = document.getElementById("password");

passwordInput.addEventListener("input", () => {
  if (passwordInput.value.length < 7) {
    passwordInput.setCustomValidity(
      "Password must be at least 7 characters long."
    );
  } else {
    passwordInput.setCustomValidity("");
  }
});

// document
//   .getElementById("signup-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault(); // Prevent traditional form submission

//     const email = document.getElementById("signup-email").value;
//     const password = document.getElementById("signup-password").value;
//     const confirmPassword = document.getElementById("confirm-password").value;

//     // Validate password match
//     if (password !== confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     try {
//       const response = await fetch(`${API_URL}/users`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Sign-up successful:", data);

//         // Store token
//         localStorage.setItem("token", data.token);

//         // Redirect to dashboard
//         window.location.href = "/dashboard";
//       } else {
//         const errorData = await response.json();
//         console.error("Sign-up failed:", errorData);
//         alert(
//           "Sign-up failed: " +
//             (errorData.message || "Please check your input and try again")
//         );
//       }
//     } catch (error) {
//       console.error("Error during sign-up:", error);
//       alert("An error occurred during sign-up. Please try again later.");
//     }
//   });
