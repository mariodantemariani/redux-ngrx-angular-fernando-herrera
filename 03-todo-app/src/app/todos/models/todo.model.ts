export class Todo {
  id: number;
  text: string;
  completed: boolean;
  constructor(text: string) {
    this.text = text;
    this.completed = false;
    this.id = Math.random();
  }
}
