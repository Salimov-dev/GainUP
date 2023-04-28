const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/auth', require('./auth.routes'))
router.use('/objects', require('./objects.routes'))
router.use('/meetings', require('./meetings.routes'))
router.use('/managers', require('./user.routes'))
router.use('/objectsonmap', require('./objectsonmap.routes'))
router.use('/presentations', require('./presentations.routes'))
router.use('/feedback', require('./feedback.routes'))
router.use('/districtSpbLo', require('./districtSpbLo.routes'))
router.use('/managerStatus', require('./managerStatus.routes'))
router.use('/meetingStatus', require('./meetingStatus.routes'))
router.use('/objectStatus', require('./objectStatus.routes'))
router.use('/userAccessRoot', require('./userAccessRoot.routes'))
router.use('/workingPosition', require('./workingPosition.routes'))

module.exports = router