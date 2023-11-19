const express = require('express')
const ideasApi = express.Router()
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db')
const checkMillionDollarIdea = require('../checkMillionDollarIdea')

// - GET /api/ideas to get an array of all ideas.
ideasApi.get('/',(req, res) => {
    const allIdeas = getAllFromDatabase('ideas')
    if (!allIdeas) {
        res.status(404).send({'message': 'No ideas in db at the moment'})
    }
    res.status(200).send(allIdeas)
})
// - POST /api/ideas to create a new idea and save it to the database.
ideasApi.post('/', checkMillionDollarIdea, (req, res) => {
    const {name, description, weeklyRevenue, numWeeks} = req.body
    if (!name || !description || !weeklyRevenue || !numWeeks) {
        res.status(404).send({message: 'Please fill up all paramters to make a new idea'})
    }
    const newIdea = addToDatabase('ideas', req.body)
    res.status(201).send(newIdea)
})


// - GET /api/ideas/:ideaId to get a single idea by id.
ideasApi.get('/:ideaId', (req, res) => {
    const foundIdea = getFromDatabaseById('ideas', req.params.ideaId)
    // console.log(foundIdea)
    if (!foundIdea) {
        res.status(404).send({message: "there's no Idea with this ID"})
    }
    res.status(200).send(foundIdea)
})

// - PUT /api/ideas/:ideaId to update a single idea by id.
ideasApi.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
    const {name, description, weeklyRevenue, numWeeks} = req.body
    if (!name || !description || !weeklyRevenue || !numWeeks) return res.status(404).send({ message: 'please provide all required criteria' })
    const updatedIdea = updateInstanceInDatabase('ideas', req.body)
    if (!updatedIdea) return res.status(404).send({message: "there's no Idea with this ID"})
    res.status(200).send(updatedIdea)
})

// - DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasApi.delete('/:ideaId', (req, res) =>{
    const deletedIdea = deleteFromDatabasebyId('ideas', req.params.ideaId)
    if (deletedIdea) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
})

module.exports = ideasApi