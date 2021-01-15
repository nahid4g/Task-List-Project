let form = document.querySelector("#input_form");
let new_task = document.querySelector("#new_task");
let filter = document.querySelector("#filter");
let clear_btn = document.querySelector("#clear_btn");
let taskList = document.querySelector("ul");

// Define event listeners
form.addEventListener("submit",addTask);
taskList.addEventListener("click",removeTask);
clear_btn.addEventListener("click",clearTasks);
filter.addEventListener("keyup",filterTask);
document.addEventListener("DOMContentLoaded",getTasks);

// Define functions
function addTask(e) {
	if (new_task.value === "") {
		alert("Please add a Task");
	} else {
		let li = document.createElement("li");
		li.appendChild(document.createTextNode(new_task.value + " "));
		let link = document.createElement("a");
		link.setAttribute("href","#");
		link.innerHTML = "x";
		li.appendChild(link)
		taskList.appendChild(li);
		storeTaskInLocalStorage(new_task.value)
		new_task.value ="";
	}
	e.preventDefault();
}

// Remove Task
function removeTask(e) {
	if (e.target.hasAttribute("href")) {
		if (confirm("Are you sure?")) {
			let ele = e.target.parentElement;
			ele.remove();
			removeFromLS(ele)
		}
	}
	e.preventDefault();
}

// Clear all tasks
function clearTasks (e) {
	if (confirm("Are you sure?")) {
		while(tasks.firstChild) {
			tasks.removeChild(tasks.firstChild);
		}
	}
}

// Filter Tasks
function filterTask(e) {
	text = e.target.value.toLowerCase();
	document.querySelectorAll("li").forEach(item => {
		let task = item.firstChild.textContent;
		if (task.toLowerCase().indexOf(text) != -1) {
			item.style.display = "block";
		} else {
			item.style.display = "none";
		}
	})
}

// STORE TASK IN LOCAL STORAGE..
function storeTaskInLocalStorage(task) {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"))
	}
	tasks.push(task);
	localStorage.setItem("tasks",JSON.stringify(tasks))
}

function getTasks() {
	let tasks;
	if (localStorage.getItem("tasks") === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem("tasks"))
	}
	tasks.forEach(task => {
		let li = document.createElement("li");
		li.appendChild(document.createTextNode(task + " "));
		let link = document.createElement("a");
		link.setAttribute("href","#");
		link.innerHTML = "x";
		li.appendChild(link)
		taskList.appendChild(li);
	})
}