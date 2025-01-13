document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault(); 
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const apiEndpoint = "https://qugazhd02g.execute-api.us-east-1.amazonaws.com/test/";

  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userid: username,
        password: password,
      }),
    });

    // Parse the JSON response
    const data = await response.json();

    if (response.ok) {
      // Successful login
      alert("Login successful!");
      console.log(response);
      localStorage.setItem("access", data.access);

      window.location.href = "home.html";
    } else {
      const loginMessage = document.getElementById("login-message");
      loginMessage.textContent = data.message || "Invalid credentials. Please try again.";
      loginMessage.style.display = "block";
    }
  } catch (error) {
    console.error("Error logging in:", error);

    const loginMessage = document.getElementById("login-message");
    loginMessage.textContent = "An error occurred. Please try again later.";
    loginMessage.style.display = "block";
  }
});
