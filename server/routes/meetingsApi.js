const express = require('express');
const meetingsApi = express.Router();
const { getAllFromDatabase, addToDatabase, createMeeting, deleteAllFromDatabase} = require('../db')

// - GET /api/meetings to get an array of all meetings.
meetingsApi.get('/', (req, res) => {
    const allMeetings = getAllFromDatabase('meetings')
    if (!allMeetings) {
        res.status(204).send({message: 'No meetings registered at the moment'})
    }
    res.status(200).send(allMeetings)
})
// - POST /api/meetings to create a new meeting and save it to the database.
meetingsApi.post('/', (req, res) => {
    const newMeeting = addToDatabase('meetings', createMeeting())
    res.status(201).send(newMeeting)
})

// - DELETE /api/meetings to delete _all_ meetings from the database.
meetingsApi.delete('/', (req, res) => {
    const deletedEvent = deleteAllFromDatabase('meetings')
    if (deletedEvent) {
        res.status(204)
    } else {
        res.status(500)
    }
    // console.log(deletedEvent)
    res.send()
})

module.exports = meetingsApi;