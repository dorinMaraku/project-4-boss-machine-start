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
    if (!title || !description || !hours) {
        return res.status(404).send({message: 'Please fill up all paramters to make a new minion'})
    }
    const newWork = req.body
    newWork.minionId = req.minionId
    const createdWork = addToDatabase('work', newWork)
    // console.log(newWork)
    res.status(201).send(createdWork)
})

//  - GET /api/minions/:minionId/work/:workId to get a single work by id.
workApi.get('/:workId', (req, res) => {
    const foundWork = getFromDatabaseById('work', req.params.workId)
    console.log(foundWork)
    if (!foundWork) {
        return res.status(404).send({message: "there's no work with this ID"})
    }
    res.status(200).send(foundWork)
})

// - PUT /api/minions/:minionId/work/:workId to update a single work by id.

workApi.put('/:workId', (req, res) => {
    const {title, description, hours} = req.body
    if (!title || !description || !hours ) return res.status(404).send({ message: 'please provide title, description and howrs of work' })
    const workInstance = req.body
    workInstance.id = req.params.workId
    workInstance.minionId = req.minionId
    const updatedWork = updateInstanceInDatabase('work', workInstance)
    // console.log(updatedWork)
    if (!updatedWork) return res.status(404).send({message: "there's no work with this ID"})
    res.status(200).send(updatedWork)
})

// - DELETE /api/minions/:minionId/work/:workId to delete a single work by id.
workApi.delete('/:workId', (req, res) =>{
    const deletedWork = deleteFromDatabasebyId('minions', req.params.workId)
    if (deletedWork) {
        res.status(204)
    } else {
        res.status(500)
    }
    res.send()
    // console.log(deletedMinion)
})

module.exports = workApi