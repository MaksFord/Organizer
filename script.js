const form = document.querySelector('form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const task = taskInput.value;

  const li = document.createElement('li');
  li.textContent = task;
  taskList.appendChild(li);

  taskInput.value = '';
});
