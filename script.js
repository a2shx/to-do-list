const addTodoButton = document.querySelector('.addButton');
const taskList = document.querySelector('.task-list');
const taskInput = document.querySelector('#task-input');
const addingStatus = document.querySelector('.adding-status');
const finishedTaskList = document.querySelector('.finished-task-list');
let statusTimeout;

addTodoButton.addEventListener('click', () => {
    createTaskBox();
})
document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' && e.target === taskInput){
        createTaskBox();
    }
})
function createTaskBox(){
    if(taskInput.value != ''){
        const taskBox = document.createElement('div');
        taskBox.classList.add('task-box','green-bg');
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
                    showAddingStatus('Task removed!', 'red-font');
                })
    
            rightTask.append(editTask, removeTask);
    
        taskBox.append(leftTask, rightTask);
    //TASK ADDING STATUS
        taskList.append(taskBox);
        showAddingStatus('Task added!', 'green-font');
    
    //REMOVE FORM'S VALUE
            taskInput.value = '';
    
    //FINISH TASK
    
        check.addEventListener('click', () => {
            check.remove();
            editTask.remove();
            taskBox.classList.remove('green-bg');
            taskBox.classList.add('pink-bg');
            finishedTaskList.append(taskBox);
            showAddingStatus('Task finished!', 'green-font')
        });
    
        }
        else{
            const addingStatus = document.querySelector('.adding-status');
            showAddingStatus('You need to fill something!', 'red-font');
        }
}
function showAddingStatus(message, classname) {

    clearTimeout(statusTimeout);
    addingStatus.classList.remove('green-font', 'red-font');
    addingStatus.classList.add(classname);
    addingStatus.innerHTML = message;

    statusTimeout = setTimeout( () => {
        addingStatus.innerHTML = '';
    }, 3000);
}
