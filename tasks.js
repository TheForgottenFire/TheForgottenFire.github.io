
  
// Function to fetch data and populate the table
async function fetchAndPopulateTable() {
  const apiUrl = "https://bdkif576qc.execute-api.us-east-1.amazonaws.com/Dev/Tasks";

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
    tableContainer.innerHTML = ""; // Clear any previous content

    const table = document.createElement("table");
    table.classList.add("aws-themed-table");

    // Define the desired header order
    const headerOrder = [
      "taskid",
      "taskname",
      "requiredskills",
      "location",
      "urgency",
      "timeperiod"
    ];

    const headertitle = [
      "task id",
      "task name",
      "required skills",
      "location",
      "urgency",
      "time period"
    ];

    // Create the table header row
    const headerRow = document.createElement("tr");
    headertitle.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header.replace(/_/g, " ").toUpperCase();
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    // Add table rows in sorted order
    parsedData.forEach((rowData) => {
      const row = document.createElement("tr");
      headerOrder.forEach((header) => {
        const td = document.createElement("td");
        td.textContent = rowData[header] !== undefined ? rowData[header] : "N/A";
        row.appendChild(td);
      });
      table.appendChild(row);
    });

    tableContainer.appendChild(table);
  } catch (error) {
    console.error("Error fetching or displaying table data:", error);
  }
}

fetchAndPopulateTable();




const addTaskButton = document.getElementById("addTaskButton");
const newTaskButton = document.getElementById("newTaskButton");
const existingTaskForm = document.getElementById("existingTaskFormContainer");
const newTaskFormContainer = document.getElementById("newTaskFormContainer");

addTaskButton.addEventListener("click", () => {
  existingTaskForm.style.display = existingTaskForm.style.display === "none" ? "block" : "none";
  newTaskFormContainer.style.display = "none";
});

newTaskButton.addEventListener("click", () => {
  newTaskFormContainer.style.display = newTaskFormContainer.style.display === "none" ? "block" : "none";
  existingTaskForm.style.display = "none";
});

// document.getElementById("newTasksubmit").addEventListener("ckick", async (event) => {
//   event.preventDefault();

//   const newTask = {
//     taskid: Date.now().toString(),
//     taskname: document.getElementById("taskName").value,
//     requiredskills: document.getElementById("requiredSkills").value,
//     location: document.getElementById("location").value,
//     urgency: document.getElementById("urgency").value,
//     timeperiod: document.getElementById("timePeriod").value
//   };

//   try {
//     const response = await fetch("https://ua2jmscpr4.execute-api.us-east-1.amazonaws.com/DEv/TaskDetails", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(newTask)
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     alert("New task added successfully!");
//     fetchAndPopulateTable(); 
//     document.getElementById("newTaskForm").reset();
//     document.getElementById("newTaskFormContainer").style.display = "none";
//   } catch (error) {
//     console.error("Error adding new task:", error);
//   }
// });


document.getElementById("newTasksubmit").addEventListener("click", async (event) => {
  event.preventDefault();
  
  const taskname = document.getElementById("taskName").value;
  const requiredskills = document.getElementById("requiredSkills").value;
  const location = document.getElementById("location").value;
  const urgency = document.getElementById("urgency").value;
  const timeperiod = document.getElementById("timePeriod").value;

  const task = {
    taskname: taskname,
    requiredskills: requiredskills,
    location: location,
    urgency: urgency,
    timeperiod: timeperiod,
  };

  console.log(task);
  try {
    const response = await fetch("https://ua2jmscpr4.execute-api.us-east-1.amazonaws.com/DEv/TaskDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    
    const data2 = JSON.parse(data.body);
    if(data2.allocation_status.status=="Failed"){
      alert(data2.allocation_status.message);
      return ;
    }
    console.log(data2);
    alert(`Task successfully assigned to ${data2.allocation_status.workername}`);

    document.getElementById("existingTaskForm").reset();
    document.getElementById("existingTaskFormContainer").style.display = "none";
    fetchAndPopulateTable();
  } catch (error) {
    console.error("Error adding existing task:", error);
  }
});

document.getElementById("existingTasksubmit").addEventListener("click", async (event) => {
  event.preventDefault();

  const taskId = document.getElementById("taskId").value;

  if (!taskId) {
    alert("Please enter a valid Task ID.");
    return;
  }

  try {
    const response = await fetch("https://ua2jmscpr4.execute-api.us-east-1.amazonaws.com/DEv/TaskDetails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ taskid: taskId }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    
    const data2 = JSON.parse(data.body);
    if(data2.allocation_status.status=="Failed"){
      alert(data2.allocation_status.message);
      return ;
    }
    console.log(data2);
    alert(`Task successfully assigned to ${data2.allocation_status.workername}`);

    document.getElementById("existingTaskForm").reset();
    document.getElementById("existingTaskFormContainer").style.display = "none";
    fetchAndPopulateTable();
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

function logout(){
  sessionStorage.clear();
  alert("You have been logged out");
  window.location.href = 'login.html';
}