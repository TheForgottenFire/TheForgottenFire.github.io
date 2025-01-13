const form = document.getElementById('create-task-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const taskName = document.getElementById('task-name').value;
  const location = document.getElementById('location').value;
  const skillsRequired = document.getElementById('skills-required').value;
  const timeLimit = document.getElementById('time-limit').value;
  const assignedPerson = document.getElementById('assigned-person').value;
  const urgancy = document.getElementById('urgancy').value;


  const taskData = {
    "task_name": taskName,
    "location": location,
    "skillsrequired": skillsRequired,
    "timerequired": timeLimit,
    "worker_name": assignedPerson,
    "urgancy": urgancy
  };

  console.log(taskData);
  try {
    const response = await fetch('https://4w08djglj1.execute-api.us-east-1.amazonaws.com/test/', {
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

