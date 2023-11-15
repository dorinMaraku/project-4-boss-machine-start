const express = require('express')
const minionsApi = express.Router()
const { getAllFromDatabase, addToDatabase, getFromDatabaseById } = require('../db')


// GET all minions
minionsApi.get('/', (req, res) => {
    const allMinions = getAllFromDatabase('minions')
    if (!allMinions) {
        res.status(204).send({'message': 'No minions in db at the moment'})
    }
    res.status(200).send(allMinions)
})

// Create new minion
minionsApi.post('/', (req, res) => {
    const {name, title, weaknesses, salary} = req.body
    const minionInstance = {
        name,
        title,
        weaknesses,
        salary,
    }
    if (!name || !title || !weaknesses || !salary) {
        res.status(404).send('Please fill up all paramters to make a nwe minion')
    }
    const newMinion = addToDatabase('minions', minionInstance)
    // console.log(newMinion)
    res.status(201).send(newMinion)
})

//Get a single minion
minionsApi.get('/:minionId', (req, res) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId)
    console.log(foundMinion)
    if (!foundMinion) {
        res.status(404).send({'message': "there's no minion with this ID"})
    }
    res.status(200).send(foundMinion)
})
//- PUT /api/minions/:minionId to update a single minion by id.
//- DELETE /api/minions/:minionId to delete a single minion by id.

module.exports = minionsApi