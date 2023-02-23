const Task = require('../models/tasks.js')
const {functionWrapper} = require('./functionWrapper')
const getTask = functionWrapper(async(req,res,next)=>{
        const {id:taskId}=req.params
        const task =  await Task.findOne({_id:taskId})
        if(!task){
            const err = new Error('Not found')
            err.status = 404
            return next(err)
        }
        return res.status(200).json({task})
})
const getAllTasks = functionWrapper(async(req,res)=>{
        const tasks = await Task.find({})
        console.log(tasks)
        res.status(200).json({tasks})
})
const createTask = functionWrapper(async(req,res)=>{
        const task = await Task.create(req.body)
        res.status(201).json({task})
})
const deleteTask= functionWrapper(async(req,res)=>{
        const task = await Task.findOneAndDelete({_id:req.params.id})
        if(!task){
            return res.status(404).json({msg: 'No such task'})
        }
        res.status(200).json({task})
})
const updateTask = functionWrapper(async(req,res)=>{ 
        const {id:taskId} = req.params
        const task = await Task.findOneAndUpdate({_id: taskId}, req.body, {
            new: true, runValidators: true
        })
        return res.status(201).json({task})
})
module.exports = {getTask,createTask,deleteTask,updateTask, getAllTasks}