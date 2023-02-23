const express = require('express')
const routes = express.Router()
const {getTask,updateTask,deleteTask,createTask,getAllTasks} = require('./functionalities')
routes.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)
// routes.post('/',createTask)
routes.route('/').get(getAllTasks).post(createTask)
module.exports = routes