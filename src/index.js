import { renderTodos } from "./views";
import { setFilters } from "./filters";
import { loadTodos, createTodo } from "./todos";

renderTodos();

//Filter a todo
document.querySelector("#filter-todo").addEventListener("input", e => {
  setFilters({
    searchText: e.target.value
  });

  renderTodos();
});

// Add a todo
document.querySelector("#new-todo").addEventListener("submit", e => {
  e.preventDefault();
  const text = e.target.elements.todo.value.trim();
  if (text.length > 0) {
    createTodo(text);
    renderTodos();
    e.target.elements.todo.value = "";
  }
});

// Show not completed todos
document.querySelector("#hide-completed").addEventListener("change", e => {
  setFilters({
    hideCompleted: e.target.checked
  });
  renderTodos();
});

window.addEventListener("storage", e => {
  if (e.key === "todo") {
    loadTodos();
    renderTodos();
  }
});
