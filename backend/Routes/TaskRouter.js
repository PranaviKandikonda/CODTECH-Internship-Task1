const { createTask, fetchAllTasks, updateTaskById, deleteTaskById } = require("../Controllers/TaskController");

const router = require("express").Router();

//to get all tasks
router.get('/', fetchAllTasks);

//to create task
router.post('/', createTask);

//to update task
router.put('/:id', updateTaskById);

//to delete task
router.delete('/:id', deleteTaskById);

module.exports = router;