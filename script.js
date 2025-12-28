let tasks = [];

const taskList = document.getElementById("task-list");
const addBtn = document.getElementById("add-btn");

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.body.style.backgroundColor = "green";
}

function renderTasks() {
  taskList.innerHTML = "";

  const filteredTasks = showCompletedOnly
    ? tasks.filter((task) => task.completed)
    : tasks;

  filteredTasks.forEach((task, index) => {
    const originalIndex = tasks.indexOf(task);

    const taskItem = document.createElement("div");
    taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

    taskItem.innerHTML = `
            <div class="task-actions">
                <button class="action-btn edit-btn icon-edit" onclick="editTask(${originalIndex})"></button>
                <button class="action-btn check-btn icon-check" onclick="toggleTask(${originalIndex})"></button>
                <button class="action-btn delete-btn icon-delete" onclick="deleteTask(${originalIndex})"></button>
            </div>
            <div class="task-info">
                <span class="task-title">${task.title}</span>
                <span class="task-date icon-calendar">${task.date}</span>
            </div>
        `;
    taskList.appendChild(taskItem);
  });
}

let showCompletedOnly = false;
const filterBtn = document.getElementById("filter-btn");

filterBtn.addEventListener("click", () => {
  showCompletedOnly = !showCompletedOnly;
  filterBtn.classList.toggle("active");
  filterBtn.title = showCompletedOnly ? "عرض الكل" : "المهام المنجزة";
  renderTasks();
});

addBtn.addEventListener("click", () => {
  const title = prompt("أدخل المهمة الجديدة:");
  if (title && title.trim() !== "") {
    const newTask = {
      title: title.trim(),
      date: new Date().toLocaleDateString("ar-EG"),
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
  }
});

window.editTask = function (index) {
  const currentTitle = tasks[index].title;
  const newTitle = prompt("تعديل المهمة:", currentTitle);

  if (newTitle && newTitle.trim() !== "") {
    tasks[index].title = newTitle.trim();
    saveTasks();
    renderTasks();
  }
};

window.toggleTask = function (index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
};

window.deleteTask = function (index) {
  if (confirm("هل أنت متأكد من حذف هذه المهمة؟")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
};

loadTasks();
