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

//Functions
function updateNumberOfWork() {
  const checkedBoxes = document.querySelectorAll('input:checked');
  const numberOfWork = document.querySelector('.number-of-work');
  const todoSelector = document.querySelectorAll('.todo-item');
  const numberOfChecked = checkedBoxes.length;

  if (numberOfChecked == todoSelector.length) {
    checkAllSelector.classList.remove('shadow');
  } else {
    checkAllSelector.classList.add('shadow');
  }
  if (todoSelector.length == '0') {
    checkAllSelector.classList.add('shadow');
  }
    numberOfWork.innerText = parseInt(todoSelector.length) - parseInt(numberOfChecked);
}
updateNumberOfWork();

function show() {
  const detailListSelector = document.querySelector('.detail');
  const btnClearSelector = document.querySelector(".btn-clear");
  const todoSelector = document.querySelectorAll('.todo');
  const checkAllSelector = document.querySelector('.tick-all');
  if (todoSelector.length == '0') {
    detailListSelector.classList.add('hidden');
    btnClearSelector.classList.add('hidden');
    checkAllSelector.classList.add('shadow');
  }
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
    item.classList.remove('pending');
  });
}

function removeCompleted(el) {
  el.forEach((item) => {
    item.classList.remove('completed');
    item.classList.add('pending');
  });
}

function removeHide(item){
  item.classList.remove('hidden');
}

function addHide(item){
  item.classList.remove('hidden');
}

let count = 0;
function addToDo(event) {
  event.preventDefault();
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  todoDiv.classList.add('pending');
  todoDiv.setAttribute('id',`${++count}`);
  const checkingValue = todoDiv.classList[1];

  const completedButton = document.createElement('input');
  completedButton.classList.add('check-button');
  completedButton.type = 'checkbox';
  todoDiv.appendChild(completedButton);

  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);

  saveLocalTodos(count,todoInput.value,checkingValue); 

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class= "fas fa-trash"></i>';
  deleteButton.classList.add('delete-button');
  todoDiv.appendChild(deleteButton);

  if (todoInput.value.trim() === '') {
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

  if (item.classList[0] === 'delete-button') {
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
  let todos;
  todos = JSON.parse(localStorage.getItem('todos'));
  if (item.checked == true) {
    const checkToDo = item.parentElement;
    checkToDo.classList.add('completed');
    checkToDo.classList.remove('pending');
    todos.forEach((item) => {
      if(item.id == checkToDo.id){
        item.status = 'completed';
      }
    })
    localStorage.setItem('todos', JSON.stringify(todos)); 
  } else {
    const checkToDo = item.parentElement;
    checkToDo.classList.remove('completed'); 
    checkToDo.classList.add('pending');
    todos.forEach((item) => {
      if(item.id == checkToDo.id){
        item.status = 'pending';
      }
    }) 
    localStorage.setItem('todos', JSON.stringify(todos));
  }
  // filterSelector.forEach((filter) => {
  //   if (filter.value === 'Active' && item.checked === true){
  //     item.style.display = 'none';
  //   } 
  // })
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
  document.querySelector('button.checked').classList.remove('checked');

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
  let todos;
  todos = JSON.parse(localStorage.getItem('todos'));
  if (checkAllSelector.classList.contains('shadow') === true) {
    checkAllSelector.classList.remove('shadow');
    checkBox(inputSelector);
    todoSelector.forEach((item) => {
      item.classList.add('completed');
      item.classList.remove('pending');
    })
    todos.forEach((item) => {
      item.status = 'completed';
    })
  } else {
    checkAllSelector.classList.add('shadow');
    uncheckBox(inputSelector);
    todoSelector.forEach(item => {
      item.classList.remove('completed');
      item.classList.add('pending');
    })
    todos.forEach((item) => {
      item.status = 'pending';
    })
  }
  updateNumberOfWork();
}

function saveLocalTodos(id,todo,status) {
  let todos = localStorage.getItem('todos');
  if (todos === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  var test = todo.trim();
  if (test) {
    todos.push({id, todo, status});
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
    todoDiv.classList.add(todo.status);
    todoDiv.id = todo.id;
    const completedButton = document.createElement('input');
    completedButton.classList.add('check-button');
    completedButton.type = 'checkbox';
    todoDiv.appendChild(completedButton);
    if (todo.status === 'pending') {
      completedButton.checked = false;
    } else {
      completedButton.checked = true;
    }

    const newTodo = document.createElement('li');
    newTodo.innerText = todo.todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class= "fas fa-trash"></i>';
    deleteButton.classList.add('delete-button');
    todoDiv.appendChild(deleteButton);
    todoList.appendChild(todoDiv);
    const detailListSelector = document.querySelector('.detail');
    const btnClearSelector = document.querySelector(".btn-clear");
    const todoSelector = document.querySelectorAll('.todo');
    const numberOfWork = document.querySelector('.number-of-work');
    detailListSelector.classList.remove('hidden');
    btnClearSelector.classList.remove('hidden');
    numberOfWork.innerText = todoSelector.length;
  })

  let todos2 = todos.filter((todo) => todo.status === 'completed');
  const checkAllSelector = document.querySelector('.tick-all');

  console.log(todos2.length);
  console.log(todos.length);
  if(todos2.length === todos.length){
    checkAllSelector.classList.remove('shadow');
  } else {
    checkAllSelector.classList.add('shadow');
  }
  // checkAllSelector.classList.add('shadow');
  localStorage.setItem('todos', JSON.stringify(todos)); 
}

function removeLocalStorageTodos(todo) {
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[1].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function clearAllChecked() {
  const todoSelector = document.querySelectorAll('.todo');
  todoSelector.forEach((item) => {
    if (item.classList.contains('completed')) {
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
  if (test) {
    todo.innerText = editTodo;
    var newValue = todo.innerText;
    inputTodo.checked = false;
    saveLocalTodos(newValue);
  } else {
    todo.innerText = todo.textContent;
    alert("You did't edit your mission!");
  }
}