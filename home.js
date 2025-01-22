
  async function fetchAndPopulateTable() {
    const apiUrl = "https://4w08djglj1.execute-api.us-east-1.amazonaws.com/test/";
  
    try {
      // Fetch data from the API
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const parsedData = JSON.parse(data.body); // Assuming `data.body` is a JSON string
      console.log(parsedData);
  
      // Ensure the data is an array
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error("Invalid data format: Expected a non-empty array.");
      }
  
      // Get the table container
      const tableContainer = document.querySelector(".table");
  
      // Clear previous table if it exists
      tableContainer.innerHTML = "";
  
      // Create a table element
      const table = document.createElement("table");
      table.classList.add("aws-themed-table");
  
      // Define the required fields to display
      const requiredFields = [
        "taskid",
        "taskname",
        "taskstatus",
        "workerid",
        "workername",
        "skillsrequired",
        "location",
        "urgency",
        "timestamp",
        "timerequired"
      ];
      const titles = [
        "Task Id",
        "Task Name",
        "Task Status",
        "Worker Id",
        "Worker Name",
        "Skills Required",
        "Location",
        "Urgency",
        "Time Stamp",
        "Time Required"
      ];
      // Add table header
      
      const headerRow = document.createElement("tr");
      titles.forEach((field) => {
        const th = document.createElement("th");
        th.textContent = field.replace(/_/g, " ").toUpperCase(); // Format header text
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
  
      // Add table rows
      parsedData.forEach((rowData) => {
        const row = document.createElement("tr");
  
        requiredFields.forEach((field) => {
          const td = document.createElement("td");
          td.textContent = rowData[field] !== undefined ? rowData[field] : "N/A"; // Display "N/A" if field is missing
          row.appendChild(td);
        });
  
        table.appendChild(row);
      });
  
      // Append the table to the container
      tableContainer.appendChild(table);
    } catch (error) {
      console.error("Error fetching or displaying table data:", error);
    }
  }
  
  fetchAndPopulateTable();
  
if(sessionStorage.getItem("login")==undefined || !sessionStorage.getItem("login") || sessionStorage.getItem("login")==false){
  window.location.href = "login.html";
}else if(sessionStorage.getItem("login")==true && sessionStorage.getItem("access")==false){
  if (sessionStorage.getItem("workerid") && sessionStorage.getItem("workerid")!=null){
    window.location.href = "workerHomePage.html";
  }else{
    sessionStorage.setItem("login")=false;
    sessionStorage.setItem("access")=false;
    sessionStorage.setItem("workerid")=null;
  }
}else{}

function logout(){
  sessionStorage.clear();
  alert("You have been logged out");
  window.location.href = 'login.html';
}

function filterTable() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const table = document.querySelector(".table table");
  const rows = table.getElementsByTagName("tr");

  // Loop through all table rows (excluding the header row)
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.getElementsByTagName("td");
    let rowMatches = false;

    // Loop through all cells in the row
    for (let j = 0; j < cells.length; j++) {
      const cellContent = cells[j].textContent || cells[j].innerText;

      // Check if the cell content matches the search input
      if (cellContent.toLowerCase().includes(searchInput)) {
        rowMatches = true;
        break;
      }
    }

    // Show or hide the row based on the search match
    row.style.display = rowMatches ? "" : "none";
  }
}
