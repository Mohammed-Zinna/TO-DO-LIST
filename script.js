const newTaskInput = document.getElementById('newTaskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

let tasks = [];

// Format date/time to readable string
function formatTime(date) {
  return date.toLocaleString([], { 
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleComplete(${index})" />
      <div class="task-info">
        <span class="task-text">${task.text}</span>
        <span class="task-time">Added: ${formatTime(new Date(task.time))}</span>
      </div>
      <button class="deleteBtn" onclick="deleteTask(${index})" title="Delete task">×</button>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = newTaskInput.value.trim();
  if (!text) return alert('Please enter a task');

  const task = {
    text,
    completed: false,
    time: new Date().toISOString()
  };

  tasks.push(task);
  newTaskInput.value = '';
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

addTaskBtn.addEventListener('click', addTask);

newTaskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

renderTasks();
