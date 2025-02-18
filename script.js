const addTodoButton = document.querySelector('.addButton');
const taskList = document.querySelector('.task-list');
const taskInput = document.querySelector('#task-input');
const addingStatus = document.querySelector('.adding-status');
const finishedTaskList = document.querySelector('.finished-task-list');
let statusTimeout;

// Retrieve stored tasks from cookies
let undoList = getCookies('undoList') || [];
let finishedList = getCookies('finishedList') || [];

// Function to set cookies
function setCookies(type, value) {
    document.cookie = `${type}=${encodeURIComponent(JSON.stringify(value))}; path=/; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
}

// Function to get cookies
function getCookies(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        let [key, value] = cookie.split('=');
        if (key === name) {
            return JSON.parse(decodeURIComponent(value));
        }
    }
    return [];
}

// Function to delete cookies
function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
}

// Function to load tasks from cookies and display them
function loadTasks() {
    taskList.innerHTML = "";
    finishedTaskList.innerHTML = "";

    // Load undone tasks
    undoList.forEach(task => createTaskBox(task, false));
    
    // Load finished tasks
    finishedList.forEach(task => createTaskBox(task, true));
}

// Event listener for adding new tasks
addTodoButton.addEventListener('click', () => {
    if (taskInput.value.trim() !== '') {
        undoList.push(taskInput.value);
        setCookies('undoList', undoList);
        createTaskBox(taskInput.value, false);
        showAddingStatus('Task added!', 'green-font');
        taskInput.value = ''; 
    } else {
        showAddingStatus('You need to fill something!', 'red-font');
    }
});

// Handle "Enter" key for adding tasks
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target === taskInput) {
        addTodoButton.click();
    }
});

// Function to create a task box
function createTaskBox(taskText, isFinished) {
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box', isFinished ? 'pink-bg' : 'green-bg');

    // Left side (Task title and checkbox)
    const leftTask = document.createElement('div');
    leftTask.classList.add('left-task');

    const taskTitle = document.createElement('input');
    taskTitle.value = taskText;
    taskTitle.classList.add('edit-input');
    taskTitle.type = 'text';
    taskTitle.setAttribute('disabled', true);

    leftTask.append(taskTitle);

    // Right side (Buttons)
    const rightTask = document.createElement('div');
    rightTask.classList.add('right-task');

    if (!isFinished) {
        // Add checkbox only for undo tasks
        const check = document.createElement('i');
        check.classList.add('fa-solid', 'fa-circle-check');
        check.addEventListener('click', () => finishTask(taskBox, taskText));
        leftTask.prepend(check);

        // Add edit button only for undo tasks
        const editTask = document.createElement('i');
        editTask.classList.add('fa-solid', 'fa-pencil', 'edit-task');
        editTask.addEventListener('click', () => {
            taskTitle.removeAttribute('disabled');
            taskTitle.focus();
        });

        taskTitle.addEventListener('blur', () => {
            taskTitle.setAttribute('disabled', true);
        });

        taskTitle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                taskTitle.setAttribute('disabled', true);
            }
        });

        rightTask.append(editTask);
    }

    // Remove button (always present)
    const removeTask = document.createElement('i');
    removeTask.classList.add('fa-solid', 'fa-trash', 'remove-task');
    removeTask.addEventListener('click', () => removeTaskFromList(taskBox, taskText, isFinished));

    rightTask.append(removeTask);
    taskBox.append(leftTask, rightTask);

    if (isFinished) {
        finishedTaskList.append(taskBox);
    } else {
        taskList.append(taskBox);
    }
}

// Function to mark a task as finished
function finishTask(taskBox, taskText) {
    taskBox.remove(); // Remove from undo list
    taskBox.classList.remove('green-bg');
    taskBox.classList.add('pink-bg');

    // Remove check and edit button
    taskBox.querySelector('.fa-circle-check')?.remove();
    taskBox.querySelector('.edit-task')?.remove();

    // Move task to finished list
    undoList = undoList.filter(task => task !== taskText);
    finishedList.push(taskText);
    setCookies('undoList', undoList);
    setCookies('finishedList', finishedList);

    finishedTaskList.append(taskBox);
    showAddingStatus('Task finished!', 'green-font');
}

// Function to remove a task
function removeTaskFromList(taskBox, taskText, isFinished) {
    taskBox.remove();
    showAddingStatus('Task removed!', 'red-font');

    if (isFinished) {
        finishedList = finishedList.filter(task => task !== taskText);
        setCookies('finishedList', finishedList);
    } else {
        undoList = undoList.filter(task => task !== taskText);
        setCookies('undoList', undoList);
    }
}

// Function to show adding status
function showAddingStatus(message, className) {
    clearTimeout(statusTimeout);
    addingStatus.classList.remove('green-font', 'red-font');
    addingStatus.classList.add(className);
    addingStatus.innerHTML = message;

    statusTimeout = setTimeout(() => {
        addingStatus.innerHTML = '';
    }, 3000);
}

// Load tasks when the page loads
loadTasks();
