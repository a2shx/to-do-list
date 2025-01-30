const taskTitle = document.querySelector('.edit-input')
const addButton = document.querySelector('.addButton')
const disInput = () => taskTitle.setAttribute('disabled',true);
disInput();
addButton.addEventListener('click', ()=> {
    taskTitle.removeAttribute('disabled');
})
taskTitle.addEventListener('click', (e) => {
    if (!e.target.classList.contains('.edit-input')) {
    
    }
})
