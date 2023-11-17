const express = require('express')
const minionsApi = express.Router()
const { getAllFromDatabase, addToDatabase, getFromDatabaseById, updateInstanceInDatabase, deleteFromDatabasebyId } = require('../db')
const workApi = require('./workApi')


// using param mw to pass the minionId 
minionsApi.param('minionId', (req, res, next, minionId) => {
    req.minionId = minionId
    next()
})
// mounted single minion work api
minionsApi.use('/:minionId/work', workApi)

// - GET /api/minions to get an array of all minions.
minionsApi.get('/', (req, res) => {
    const allMinions = getAllFromDatabase('minions')
    if (!allMinions) {
        res.status(204).send({message: 'No minions in db at the moment'})
    }
    res.status(200).send(allMinions)
})

// - POST /api/minions to create a new minion and save it to the database.
minionsApi.post('/', (req, res) => {
    const {name, title, weaknesses, salary} = req.body
    const minionInstance = {
        name,
        title,
        weaknesses,
        salary,
    }
    if (!name || !title || !weaknesses || !salary) {
        res.status(404).send({message: 'Please fill up all paramters to make a new minion'})
    }
    const newMinion = addToDatabase('minions', minionInstance)
    // console.log(newMinion)
    res.status(201).send(newMinion)
})

//  - GET /api/minions/:minionId to get a single minion by id.
minionsApi.get('/:minionId', (req, res) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId)
    // console.log(foundMinion)
    if (!foundMinion) {
        res.status(404).send({message: "there's no minion with this ID"})
    }
    res.status(200).send(foundMinion)
})

//  - PUT /api/minions/:minionId to update a single minion by id.
minionsApi.put('/:minionId', (req, res) => {
    const minionId = req.params.minionId
    if (!minionId) return res.status(404).send({ message: 'this id is not valid'})
    const {name, title, weaknesses, salary} = req.body
    if (!name || !title || !weaknesses || !salary) return res.status(404).send({ message: 'please provide a name, title, weaknesses and salary' })
    const updatedMinionInstance = {
        id: minionId,
        name,
        title,
        weaknesses,
        salary,
    }
    // console.log(updatedMinionInstance)
    const updatedMinion = updateInstanceInDatabase('minions', updatedMinionInstance)
    // console.log(updatedMinion)
    if (!updatedMinion) return res.status(404).send({message: "there's no minion with this ID"})
    res.status(200).send(updatedMinion)
})

//  - DELETE /api/minions/:minionId to delete a single minion by id.
minionsApi.delete('/:minionId', (req, res) =>{
    minionId = req.params.minionId
    if(!minionId) return res.status(404).send({message: 'no such minion'})
    const deletedMinion = deleteFromDatabasebyId('minions', minionId)
    // console.log(deletedMinion)
    res.status(200).send({message: `minion ${minionId} deleted`})
})


module.exports = minionsApi