// document
//   .getElementById("login-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const response = await fetch("http://localhost:3000/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("User logged in successfully:", data);

//         // Store the token in localStorage or sessionStorage
//         localStorage.setItem("token", data.token);

//         // Optionally, store the user data if needed
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Redirect the user to a protected route or dashboard
//         window.location.href = "/dashboard.html"; // Adjust the redirect path as needed
//       } else {
//         const errorData = await response.json();
//         console.error("Login failed:", errorData);
//         alert(
//           "Login failed: " +
//             (errorData.message ||
//               "Please check your credentials and try again.")
//         );
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An error occurred during login. Please try again later.");
//     }
//   });
// document
//   .getElementById("login-form")
//   .addEventListener("submit", async function (event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     const email = document.getElementById("email").value;
//     const password = document.getElementById("password").value;

//     try {
//       const response = await fetch("http://localhost:3000/users/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("User logged in successfully:", data);

//         // Store the token in localStorage or sessionStorage
//         localStorage.setItem("token", data.token);

//         // Optionally, store the user data if needed
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Redirect the user to a protected route or dashboard
//         window.location.href = "/dashboard.html"; // Adjust the redirect path as needed
//       } else {
//         const errorData = await response.json();
//         console.error("Login failed:", errorData);
//         alert(
//           "Login failed: " +
//             (errorData.message ||
//               "Please check your credentials and try again.")
//         );
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       alert("An error occurred during login. Please try again later.");
//     }
//   });
document
  .getElementById("login-form")
  .addEventListener("submit", async function (event) {
    console.log("Submit event triggered"); // Add this line for debugging
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User logged in successfully:", data);

        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", data.token);

        // Optionally, store the user data if needed
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect the user to a protected route or dashboard
        // window.location.href = "/dashboard.html"; // Adjust the redirect path as needed
      } else {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        alert(
          "Login failed: " +
            (errorData.message ||
              "Please check your credentials and try again.")
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again later.");
    }
  });
