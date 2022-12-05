const express = require('express');
const router = express.Router()
const Model = require('./model');
//Post Method
router.post('/tasks', async (req, res) => {
    const tasks = new Model({
        title: req.body.title,
        is_completed: req.body.is_completed
    })
    
    if (!req.body.title) {
        res.status(400).json({message: 'Please provide the title'});
        return false;
    }
    try {   
        await tasks .save();
        res.status(201).json({id:tasks._id})
    } catch (error) {
        // console.log(error);
        res.status(400).json({message: error.message});
    }
}   
)

//Get all Method
router.get('/tasks', async (req, res) => {
    try{
        const tasks = await Model.find();
        datas = {tasks}
        res.json(datas)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/tasks/:id', async (req, res) => {
    try{
        const tasks = await Model.findById(req.params.id);
        if(!tasks){
            res.status(404).json({error: "There is no task at that id"})
        }else{
            res.status(200).json(tasks);
        }
    }
    catch(error){
        res.status(404).json({error: "There is no task at that id"})
    }
    
})

//Update by ID Method
router.put('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )
        if(!result){
            res.status(404).json({error: "There is no task at that id"})
        }else{
            res.sendStatus(204)
        }
    }
    catch (error) {
        res.status(404).json({error: "There is no task at that id"})
    }
})

//Delete by ID Method
router.delete('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Model.findByIdAndDelete(id);
        res.sendStatus(204)
    }
    catch (error) {
        res.sendStatus(204)
    }
})

module.exports = router;