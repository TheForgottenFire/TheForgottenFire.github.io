// // Tasks Completed (Bar Chart)
// new Chart(document.getElementById('tasksCompletedChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Worker A', 'Worker B', 'Worker C', 'Worker D', 'Worker E'],
//       datasets: [{
//         label: 'Tasks Completed',
//         data: [15, 18, 20, 22, 19],
//         backgroundColor: 'rgba(54, 162, 235, 0.7)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Tasks Completed by Workers' }
//       }
//     }
//   });
  
//   // Pending Tasks (Pie Chart)
//   new Chart(document.getElementById('pendingTasksChart'), {
//     type: 'pie',
//     data: {
//       labels: ['High Priority', 'Medium Priority', 'Low Priority'],
//       datasets: [{
//         data: [10, 15, 5],
//         backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56']
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { position: 'bottom' },
//         title: { display: true, text: 'Pending Tasks by Priority' }
//       }
//     }
//   });
  
//   // Worker Efficiency (Line Chart)
//   new Chart(document.getElementById('workerEfficiencyChart'), {
//     type: 'line',
//     data: {
//       labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
//       datasets: [{
//         label: 'Efficiency (%)',
//         data: [85, 88, 92, 90, 87],
//         borderColor: '#4bc0c0',
//         tension: 0.4,
//         fill: false
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Worker Efficiency Over the Week' }
//       }
//     }
//   });
  
//   // Daily Productivity (Bar Chart)
//   new Chart(document.getElementById('dailyProductivityChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Worker A', 'Worker B', 'Worker C', 'Worker D', 'Worker E'],
//       datasets: [{
//         label: 'Products Manufactured',
//         data: [25, 30, 35, 40, 28],
//         backgroundColor: '#ff9f40'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Daily Productivity of Workers' }
//       }
//     }
//   });
  
//   // Overdue Tasks (Doughnut Chart)
//   new Chart(document.getElementById('overdueTasksChart'), {
//     type: 'doughnut',
//     data: {
//       labels: ['On Time', 'Overdue'],
//       datasets: [{
//         data: [80, 20],
//         backgroundColor: ['#36a2eb', '#ff6384']
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { position: 'bottom' },
//         title: { display: true, text: 'Overdue Tasks Ratio' }
//       }
//     }
//   });
  
//   // Shift Performance (Radar Chart)
//   new Chart(document.getElementById('shiftPerformanceChart'), {
//     type: 'radar',
//     data: {
//       labels: ['Shift 1', 'Shift 2', 'Shift 3', 'Shift 4'],
//       datasets: [{
//         label: 'Performance Score',
//         data: [75, 80, 85, 70],
//         backgroundColor: 'rgba(153, 102, 255, 0.2)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Shift Performance Scores' }
//       }
//     }
//   });
  
//   // Break Time Analysis (Polar Area Chart)
//   new Chart(document.getElementById('breakTimeAnalysisChart'), {
//     type: 'polarArea',
//     data: {
//       labels: ['Worker A', 'Worker B', 'Worker C', 'Worker D'],
//       datasets: [{
//         data: [15, 10, 20, 18],
//         backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0']
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Break Time Analysis by Workers (Minutes)' }
//       }
//     }
//   });
  
//   // Quality Control (Bar Chart)
//   new Chart(document.getElementById('qualityControlChart'), {
//     type: 'bar',
//     data: {
//       labels: ['Worker A', 'Worker B', 'Worker C', 'Worker D'],
//       datasets: [{
//         label: 'Defects Identified',
//         data: [2, 3, 1, 4],
//         backgroundColor: '#36a2eb'
//       }]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: { display: true },
//         title: { display: true, text: 'Quality Control Analysis' }
//       }
//     }
//   });
  
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
        "taskname",
        "taskstatus",
        "workername",
        "skillsrequired",
        "location",
        "urgency",
        "timestamp",
        "timerequired"
      ];
  
      // Add table header
      const headerRow = document.createElement("tr");
      requiredFields.forEach((field) => {
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
  
  // Call the function to fetch and populate the table
  fetchAndPopulateTable();
  

