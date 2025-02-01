const addTodoButton = document.querySelector('.addButton');
const taskList = document.querySelector('.task-list');
const taskInput = document.querySelector('#task-input');
const addingStatus = document.querySelector('.adding-status');

addTodoButton.addEventListener('click', () => {
    if(taskInput.value != ''){
    const taskBox = document.createElement('div');
    taskBox.classList.add('task-box');
//CREATE LEFT SIDE OF TASKBOX
        const leftTask = document.createElement('div');
        leftTask.classList.add('left-task');

            const check = document.createElement('i');
            check.classList.add('fa-solid','fa-circle-check');

            const taskTitle = document.createElement('input');
            taskTitle.value = taskInput.value;
            taskTitle.classList.add('edit-input');
            taskTitle.type = 'text';
            taskTitle.setAttribute('disabled',true);

        leftTask.append(check, taskTitle);
//CREATE RIGHT SIDE OF TASKBOX
        const rightTask = document.createElement('div');
        rightTask.classList.add('right-task');

            const editTask = document.createElement('i');
            editTask.classList.add('fa-solid','fa-pencil','edit-task');
            editTask.addEventListener('click', () => {
                taskTitle.removeAttribute('disabled');
                taskTitle.focus();

                document.addEventListener('click', (e) => {
                    if (e.target !== taskTitle && e.target !== editTask) {
                        taskTitle.setAttribute('disabled', true);
                    }
                })
                document.addEventListener('keydown', (e) => {
                    if(e.key === 'Enter'){
                        taskTitle.setAttribute('disabled', true);
                    }
                })

            })
           


            const removeTask = document.createElement('i');
            removeTask.classList.add('fa-solid','fa-trash','remove-task');
            removeTask.addEventListener('click', () => {
                taskBox.remove();
                addingStatus.classList.remove('green-font');
                addingStatus.classList.add('red-font');
                addingStatus.innerHTML = 'Task Removed!';
                setTimeout( () => {
                    addingStatus.innerHTML = '';
                }, 3000);
            })

        rightTask.append(editTask, removeTask);

    taskBox.append(leftTask, rightTask);
//TASK ADDING STATUS
    taskList.append(taskBox);
        addingStatus.classList.remove('red-font');
        addingStatus.classList.add('green-font');
        addingStatus.innerHTML = 'Task Added!'
        setTimeout( () => {
            addingStatus.innerHTML = '';
        }, 3000);
//REMOVE FORM'S VALUE
        taskInput.value = '';
    }
    else{
        const addingStatus = document.querySelector('.adding-status');
        addingStatus.classList.remove('green-font');
        addingStatus.classList.add('red-font');
        addingStatus.innerHTML = 'You need to fill something!'
        setTimeout( () => {
            addingStatus.innerHTML = '';
        }, 3000);
    }
}
)
