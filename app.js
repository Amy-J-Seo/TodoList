// selectors
const input = document.querySelector(".todo-input");
const btn = document.querySelector(".todo-btn");
// const btn = document.getElementsByClassName("todo-btn");
// this throws error.....for the addEventListener....why?
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// add event listener
document.addEventListener("DOMContentLoaded", getTodos);
btn.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {
  event.preventDefault();
  if (input.value !== "") {
    // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create List
    const newTodo = document.createElement("li");
    newTodo.innerText = input.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // add todo to localstorage
    saveLocal(input.value);
    // create complete btn icon
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<i class="far fa-check-circle"></i>`;
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // created trash btn icon
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
    deleteBtn.classList.add("trash-btn");
    todoDiv.appendChild(deleteBtn);
    // append everything to the list ul
    todoList.appendChild(todoDiv);
    input.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  //Delete to do
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // Animation
    todo.classList.add("fall");
    removeLocal(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}
// function that save list to local storage
function saveLocal(todo) {
  // need to check if there is things in there
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // create List
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    // create complete btn icon
    const completedBtn = document.createElement("button");
    completedBtn.innerHTML = `<i class="far fa-check-circle"></i>`;
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);
    // created trash btn icon
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
    deleteBtn.classList.add("trash-btn");
    todoDiv.appendChild(deleteBtn);
    // append everything to the list ul
    todoList.appendChild(todoDiv);
  });
}
function removeLocal(todo) {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
