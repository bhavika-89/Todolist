document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAllButton = document.getElementById("delete-all");

  let editMode = false;
  let editElement = null;

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value.trim();
    if (text === "") return;

    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      createTodo(text);
    }
    inputTodo.value = "";
    saveAllTodo();
  });

  const createTodo = (task) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-start";
    li.innerHTML = `<span class="text-todo">${task}</span>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-danger btn-sm">Edit</button>
        <button type="button" class="btn btn-warning btn-sm">Delete</button>
      </div>`;

    ulTodo.appendChild(li);
  };

  ulTodo.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-warning")) {
      e.target.closest(".list-group-item").remove();
      saveAllTodo();
    }

    if (e.target.classList.contains("btn-danger")) {
      const li = e.target.closest(".list-group-item");
      const taskText = li.querySelector(".text-todo").textContent;

      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.className = "form-control";
      inputField.value = taskText;

      li.innerHTML = "";
      li.appendChild(inputField);
      inputField.focus();

      inputField.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          li.innerHTML = `<span class="text-todo">${inputField.value}</span>
            <div class="btn-group" role="group">
              <button type="button" class="btn btn-danger btn-sm">Edit</button>
              <button type="button" class="btn btn-warning btn-sm">Delete</button>
            </div>`;
          saveAllTodo();
        }
      });
    }
  });

  deleteAllButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete all todos?")) {
      ulTodo.innerHTML = "";
      localStorage.removeItem("allTodos");
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = () => {
    const allTodos = JSON.parse(localStorage.getItem("allTodos")) || [];
    allTodos.forEach((task) => createTodo(task));
  };

  loadAllTodo();
});
