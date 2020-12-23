import { time } from "console";
import * as path from "path";
const Datastore = require("nedb");

export interface ITask {
    _id?: number,
    name: string,
    subject: string,
    time: number,
    comments: string | null | undefined
}

export function formatTask(arg: ITask): ITask {
    let formatBody: ITask = {
        name: arg.name,
        subject: arg.subject,
        time: arg.time,
        comments: arg.comments
    }
    return formatBody;
}

export class Worker {
    private db: Nedb;

    constructor(){
        this.db = new Datastore({
            filename: path.join(__dirname, "tasks.db"),
            autoload: true
        });
    }

    // Get list of tasks from db, return list of tasks
    public getAllTasks(): Promise<ITask[]> {
        return new Promise((resolve, reject) => {
            this.db.find({ }, (err: Error | null, docs: ITask[]) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }

    // Get a task from db based on id, return task
    public getTask(taskID: string): Promise<ITask> {
        return new Promise((resolve, reject) => {
            console.log(taskID);
            this.db.findOne({_id: taskID}, (err: Error | null, doc: ITask) => {
                if(err) {
                    reject(err);
                } else if(doc === null) {
                    reject("No tasks found with ID: " + taskID);
                } else {
                    resolve(doc);
                }
            });
        });
    }

    // Add task to db, return task ID
    public addTask(taskBody: ITask[]): Promise<string> {
        console.log(taskBody.length)
        return new Promise((resolve, reject) => {
            try {
                taskBody.forEach(task => {
                    const newTask: ITask = formatTask(task);                    
                    this.db.insert(newTask, (err: Error | null, newDoc: ITask) => {
                        if(err) {
                            reject(err);
                        } else {
                            console.log(newTask);
                        }
                    });
                });
                resolve("newDoc");
            } catch (error) {
                reject(error);
            }
        });
    }

    // Update task in db based on ID given body, return bool of success
    public updateTask(taskID: string, taskBody: ITask): Promise<void> {
        return new Promise((resolve, reject) => {
            //JSON.parse(taskBody);
            this.db.update({_id: taskID}, {$set: taskBody}, { }, (err: Error | null, numRemoved: number) => {
                if(err) {
                    reject(err);
                } else if(numRemoved === 0) {
                    reject("taskID not found");
                } else {
                    resolve();
                }
            });
        });
    }
    
    // Delete task in db given an ID, return bool of success
    public deleteTask(taskID: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.db.remove({_id: taskID}, {}, (err: Error | null, numRemoved: number) => {
                if(err) {
                    reject(err);
                } else if(numRemoved === 0) {
                    reject("No tasks removed, check taskID and try again.");
                }  else {
                    resolve();
                }
            });
        });
    }

}