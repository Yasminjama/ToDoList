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

}