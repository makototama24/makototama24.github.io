let todoIdx = 0;

export class TodoItemModel{
    construcor({title, completed}){
        this.id = todoIdx++;
        this.title = title;
        this.completed = completed;
    }
}