const express = require('express')
const Meetings = require('../models/Meeting')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')

// router.get('/', auth, async (req, res) => {
router.get('/', async (req, res) => {

        try {
            const list = await Meetings.find()
            res.status(200).send( list )
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже"
            })
        }
    })

router.post('/create', auth, async (req, res) => {
        try {
            const newMeeting = await Meetings.create({ ...req.body })
            res.status(201).send(newMeeting)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже"
            })
        }
    })

router.patch('/:meetingId?/edit', auth, async (req, res) => {
    try {
        const { meetingId } = req.params
        await Meetings.findByIdAndUpdate(meetingId, req.body)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

router.delete('/:meetingId?', auth, async (req, res) => {
    try {
        const { meetingId } = req.params
        await Meetings.findByIdAndRemove(meetingId)

    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

module.exports = router