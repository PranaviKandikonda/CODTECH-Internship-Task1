import React, { useEffect, useState } from "react";
import {FaPlus} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { SiTicktick } from "react-icons/si";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {ToastContainer} from "react-toastify";
import { CreateTask, DeleteTaskById, GetAllTasks, UpdateTaskById } from "./api";
import { notify } from "./utils";

function TaskManager(){
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTask, setUpdateTask] = useState(null);

    const handleTask = () => {
        if(updateTask && input){
            //update api call
            const obj = {
                taskName: input,
                isDone: updateTask.isDone,
                _id: updateTask._id
            }
            handleUpdateItem(obj);
        } else if(updateTask === null && input) {
            //create api call
            handleAddTask();
        }
        setInput('');
    }

    useEffect(() => {
        if(updateTask){
            setInput(updateTask.taskName);
        }
    }, [updateTask]);

    const handleAddTask = async() => {
        const obj = {taskName: input, isDone: false};
        try {
            const {success, message} = await CreateTask(obj);
            if(success){
                //show success toast
                notify(message, 'success')
            } else {
                //show failure toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch(err) {
            console.error(err);
            notify('Failed to create task', 'error');
        }
    }

    const fetchAllTasks = async() => {
        try {
            const {data} = await GetAllTasks();
            //console.log(data);
            setTasks(data);
            setCopyTasks(data);
        } catch(err) {
            console.error(err);
            notify('Failed to fetch tasks', 'error');
        }
    }

    useEffect(() => {
        fetchAllTasks();
    }, []);

    const handleDeleteTask = async(id) => {
        try {
            const {success, message} = await DeleteTaskById(id);
            //console.log(data);
            if(success){
                //show success toast
                notify(message, 'success')
            } else {
                //show failure toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch(err) {
            console.error(err);
            notify('Failed to delete task', 'error');
        }
    }

    const handleCheckAndUncheck = async(item) => {
        const {_id, isDone, taskName} = item;
        const obj = {taskName, isDone: !isDone}
        try {
            const {success, message} = await UpdateTaskById(_id, obj);
            //console.log(data);
            if(success){
                //show success toast
                notify(message, 'success')
            } else {
                //show failure toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch(err) {
            console.error(err);
            notify('Failed to check or uncheck task', 'error');
        }
    }

    const handleUpdateItem = async(item) => {
        const {_id, isDone, taskName} = item;
        const obj = {taskName, isDone: isDone}
        try {
            const {success, message} = await UpdateTaskById(_id, obj);
            //console.log(data);
            if(success){
                //show success toast
                notify(message, 'success')
            } else {
                //show failure toast
                notify(message, 'error');
            }
            fetchAllTasks();
        } catch(err) {
            console.error(err);
            notify('Failed to update task', 'error');
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        //console.log(term);
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item) => item.taskName.toLowerCase().includes(term));
        setTasks(results);
    }

    return(
        <div>
            <div className= "flex flex-col jutify-center items-center m-auto mt-5">
                <h1 className="text-3xl font-bold mb-4"> Task Manager App </h1>
                
                <div className="flex justify-center items-center mt-4 p-3">
                    <div className="mx-5">
                        <input
                            type="text"
                            placeholder="Add a new task"
                            value={input}
                            className="border-2 border-slate-400 shadow-md hover:drop-shadow-lg p-1"
                            onChange={(e) => setInput(e.target.value)} />
                        <button className="bg-green-600 pt-2 pb-3 px-3 my-2" onClick={handleTask}> <FaPlus /> </button>
                    </div>

                    <div className="mx-5">
                        <input
                            type="text" 
                            placeholder="Search your task"
                            className="border-2 border-slate-400 shadow-md hover:drop-shadow-l p-1"
                            onChange={handleSearch} />
                        <button className="bg-slate-400 pt-2 pb-3 px-3 my-2"> <IoSearch /> </button>
                    </div>
                </div>

                <div className="w-full m-5 p-10">
                    {
                        tasks.map((item) => (
                            <div key={item._id} className="bg-white p-4 rounded shadow-md mb-4 border-2 border-slate-400">
                                <h3 className={`text-xl font-bold my-1 capitalize ${item.isDone ? "line-through" : ""}`}> {item.taskName} </h3>
                                <button className="px-3 py-1 text-white font-bold rounded me-3 mt-3 bg-green-600 hover:bg-green-400" onClick={() => handleCheckAndUncheck(item)}> Completed <span className="mx-2"> <SiTicktick className="inline"/> </span> </button>
                                <button className="px-3 py-1 text-white font-bold rounded mx-3 mt-3 bg-blue-600 hover:bg-blue-400" onClick={() => setUpdateTask(item)}> Update <span className="mx-2"> <FaPencilAlt className="inline"/> </span> </button>
                                <button className="px-3 py-1 text-white font-bold rounded mx-3 mt-3 bg-red-600 hover:bg-red-400" onClick={() => handleDeleteTask(item._id)}> Delete <span className="mx-2"> <MdDelete className="inline text-lg"/> </span> </button>
                            </div>
                        ))
                    }
                </div>

            </div>

            {/* Toastify */}
            {
                <ToastContainer position="top-right" autoClose = {3000} hideProgressBar = {false} />
            }
        </div>
    )
}

export default TaskManager;