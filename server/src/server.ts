import path from "path";
import express, {Express, Request, Response, NextFunction} from "express";
import WebSocket from "ws";

import * as Tasks from "./tasks";
import {ITask} from "./tasks";


class Server {
    // Property initialization error due to strictPropertyInitialization.
    // Review property init with TS 
    private app: Express;

    constructor(){
        this.app = express();
        this.config();
        this.getRoutes();
    }

    public readonly getApp = (): Express => {
        return this.app;
    }

    // Server configuration details
    private config(): void {
        this.app.use(express.json());
        this.app.use(function(req: Request, res: Response, next: NextFunction){
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
            res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept");
            next();
        });
        //https://www.npmjs.com/package/serve-favicon
        console.log("Server has been configured");
    }

    // API Endpoints
    private getRoutes = (): void => {
        
        // Initial API page
        // this.app.get('/api/', 
        //     async(req: Request, res: Response) => {
        //         try{
        //             res.send('API endpoint!');
        //         }catch(err){
        //             res.send(err);
        //         }
        //     });

        // POST tasks - Log task(s)
        this.app.post('/api/tasks', 
            async(req: Request, res: Response) => {
                try{
                    console.log("POST tasks -> " + req.body);
                    const tasksWorker: Tasks.Worker = new Tasks.Worker();
                    const task: ITask = await tasksWorker.addTask(req.body);
                    res.json(task);
                }catch(err){
                    res.status(500);
                    res.send("Error encountered: " + err);
                }
            });

        // GET tasks - Get list of tasks
        this.app.get('/api/tasks', 
            async(req: Request, res: Response) => {
                try{
                    const tasksWorker: Tasks.Worker = new Tasks.Worker();
                    const tasks: ITask[] = await tasksWorker.getAllTasks();
                    res.json(tasks);
                }catch(err){
                    res.status(500);
                    res.send("Error encountered: " + err);
                }
            });

        // GET tasks/:id - Get a task
        this.app.get('/api/tasks/:id', 
            async(req: Request, res: Response) => {
                try{
                    console.log("GET tasks/:id -> " + req.params.id);
                    const tasksWorker: Tasks.Worker = new Tasks.Worker();
                    const task: ITask = await tasksWorker.getTask(req.params.id);
                    res.json(task);
                }catch(err){
                    let responseMessage: string = "Error: " + err;
                    res.status(500);
                    res.send("Error encountered: " + err);
                }
            });

        // PUT tasks/:id - Update a task
        this.app.put('/api/tasks/:id', 
            async(req: Request, res: Response) => {
                try{
                    const tasksWorker: Tasks.Worker = new Tasks.Worker();
                    await tasksWorker.updateTask(req.params.id, req.body);
                    res.json("Task updated");
                }catch(err){
                    let responseMessage: string = "Error: " + err;
                    if(String(err).includes("taskID not found")){
                        res.status(404);
                        responseMessage = `Task with ID '${req.params.id}' not found. Full error:     ` + err;
                    } else {
                        res.status(500);
                        responseMessage = 'Encountered a failure when updating task. Full error:      ' + err;
                    }
                    res.send(responseMessage);
                }
            });
        
        // DELETE tasks/:id - Delete a task
        this.app.delete('/api/tasks/:id', 
            async(req: Request, res: Response) => {
                try{
                    console.log("DELETE tasks/:id -> " + req.params.id);
                    const tasksWorker: Tasks.Worker = new Tasks.Worker();
                    await tasksWorker.deleteTask(req.params.id);
                    res.send("Task removed");
                }catch(err){
                    res.status(500);
                    res.send(err);
                }
            });
    }
    
}

export default new Server().getApp;


/* 

let responseMessage: string = "Error: " + err;
                    if(String(err).includes("Unknown Mailbox")){
                        res.status(404);
                        responseMessage = `Contact with ID '${req.params.id}' not found. Full error:     ` + err;
                    }else{
                        res.status(500);
                        responseMessage = 'Encountered a failure when retrieving mailbox. Full error:      ' + err;
                    }
                    res.send(responseMessage);

*/