const express = require('express')
const MeetingStatus = require('../models/MeetingStatus')
const router = express.Router({ mergeParams: true })

router.get('/', async (req, res) => {

    try {
        const list = await MeetingStatus.find()
        res.status(200).send( list )
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

module.exports = router