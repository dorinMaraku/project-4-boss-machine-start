const express = require('express');
const workApi = express.Router({ mergeParams: true })
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db')

//- GET /api/minions/:minionId/work to get an array of all work for the specified minon.
workApi.get('/', (req, res) => {
    const allWork = getAllFromDatabase('work')
    if (!allWork) {
        res.status(204).send({message: 'No work for this minion'})
    }
    res.status(200).send(allWork)
})

// - POST /api/minions/:minionId/work to create a new work object and save it to the database.
workApi.post('/', (req, res) => {
    const {title, description, hours} = req.body
    const workInstance = {
        title,
        description,
        hours,
        minionId: req.minionId
    }
    if (!title || !description || !hours) {
        return res.status(404).send({message: 'Please fill up all paramters to make a new minion'})
    }
    const newWork = addToDatabase('work', workInstance)
    // console.log(newWork)
    res.status(201).send(newWork)
})

// - PUT /api/minions/:minionId/work/:workId to update a single work by id.

workApi.put('/:workId', (req, res) => {
    const workId = req.params.workId
    if (!workId) return res.status(404).send({ message: 'this id is not valid'})
    const {title, description, hours} = req.body
    if (!title || !description || !hours ) return res.status(404).send({ message: 'please provide title, description and howrs of work' })
    const updatedWorkInstance = {
        id: workId,
        title,
        description,
        hours,
        minionId: req.minionId
    }
    // console.log(updatedWorkInstance)
    const updatedWork = updateInstanceInDatabase('work', updatedWorkInstance)
    // console.log(updatedWork)
    if (!updatedWork) return res.status(404).send({message: "there's no work with this ID"})
    res.status(200).send(updatedWork)
})

// - DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
workApi.delete('/:workId', (req, res) =>{
    workId = req.params.workId
    if(!workId) return res.status(404).send({message: 'no such minion'})
    const deletedWork = deleteFromDatabasebyId('minions', workId)
    // console.log(deletedMinion)
    res.status(200).send({message: `wrok with ID: ${workId} deleted`})
})

module.exports = workApi