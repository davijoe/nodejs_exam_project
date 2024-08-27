document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    console.log("Submit event triggered"); // Already working
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    // Basic validation to ensure fields are not empty
    if (!name || !email || !password) {
      alert("Please fill in all the fields.");
      console.log("Form validation failed");
      return;
    }

    console.log("Form validation passed");

    try {
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      console.log("Fetch request sent");

      if (response.ok) {
        const data = await response.json();
        console.log("User signed up successfully:", data);

        // Store the token in localStorage or sessionStorage
        localStorage.setItem("token", data.token);

        // Optionally, store the user data if needed
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirect the user to a protected route or dashboard
        // window.location.href = "/dashboard.html"; // Adjust the redirect path as needed
      } else {
        const errorData = await response.json();
        console.error("Sign up failed:", errorData);
        alert(
          "Sign up failed: " +
            (errorData.message ||
              "Please check the information provided and try again.")
        );
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      alert("An error occurred during sign up. Please try again later.");
    }
  });
