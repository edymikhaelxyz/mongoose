const express = require('express');
const router = express.Router()
const Model = require('./model');
//Post Method
router.post('/tasks', async (req, res) => {
    let input = {tasks:[]}
    if(req.body.tasks){
        let resIds = []
        req.body["tasks"].map(async(task) =>{
            const dask = new Model({
                title: task.title,
                is_completed: task.is_completed
            })
            task.id = dask.id
            resIds.push({"id": task.id})
            try{
                await dask.save()
                res.status(201).json(resIds)
            }
            catch(error){
                return
            }
        })
    }else{
        const dask = new Model({
            title: req.body.title,
            is_completed: req.body.is_completed
        })
        if (!req.body.title) {
            res.status(400).json({message: 'Please provide the title'});
            return false;
        }else
        try {   
            await dask.save();
            res.status(201).json({id:dask._id})
        } catch (error) {
            // console.log(error);
            res.status(400).json({message: error.message});
        }
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
            res.status(204).json("None")
        }
    }
    catch (error) {
        res.status(404).json({error: "There is no task at that id"})
    }
})

//Delete by ID Method
router.delete('/tasks', async (req, res) => {
    try {
        const id = []
        const body = req.body
        for(i in body.tasks) id.push(body.tasks[i].id)
        await Model.deleteMany({_id:{$in:id}})
        res.status(204).send("None")
    }
    catch (error) {
        res.status(204).send("None")
    }
})


router.delete('/tasks/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const tasks = await Model.findByIdAndDelete(id);
        res.status(204).send("None")
    }
    catch (error) {
        res.status(204).send("None")
    }
})

module.exports = router;