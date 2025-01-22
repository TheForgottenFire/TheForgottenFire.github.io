
  async function fetchAndPopulateTable() {
    const apiUrl = "https://wrbs1w3prc.execute-api.us-east-1.amazonaws.com/DEV/Workers"; 
    
    try {
      const response = await fetch(apiUrl);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      const parsedData = JSON.parse(data.body); 
      console.log(parsedData);
  
      if (!Array.isArray(parsedData) || parsedData.length === 0) {
        throw new Error("Invalid data format: Expected a non-empty array.");
      }
  
      const tableContainer = document.querySelector(".table");
  
      // Clear previous table content
      tableContainer.innerHTML = "";
  
      const table = document.createElement("table");
      table.classList.add("aws-themed-table");
  
      // Define desired column order
      const headerOrder = ["workerid", "name", "skill", "availability"];
      const headertitle = ["worker id", "name", "skills", "availability"];
      // Create header row
      const headerRow = document.createElement("tr");
      headertitle.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header.replace(/_/g, " ").toUpperCase();
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);
  
      // Add table rows
      parsedData.forEach((rowData) => {
        const row = document.createElement("tr");
  
        headerOrder.forEach((header) => {
          const td = document.createElement("td");
          td.textContent = rowData[header] !== undefined ? rowData[header] : "N/A";
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
  
  // Call the function to fetch and populate the table
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
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.querySelector(".table table");
  const rows = table.querySelectorAll("tr");

  // Skip the header row
  for (let i = 1; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let match = false;

    // Check if any cell in the row matches the filter text
    for (let j = 0; j < cells.length; j++) {
      if (cells[j].textContent.toLowerCase().indexOf(filter) > -1) {
        match = true;
        break;
      }
    }

    // Show/hide the row based on match
    rows[i].style.display = match ? "" : "none";
  }
}
