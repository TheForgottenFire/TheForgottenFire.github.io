document.getElementById("login-form").addEventListener("submit", async function (event) {
  event.preventDefault(); 
  
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const apiEndpoint = "https://sf7iycr2ei.execute-api.us-east-1.amazonaws.com/login_Notify/login_Notify";

  console.log()
  try {
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "username": username,
        "password": password,
      }),
    });

    // Parse the JSON response
    const data = await response.json();
    if (data.statusCode==200) {
      alert("Login successful!");
      var t = JSON.parse(data.body);
      console.log(t);

      sessionStorage.setItem("access", t.access);
      sessionStorage.setItem("login",true);
      sessionStorage.setItem("data",JSON.stringify(t));
      if(t.access===true){
        window.location.href = "home.html";
      }else{
        window.location.href = "workerHomePage.html";
      }

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

console.log(sessionStorage.getItem("login"));
if(sessionStorage.getItem("login")==true){
  if(sessionStorage.getItem("access")===true){
    window.location.href = "home.html";
  }else{
    window.location.href = "workerHomePage.html";
  }
}