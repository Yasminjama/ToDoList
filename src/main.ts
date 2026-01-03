import './styles/style.css';
import { TodoService } from './services/ToDoService';
import type { Todo } from './models/todo';

const todoService = new TodoService();
let currentFilter: 'all' | 'active' | 'completed' = 'all';

// DOM element
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const addBtn = document.getElementById('add-btn') as HTMLButtonElement;
const clearAllBtn = document.getElementById('clear-all') as HTMLButtonElement;
const filterAllBtn = document.getElementById('filter-all') as HTMLButtonElement;
const filterActiveBtn = document.getElementById('filter-active') as HTMLButtonElement;
const filterCompletedBtn = document.getElementById('filter-completed') as HTMLButtonElement;

// Rendera todos
function renderTodos(): void {
  const todos = todoService.filterTodos(currentFilter);
  todoList.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" class="toggle-checkbox" />
      <span class="todo-text" data-id="${todo.id}">${todo.text}</span>
      <button class="edit-btn" data-id="${todo.id}">Ändra</button>
      <button class="delete-btn" data-id="${todo.id}">Ta bort</button>
    `;

    todoList.appendChild(li);
  });
}

// Lägg till todo
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text) {
    todoService.addTodo(text);
    todoInput.value = '';
    renderTodos();
  }
});

// Enter-tangent för att lägga till
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addBtn.click();
  }
});

// Event delegation för knappar i listan
todoList.addEventListener('click', (e) => {
  const target = e.target as HTMLElement;
  const id = target.dataset.id;

  if (!id) return;

  // Toggle checkbox
  if (target.classList.contains('toggle-checkbox')) {
    todoService.toggleTodo(id);
    renderTodos();
  }

  // Ta bort knapp
  if (target.classList.contains('delete-btn')) {
    todoService.deleteTodo(id);
    renderTodos();
  }

  // Ändra knapp
  if (target.classList.contains('edit-btn')) {
    const newText = prompt('Ändra text:');
    if (newText && newText.trim()) {
      todoService.updateTodo(id, newText.trim());
      renderTodos();
    }
  }
});

// Rensa alla knapp
clearAllBtn.addEventListener('click', () => {
  if (confirm('Är du säker på att du vill rensa alla todos?')) {
    todoService.clearAll();
    renderTodos();
  }
});

// Filter knappar
filterAllBtn.addEventListener('click', () => {
  currentFilter = 'all';
  updateFilterButtons();
  renderTodos();
});

filterActiveBtn.addEventListener('click', () => {
  currentFilter = 'active';
  updateFilterButtons();
  renderTodos();
});

filterCompletedBtn.addEventListener('click', () => {
  currentFilter = 'completed';
  updateFilterButtons();
  renderTodos();
});

// Uppdatera aktiv filter-knapp
function updateFilterButtons(): void {
  filterAllBtn.classList.remove('active');
  filterActiveBtn.classList.remove('active');
  filterCompletedBtn.classList.remove('active');

  if (currentFilter === 'all') filterAllBtn.classList.add('active');
  if (currentFilter === 'active') filterActiveBtn.classList.add('active');
  if (currentFilter === 'completed') filterCompletedBtn.classList.add('active');
}

// Initial rendering
renderTodos();