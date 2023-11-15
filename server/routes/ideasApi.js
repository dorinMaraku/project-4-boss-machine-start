const express = require('express')
const ideasApi = express.Router()
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db')

// - GET /api/ideas to get an array of all ideas.
ideasApi.get('/',(req, res) => {
    const allIdeas = getAllFromDatabase('ideas')
    if (!allIdeas) {
        res.status(204).send({'message': 'No ideas in db at the moment'})
    }
    res.status(200).send(allIdeas)
})
// - POST /api/ideas to create a new idea and save it to the database.
ideasApi.post('/', (req, res) => {
    const {name, description, weeklyRevenue, numWeeks} = req.body
    const ideaInstance = {
        name,
        description,
        weeklyRevenue,
        numWeeks
    }
    if (!name || !description || !weeklyRevenue || !numWeeks) {
        res.status(404).send({message: 'Please fill up all paramters to make a new idea'})
    }
    const newIdea = addToDatabase('ideas', ideaInstance)
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
ideasApi.put('/:ideaId', (req, res) => {
    const ideaId = req.params.ideaId
    if (!ideaId) return res.status(404).send({ message: 'this id is not valid'})
    const {name, description, weeklyRevenue, numWeeks} = req.body
    if (!name || !description || !weeklyRevenue || !numWeeks) return res.status(404).send({ message: 'please provide all required criteria' })
    const updatedIdeaInstance = {
        id: ideaId,
        name,
        description,
        weeklyRevenue,
        numWeeks,
    }
    const updatedIdea = updateInstanceInDatabase('ideas', updatedIdeaInstance)
    if (!updatedIdea) return res.status(404).send({message: "there's no Idea with this ID"})
    res.status(200).send(updatedIdea)
})

// - DELETE /api/ideas/:ideaId to delete a single idea by id.
ideasApi.delete('/:ideaId', (req, res) =>{
    ideaId = req.params.ideaId
    if(!ideaId) return res.status(404).send({message: 'no such idea'})
    const deletedIdea = deleteFromDatabasebyId('ideas', ideaId)
    // console.log(deletedIdea)
    res.status(200).send({message: `idea with id ${ideaId} deleted`})
})

module.exports = ideasApi