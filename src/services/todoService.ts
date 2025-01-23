import { json } from "express";
const NO_ID_MESSAGE = "id isn't in the todo list!";
const LIST_IS_EMPTY = "todo's list is empty!";

export class TodoService{
    private todos: ListItem[] = [];
    
    read(){
        return this.todos;
    }

    add(name: string, date: Date){
        const item = new ListItem(name, date);
        this.todos.push(item);
        return item;
    }

    delete(missionToDelete: string): ListItem | undefined{
        if(this.todos.length === 0){
            return undefined;
        }
        const idx =  this.todos.findIndex(mission => mission.id === missionToDelete);
        if (idx === -1){
            return undefined;
        }
        const [removedItem] = this.todos.splice(idx, 1);
        return removedItem;
    }

    toggle(missionToToggle: string){
        if(this.todos.length === 0){
            return LIST_IS_EMPTY
        }
        for(const mission of this.todos){
            if(mission.id === missionToToggle){
                mission.isFinished = !mission.isFinished;
                return mission;
            }
        }
        return NO_ID_MESSAGE
    }

    clear(){
        this.todos = [];
        return this.read();
    }
}


class ListItem {
    id: string;
    name: string;
    date: Date;
    isFinished: boolean;

    constructor(name: string, date: Date, isFinished: boolean = false) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.date = date;
        this.isFinished = isFinished;
    }
}
