document.addEventListener('DOMContentLoaded', function () {
    const newTaskForm = document.getElementById('new-task-form');
    const taskInput = document.getElementById('taskInput');
    const tasksContainer = document.getElementById('tasks');

    // Load tasks from localStorage on page load
    loadTasks();

    newTaskForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskValue = taskInput.value.trim();

        if (taskValue !== '') {
            createTask(taskValue);
            saveTasks();
            taskInput.value = '';
        }
    });

    function createTask(taskValue) {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        const taskTextInput = document.createElement('input');
        taskTextInput.type = 'text';
        taskTextInput.classList.add('text');
        taskTextInput.value = taskValue;
        taskTextInput.readOnly = true;

        contentDiv.appendChild(taskTextInput);

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('actions');

        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.addEventListener('click', function () {
            taskTextInput.readOnly = !taskTextInput.readOnly;
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.addEventListener('click', function () {
            tasksContainer.removeChild(taskDiv);
            saveTasks();
        });

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);

        taskDiv.appendChild(contentDiv);
        taskDiv.appendChild(actionsDiv);

        tasksContainer.appendChild(taskDiv);
    }

    const addTaskButton = document.getElementById('newtask');
    addTaskButton.addEventListener('click', function () {
        const taskValue = taskInput.value.trim();

        if (taskValue !== '') {
            createTask(taskValue);
            saveTasks();
            taskInput.value = '';
        }
    });

    function saveTasks() {
        const tasks = [];
        const taskElements = document.querySelectorAll('.task .text');
        taskElements.forEach(function (taskElement) {
            tasks.push(taskElement.value);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(function (taskValue) {
            createTask(taskValue);
        });
    }
});