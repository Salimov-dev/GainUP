const express = require('express')
const Objects = require('../models/Object')
const router = express.Router({ mergeParams: true })
const auth = require('../middleware/auth.middleware')

// router.get('/', auth,async (req, res) => {
router.get('/', async (req, res) => {
        try {
            const list = await Objects.find()
            res.status(200).send( list )
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже"
            })
        }
    })

router.get('/:objectId?', auth, async (req, res) => {
    try {
        const { objectId } = req.params
        const editedObject = await Objects.findById(objectId)
        res.status(200).send( editedObject )
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

router.patch('/:objectId?/edit', auth, async (req, res) => {
    try {
        const { objectId } = req.params
        await Objects.findByIdAndUpdate(objectId, req.body)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

router.delete('/:objectId?', auth, async (req, res) => {
    try {
        const { objectId } = req.params
        await Objects.findByIdAndRemove(objectId)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка, попробуйте позже"
        })
    }
})

router.post('/create', auth, async (req, res) => {
        try {
            const newObject = await Objects.create({ ...req.body })
            res.status(201).send(newObject)
        } catch (e) {
            res.status(500).json({
                message: "На сервере произошла ошибка, попробуйте позже"
            })
        }
    })


module.exports = router