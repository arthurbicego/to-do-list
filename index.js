const form = document.querySelector("#todo-form");
const taskTitleInput = document.querySelector("#task-title-input");
const todoListUl = document.querySelector("#todo-list");

let tasks = [];

function renderTaskOnHTML(taskTitle, done = false) {
  const li = document.createElement("li");

  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.addEventListener("change", (event) => {
    const liToToggle = event.target.parentElement;
    const spantoToggle = liToToggle.querySelector("span");
    const done = event.target.checked;
    if (done) {
      spantoToggle.style.textDecoration = "line-through";
    } else {
      spantoToggle.style.textDecoration = "none";
    }

    tasks = tasks.map((task) => {
      if (task.title === spantoToggle.textContent) {
        return {
          title: task.title,
          done: !task.done,
        };
      }

      return task;
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });
  input.checked = done;

  const span = document.createElement("span");
  span.textContent = taskTitle;
  if (done) {
    span.style.textDecoration = "line-through";
  }

  const button = document.createElement("button");
  button.textContent = "Delete";
  button.addEventListener("click", (event) => {
    const liToRemove = event.target.parentElement;
    const titleToRemove = liToRemove.querySelector("span").textContent;
    tasks = tasks.filter((task) => task.title !== titleToRemove);
    todoListUl.removeChild(liToRemove);

    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  li.appendChild(input);
  li.appendChild(span);
  li.appendChild(button);

  todoListUl.appendChild(li);
}

window.onload = () => {
  const tasksOnLocalStorage = localStorage.getItem("tasks");
  if (!tasksOnLocalStorage) return;

  tasks = JSON.parse(tasksOnLocalStorage);

  tasks.forEach((task) => {
    renderTaskOnHTML(task.title, task.done);
  });
};

form.addEventListener("submit", (event) => {
  event.preventDefault(); //no page update on forms submit

  const taskTitle = taskTitleInput.value;

  tasks.push({
    title: taskTitle,
    done: false,
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTaskOnHTML(taskTitle);

  taskTitleInput.value = "";
});
