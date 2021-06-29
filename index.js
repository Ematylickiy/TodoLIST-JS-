const input = document.querySelector('#todo');
const btn = document.querySelector('#addTodo');
const todoList = document.querySelector('.todoList');

let tasks = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'));
let updateLocalStorage = () => localStorage.setItem('tasks', JSON.stringify(tasks));

function Task(task) {
    this.currentTask = task;
    this.completed = false;
};

input.addEventListener('keyup', (event => event.code != 'Enter' ? '' : addTodo()));


function addTodo() {
    if (!input.value) {
        alert('Enter some text');
    } else {
        tasks.push(new Task(input.value));
        updateTodoListAndLocalStorage();
        input.value = '';
    }
};


function fillTodoList() {
    todoList.innerHTML = '';
    if (tasks.length > 0) {
        tasks.forEach((item, index) => {
            todoList.innerHTML += wrapTask(item, index)
        })
    }
};

fillTodoList()

function wrapTask(task, index) {
    return (
        `<div class="taskWrap ${task.completed ? 'active' : ''}">
            <div class="task">${task.currentTask}</div>
            <div class="buttons">
                <input onclick = completeTask(${index}) id='checked' type="checkbox" ${task.completed ? 'checked' : ''}>
                <button class="deleteTask" onclick = deleteTask(${index})>delete</button>
            </div >
        </div > `)
};

function updateTodoListAndLocalStorage() {
    fillTodoList();
    updateLocalStorage();
};


function completeTask(index) {
    setClassToTask(index, 'active');

    tasks[index].completed = !tasks[index].completed;
    updateTodoListAndLocalStorage();
};


function deleteTask(index) {
    setClassToTask(index, 'delete');

    setTimeout(() => {
        tasks.splice(index, 1);
        updateTodoListAndLocalStorage();
    }, 500);
};


function setClassToTask(taskIndex, className) {
    let task = document.querySelectorAll('.taskWrap');
    return (
        task[taskIndex].classList.toggle(className)
    )
};


document.querySelector('#delete-everything').addEventListener('click', () => {
    tasks = [];
    todoList.innerHTML = '';
    localStorage.clear();
});

function filterTasks(filter) {
    tasks = [...filter];
    fillTodoList();
};


document.querySelector('#showActiveTask').addEventListener('click', () => {
    let activeTasks = tasks.filter(item => !item.completed);
    filterTasks(activeTasks);
});


document.querySelector('#showAllTask').addEventListener('click', () => {
    let allTasks = JSON.parse(localStorage.getItem('tasks'));
    filterTasks(allTasks);
});








