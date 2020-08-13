class List {
    constructor (tasks = []) {
        this.tasks = tasks;
    }

    addTask(value) {
    
        let task = {
            date: new Date(),
            completed: false,
            value,
        }    
        this.tasks = [task, ...this.tasks];
    }

    deleteTask(value, confirmation) {
        if (confirmation) {
            let task = this.tasks.find(task => {
            return task.value === value;
         });
         let i = this.tasks.indexOf(task);
         if (i !== -1) {
             this.tasks.splice(i, 1);
             this.tasks = [...this.tasks];
         }
           
         } 
    }

    editTask(value, newValue, confirmation) {
        if (confirmation) {
            this.tasks = this.tasks.map(task => {
            let newTask = task;
            if(task.value === value) {
                newTask = {
                    ...task,
                    value: newValue
                }
            }
            return newTask;
            });
        }  
    }  
}


class ToDoList extends List {
    constructor(...args) {
        super(...args);  
    }

    completeTask(value) {
        this.tasks = this.tasks.map(task => ({
            ...task,
            completed: task.value === value ? !task.completed : task.completed
        }));
    };
    
    getInfo() {
        return this.tasks.reduce(
            (acc, task) => {
            task.completed && acc.completed++;
            return acc;
            },
            {total: this.tasks.length, completed: 0}
        );
    }
}


class ContactList extends List {
    constructor(...args) {
        super(...args);
    }

    findTask(value) {
        return this.tasks.find(task => {
        return task.value === value;
        });
    }
}


let myList = new ToDoList([]);
// let myList = new ContactList([]);

myList.addTask("Visit a doctor");
myList.addTask("Bake a cake");
myList.addTask("Cut nose hair");
myList.addTask("Save the World");
myList.deleteTask("Bake a cake", confirm("Are you sure?"));
myList.editTask("Cut nose hair", "Cut nose hair and shave legs", confirm ("Do you want to save changes?"));
myList.completeTask("Visit a doctor");

console.log(myList);
console.log(myList.getInfo());
// myList.findTask("Save the World");
