// Worker A Performance (Bar Chart)
// new Chart(document.getElementById('workerAChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Tasks Completed', 'Efficiency (%)', 'Break Time (Minutes)', 'Defects Identified'],
//       datasets: [{
//         label: 'Worker A Performance',
//         data: [20, 90, 15, 3], // Example data
//         backgroundColor: '#36a2eb'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Worker A Performance' }
//       }
//     }
//   });
  
//   // Worker B Performance (Pie Chart)
//   new Chart(document.getElementById('workerBChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Tasks Completed', 'Efficiency (%)', 'Break Time (Minutes)', 'Defects Identified'],
//       datasets: [{
//         label: 'Worker B Performance',
//         data: [20, 90, 15, 3], // Example data
//         backgroundColor: '#36a2eb'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Worker B Performance' }
//       }
//     }
//   });
  
//   // Worker C Performance (Line Chart)
//   new Chart(document.getElementById('workerCChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Tasks Completed', 'Efficiency (%)', 'Break Time (Minutes)', 'Defects Identified'],
//       datasets: [{
//         label: 'Worker C Performance',
//         data: [25, 50, 35, 7], // Example data
//         backgroundColor: '#36a2eb'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Worker C Performance' }
//       }
//     }
//   });
  
//   // Worker D Performance (Doughnut Chart)
//   new Chart(document.getElementById('workerDChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Tasks Completed', 'Efficiency (%)', 'Break Time (Minutes)', 'Defects Identified'],
//       datasets: [{
//         label: 'Worker D Performance',
//         data: [20, 30, 25, 13], // Example data
//         backgroundColor: '#36a2eb'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Worker D Performance' }
//       }
//     }
//   });
  

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