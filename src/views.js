import { getTodos, removeTodo, toggleTodo } from "./todos";
import { getFilters } from "./filters";

// renderTodos
// Arguments: none
// Return value: none

const renderTodos = () => {
  document.querySelector("#todos").innerHTML = "";
  const { searchText, hideCompleted } = getFilters();
  const filtered = getTodos().filter(todo => {
    const searchTextMatch = todo.text
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const hideCompletedMatch = !hideCompleted || !todo.completed;
    return searchTextMatch && hideCompletedMatch;
  });

  const incompleteTodos = filtered.filter(todo => !todo.completed);

  document
    .querySelector("#todos")
    .appendChild(generateSummaryDOM(incompleteTodos));

  if (filtered.length > 0) {
    filtered.forEach(todo => {
      document.querySelector("#todos").appendChild(generateTodoDom(todo));
    });
  } else {
    const empytMessge = document.createElement("p");
    empytMessge.classList.add("empty-message");
    empytMessge.textContent = "No todos to show";
    document.querySelector("#todos").appendChild(empytMessge);
  }
};

// generateTodoDOM
// Arguments: todo
// Return value: the todo element

const generateTodoDom = todo => {
  const container = document.createElement("div");
  const todoEl = document.createElement("label");
  const checkbox = document.createElement("input");
  const text = document.createElement("span");
  const button = document.createElement("button");

  checkbox.setAttribute("type", "checkbox");
  checkbox.checked = todo.completed;
  container.appendChild(checkbox);
  checkbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    renderTodos();
  });

  // Setup container
  todoEl.classList.add("list-item");
  container.classList.add("list-iten__container");
  todoEl.appendChild(container);

  // Set up text
  text.textContent = todo.text;
  container.appendChild(text);

  button.textContent = "remove";
  button.classList.add("button", "button--text");
  todoEl.appendChild(button);
  button.addEventListener("click", () => {
    removeTodo(todo.id);
    renderTodos();
  });

  return todoEl;
};

// generateSummaryDOM
// Arguments: incompletedTodos
// Return value: the summary element

const generateSummaryDOM = incompleteTodos => {
  const text = document.createElement("h2");
  text.classList.add("list-title");
  let todoText = `You have ${incompleteTodos.length}`;
  incompleteTodos.length > 1
    ? (todoText += " todos lefts")
    : (todoText += " todo left");
  text.textContent = todoText;
  return text;
};

// Make sure to set up the exports

export { generateTodoDom, renderTodos, generateSummaryDOM };
