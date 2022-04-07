//Selectors
const todoInput = document.querySelector('#content');
const todoButtonAdd = document.querySelector('.todo-button-add');
const todoList = document.querySelector('.todo-list');
const detailListSelector = document.querySelector('.detail');
const filterSelector = document.querySelectorAll('.filter-btn button');
const checkAllSelector = document.querySelector('.tick-all');
const numberOfWork = document.querySelector('.number-of-Work');
const btnClearSelector = document.querySelector(".btn-clear");
const todoSelector = document.querySelectorAll('.todo-item');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButtonAdd.addEventListener('click', addToDo);
todoList.addEventListener('click', deleteCheck);
todoList.addEventListener('click', checkedBox);
checkAllSelector.addEventListener('click', checkAllTodos);
btnClearSelector.addEventListener('click', clearAllChecked);
// todoItem.addEventListener('click', editTodo);
updateNumberOfWork();

//Functions
function show() {
  const detailListSelector = document.querySelector('.detail');
  const btnClearSelector = document.querySelector(".btn-clear");
  const todoSelector = document.querySelectorAll('.todo');
  const checkAllSelector = document.querySelector('.tick-all');
  if(todoSelector.length == '0'){
    detailListSelector.classList.add('hidden');
    btnClearSelector.classList.add('hidden');
    checkAllSelector.classList.add('shadow');
  }
}

function updateNumberOfWork() {
  const checkedBoxes = document.querySelectorAll('input:checked');
  const numberOfWork = document.querySelector('.number-of-Work');
  const todoSelector = document.querySelectorAll('.todo-item');
  const numberOfChecked = checkedBoxes.length;

  if(numberOfChecked == todoSelector.length){
    checkAllSelector.classList.remove('shadow');
  } else{
    checkAllSelector.classList.add('shadow');
  }
  if(todoSelector.length == '0') {
    checkAllSelector.classList.add('shadow');
  }
    numberOfWork.innerText = parseInt(todoSelector.length) - parseInt(numberOfChecked);
}

function checkBox(el) {
    el.forEach((item) => {
        item.checked = true;
    });
}

function uncheckBox(el) {
    el.forEach((item) => {
        item.checked = false;
    });
}

function addCompleted(el) {
  el.forEach((item) => {
      item.classList.add('completed');
  });
}

function removeCompleted(el) {
  el.forEach((item) => {
      item.classList.remove('completed');
  });
}

function removeHide(item){
  item.classList.remove('hidden');
}

function addHide(item){
    item.classList.remove('hidden');
}

function addToDo(event) {
  event.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  const completedButton = document.createElement('input');
  completedButton.classList.add('check-button');
  completedButton.type = 'checkbox';
  todoDiv.appendChild(completedButton);

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value); 

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class= "fas fa-trash"></i>';
  deleteButton.classList.add('delete-button');
  todoDiv.appendChild(deleteButton);

  if(todoInput.value.trim() == ''){
    alert('Please input your task! Thanks!')
  } else {
    todoList.appendChild(todoDiv);
    removeHide(detailListSelector);
    removeHide(btnClearSelector);
  }
  updateNumberOfWork();
  todoInput.value = "";
}

function deleteCheck(e){
  const item = e.target;

  if(item.classList[0] == 'delete-button'){
    const todo = item.parentElement;
    removeLocalStorageTodos(todo);
    todo.remove();
    updateNumberOfWork();
  }
  show();
  const todoSelector = document.querySelectorAll('.todo-item');
  todoSelector.forEach((item) => {
    item.addEventListener('click', editTodo)
  })
}

function checkedBox(e) {
  const item = e.target;
  
  if(item.checked == true){
    const checkToDo = item.parentElement;
    checkToDo.classList.add('completed');
  } else{
    const checkToDo = item.parentElement;
    checkToDo.classList.remove('completed'); 
  }
  updateNumberOfWork();
}

filterSelector.forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector('button.checked').classList.remove('checked');
    btn.classList.add('checked');
  })
  btn.addEventListener('click', filterOption);
})

function filterOption(e){
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch(e.target.value){
      case 'All':
        todo.style.display = 'flex';
        break;
      case 'Active':
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        } else{
          todo.style.display = 'none';
        }
        break;
      case 'Completed':
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        } else{
          todo.style.display = 'none';
        }
        break;
      default:
        break;
    }
  });
}

function checkAllTodos(){
  const inputSelector = document.querySelectorAll('.check-button');
  const todoSelector = document.querySelectorAll('.todo');
  if(checkAllSelector.classList.contains('shadow') == true){
    checkAllSelector.classList.remove('shadow');
    checkBox(inputSelector);
    todoSelector.forEach((item) => {
      item.classList.add('completed');
    })
    updateNumberOfWork();
  } else {
    checkAllSelector.classList.add('shadow');
    uncheckBox(inputSelector);
    todoSelector.forEach(item => {
      item.classList.remove('completed');
    })
    updateNumberOfWork();
  }
}

function saveLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  var test = todo.trim();
  if(test){
    todos.push(todo);
  }
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach((todo) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const completedButton = document.createElement('input');
    completedButton.classList.add('check-button');
    completedButton.type = 'checkbox';
    todoDiv.appendChild(completedButton);

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('Todo-item');
    todoDiv.appendChild(newTodo);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class= "fas fa-trash"></i>';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
    const detailListSelector = document.querySelector('.detail');
    const btnClearSelector = document.querySelector(".btn-clear");
    const todoSelector = document.querySelectorAll('.todo');
    const numberOfWork = document.querySelector('.number-of-Work');
    const checkAllSelector = document.querySelector('.tick-all');
    detailListSelector.classList.remove('hidden');
    btnClearSelector.classList.remove('hidden');
    numberOfWork.innerText = todoSelector.length;
    checkAllSelector.classList.add('shadow');
  })
  checkAllSelector.classList.add('shadow');
}

function removeLocalStorageTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } 
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function clearAllChecked() {
  const todoSelector = document.querySelectorAll('.todo');
  todoSelector.forEach((item) => {
    if(item.classList.contains('completed')){
      item.remove();
      removeLocalStorageTodos(item);
    }
  })
  show();
}

function editTodo(e) {
  const todo = e.target;
  const inputTodo = todo.parentElement.children[0];
  var editTodo = prompt("Edit your mission...");
  var test = editTodo.trim();
  if(test){
    todo.innerText = editTodo;
    var newValue = todo.innerText;
    inputTodo.checked = false;
    saveLocalTodos(newValue);
  } else {
    todo.innerText = todo.textContent;
    alert("You did't edit your mission!");
  }
}