// a simple to do list for my pet portfolio
// by @therealmikh

// getting elements
const inputBox = document.querySelector(".inputField input");
const addTaskBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const clearTasksBtn = document.querySelector(".footer button");


showTasks();
inputBox.onkeyup = () => {
    let userData = inputBox.value; // get data from inputBox
    if (userData.trim() != 0) { // if wasn't empty
         addTaskBtn.classList.add("active"); // make button as active
    } else {
        addTaskBtn.classList.remove("active"); // if empty
    }
}

// handler for adding tasks `button`
addTaskBtn.onclick = () => {
    let userData = inputBox.value;
    let getLocalStorage = localStorage.getItem("New Todo"); // get local storage
    if (getLocalStorage == null) { // if localStorage is null
        listArr = []; // creating empty array
    } else {
        listArr = JSON.parse(getLocalStorage); // convert json string to js object
    }

    listArr.push(userData); // push or add user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // convert js object to string
    showTasks();    // show tasks
    addTaskBtn.classList.remove("active"); // if empty
}


clearTasksBtn.onclick = () => {
    deleteAllTask();
}


// show tasks to user
function showTasks() {
    let getLocalStorage = localStorage.getItem("New Todo");

    if (getLocalStorage == null) { // if localStorage is null
        listArr = []; // creating empty array
    } else {
        listArr = JSON.parse(getLocalStorage); // convert json string to js object
    }

    const pendingNumb = document.querySelector(".footer .pendingNumber");
    pendingNumb.textContent = listArr.length;

    if (listArr.length > 0) {
        clearTasksBtn.classList.add("active");
    } else {
        clearTasksBtn.classList.remove("active");
    }

    let newLiTag = '';

    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span onclick="deleteTask(${index});"><i class="fas fa-trash"></i></span></li>`;
    });
    
    todoList.innerHTML = newLiTag; // adding new li tag inside ul (in todoList box)
    inputBox.value = ""; // clear input after showTasks
}


// delete task
function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage); 
    listArr.splice(index, 1); // delete one li item from ul

    // after remoove need update data in localStorage
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // convert js object to string
    showTasks();
}

// delete all tasks
function deleteAllTask() {
    listArr = [];
    localStorage.setItem("New Todo", JSON.stringify(listArr)); // convert js object to string
    showTasks();
}