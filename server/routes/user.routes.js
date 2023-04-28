const express = require('express')
const User = require('../models/User')
const auth = require('../middleware/auth.middleware')
const router = express.Router({ mergeParams: true })

router.patch('/:userId/edit', auth, async (req, res) => {
    try {
        const { userId } = req.params
        await User.findByIdAndUpdate(userId, req.body)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

// router.get('/', auth, async (req, res) => {
router.get('/', async (req, res) => {
    try {
        const list = await User.find()
        res.send(list)
    } catch(e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

router.delete('/:userId?', auth, async (req, res) => {
    try {
        const { userId } = req.params
        await User.findByIdAndRemove(userId)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

module.exports = router