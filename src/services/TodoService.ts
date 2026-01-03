import { v4 as uuidv4 } from 'uuid';
import type { Todo } from '../models/todo';

export class TodoService {
  private todos: Todo[] = [];
  private readonly STORAGE_KEY = 'todos';

  constructor() {
    this.loadFromStorage();
  }

  // Läs från localStorage
  private loadFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.todos = JSON.parse(stored);
    }
  }

  // Spara till localStorage
  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.todos));
  }

  // Hämta alla todos
  getTodos(): Todo[] {
    return this.todos;
  }

  // Lägg till ny todo
  addTodo(text: string): void {
    const newTodo: Todo = {
      id: uuidv4(),
      text: text,
      completed: false
    };
    this.todos.push(newTodo);
    this.saveToStorage();
  }

  // Ta bort todo
  deleteTodo(id: string): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToStorage();
  }

  // Toggle completed
  toggleTodo(id: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveToStorage();
    }
  }

  // Uppdatera text
  updateTodo(id: string, newText: string): void {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.text = newText;
      this.saveToStorage();
    }
  }

  // Rensa alla
  clearAll(): void {
    this.todos = [];
    this.saveToStorage();
  }

  // Filtrera (completed/active/all)
  filterTodos(filter: 'all' | 'active' | 'completed'): Todo[] {
    if (filter === 'active') {
      return this.todos.filter(t => !t.completed);
    }
    if (filter === 'completed') {
      return this.todos.filter(t => t.completed);
    }
    return this.todos;
  }
}