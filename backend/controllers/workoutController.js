const mongoose = require("mongoose")
const Workout = require('../models/workout')

const getWorkouts = async(req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})
    res.status(200).json(workouts)
}

const getWorkout = async(req, res) => {
    const id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)
    
    if (!workout) return res.status(404).json({error : "No such workout"})
    res.status(200).json(workout)

}
// router.get('/:id', (req, res) => {
//     res.json({message: "GET a single workout"})
// })

const createWorkout = async (req, res) => {
    const {title, load, reps} = req.body
    
    let emptyFields = []
    if(!title){emptyFields.push('title')}
    if(!load){emptyFields.push('load')}
    if(!reps){emptyFields.push('reps')}
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all empty fields", emptyFields})
    }

    try{
        const workout = await Workout.create({title, load, reps})
        res.status(200).json(workout)
    }catch(err){
        res.status(500).json({error: err.message})
    }
}

const deleteWorkout = async (req, res) => {
    const{ id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})
    if(!workout) return res.status(404).json("error")
    res.status(200).json(workout)
}

const updateWorkout = async(req, res) => {
    const{ id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {...req.body})
    if(!workout) return res.status(404).json("error")
    res.status(200).json(workout)
}

module.exports= {
    createWorkout,
    getWorkouts, 
    getWorkout, 
    deleteWorkout, 
    updateWorkout
}