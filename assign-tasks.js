const form = document.getElementById('create-task-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const taskName = document.getElementById('task-name').value;
  const location = document.getElementById('location').value;
  const skillsRequired = document.getElementById('skills-required').value;
  const timeLimit = document.getElementById('time-limit').value;
  const assignedPerson = document.getElementById('assigned-person').value;
  const urgancy = document.getElementById('urgancy').value;
  const worker_id = document.getElementById('worker_id').value;

  const taskData = {
    "task_name": taskName,
    "location": location,
    "skillsrequired": skillsRequired,
    "timerequired": timeLimit,
    "worker_name": assignedPerson,
    "urgancy": urgancy,
    "worker_id": worker_id
  };

  console.log(taskData);
  try {
    // const response = await fetch('https://4w08djglj1.execute-api.us-east-1.amazonaws.com/test/', {
      const response = await fetch('https://wby4phuc2h.execute-api.us-east-1.amazonaws.com/deploy/AssignTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData)
    });

    if (response.status === 200) {
      const responseData = await response.json();
      console.log(responseData);
      alert('Task created successfully!');
      form.reset(); 
    } else {
      const errorData = await response.json();
      console.error('Error creating task:', errorData);
      alert(`Error creating task: ${errorData.message || 'Unknown error'}`);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while creating the task.');
  }
});


function logout(){
  sessionStorage.clear();
  alert("You have been logged out");
  window.location.href = 'login.html';
}

  
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