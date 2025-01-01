


class RenderManager {
    private list = new ListManager();

    constructor() {
        const submitButton = document.getElementById("addMission");
        const clearAllButton = document.getElementById("clear-all");
        if (!submitButton || ! clearAllButton){
            console.error("SubmitButton or clearAllButton must be part of the DOM!");
            return;
        }
        submitButton.addEventListener("click", this.handleNewItem.bind(this));
        clearAllButton.addEventListener("click", () => {this.handleClearAll();});
        this.render();
    }

    private render() {
        const unFinishedConteiner = document.getElementById("unfinishedMissions");
        const finishedConteiner = document.getElementById("finishedMissions");
        if (!unFinishedConteiner || ! finishedConteiner){
           console.error("one of - unFinishedConteiner or finishedConteiner (or both) are missing from DOM!")
            return;
        }
        finishedConteiner.innerHTML = "";
        unFinishedConteiner.innerHTML = "";

        for(const miss of this.list.getTodos()){
            const element = this.createMissionElement(miss);
            if(miss.is_finished){
                finishedConteiner.appendChild(element);
            }else{
                unFinishedConteiner.appendChild(element);
            }
        }
    }
 
    private handleClearAll() {
        const confirmation = confirm("Are you sure about it?");
        if(confirmation){
            this.clearAllLists();
        }
    }

    private clearAllLists() {
        this.list.clearList();
        this.render();
    }

    private validateDate(inputDate : string) {
        const year = Number(inputDate.split('-')[0]);
        if(year < 2000 || year > 2030){
            return false;
        }
        return true;
    }

    private formatDateToDDMMYYYY(inputDate: string){
        const [year, month, day] = inputDate.split('-');
        return `${day}/${month}/${year}`;
    }

    private handleNewItem() {
        const nameInput = document.getElementById("missionName") as HTMLInputElement;
        const dateInput = document.getElementById("missionDate") as HTMLInputElement;

        if (!nameInput || ! dateInput || !dateInput.value.trim() || !nameInput.value.trim()){
            alert("You need to fill both date and name!");
            return;
        }
        
        const name = nameInput.value.trim();
        const date = dateInput.value;
        
        if (!this.validateDate(date)){
            alert("year must be in range [2000, 2030]");
            return;
        }
        
        const formatDate = this.formatDateToDDMMYYYY(date);
        this.list.insertNewMision(name, formatDate);

        //this is clean the cell of name and date
        nameInput.value= "";
        dateInput.value = "";

        this.render();
    }

    private createMissionElement(mission: ListItem) {
        const curDiv = document.createElement("div");
        curDiv.className = "mission-item";

        const missionText = document.createElement("span");
        missionText.innerHTML = `<strong>${mission.name}</strong> <br><br> date: ${mission.date}`;

        const buttonDiv = document.createElement("div");
        buttonDiv.className = "mission-item-button";


        const button = document.createElement("button");
        button.textContent = mission.is_finished ? "unfinished" : "finished";

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.id = "delete-button"

        button.addEventListener("click", () =>
        {
            this.list.updateStatus(mission.id)
            this.render();
        });

        deleteButton.addEventListener("click", () => {
            this.list.deleteMission(mission.id);
            this.render();
        });

        buttonDiv.appendChild(button);
        buttonDiv.appendChild(deleteButton)

        curDiv.appendChild(missionText);
        curDiv.appendChild(buttonDiv);
        return curDiv;
    }

}
const TODOS_LOCAL_STORAGE_KEY = "TODOS_LOCAL_STORAGE_KEY";

class ListManager{
    private todosList;

    constructor(){
        this.todosList = this.loadTodos();
        window.addEventListener("beforeunload", () => {
            this.storeTodos();
        })
    }
    
    getTodos(){
        return this.todosList;
    }


    private loadTodos(){
        const storedTodos = localStorage.getItem(TODOS_LOCAL_STORAGE_KEY);
        if (!storedTodos){
            return [];
        }
        return JSON.parse(storedTodos);
    }

    private storeTodos(){
        localStorage.setItem(TODOS_LOCAL_STORAGE_KEY, JSON.stringify(this.todosList));
    }


    insertNewMision(name: string, date: string){
        const item = new ListItem(name, date);
        this.todosList.push(item);
    }

    updateStatus(missionID: string){
        for(const mission of this.todosList){
            if(mission.id === missionID){
                mission.is_finished = !mission.is_finished;
            }
        }
    }

    clearList(){
        this.todosList = [];
    }

    deleteMission(missionID: string){
        let idx = 0;
        for(const mission of this.todosList){
            if (mission.id === missionID){
                this.todosList.splice(idx, 1);
                break
            }
            idx += 1;
        }
    }
}

class ListItem {
    id: string;
    name: string;
    date: string;
    is_finished: boolean;

    constructor(name: string, date: string, is_finished: boolean = false) {
        this.id = crypto.randomUUID();
        this.name = name;
        this.date = date;
        this.is_finished = is_finished;
    }
}

const manager = new RenderManager();