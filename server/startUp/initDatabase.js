const DistrictSpbLo = require('../models/DistrictSpbLo')
const ManagerStatus = require('../models/ManagerStatus')
const MeetingStatus = require('../models/MeetingStatus')
const ObjectStatus = require('../models/ObjectStatus')
const UserAccessRoot = require('../models/UserAccessRoot')
const WorkingPosition = require('../models/WorkingPosition')
const Object = require('../models/Object')

const districtsSpbLoMock = require('../mock/districtsSpbLO.json')
const managersStatusMock = require('../mock/managersStatus.json')
const meetingsStatusMock = require('../mock/meetingsStatus.json')
const objectsStatusMock = require('../mock/objectsStatus.json')
const userAccessRootMock = require('../mock/userAccessRoot.json')
const workingPositionsMock = require('../mock/workingPositions.json')
const objectsMock = require('../mock/objects.json')

module.exports = async () => {
    // const districtsSpbLo = await DistrictSpbLo.find()
    // if(districtsSpbLo.length !== districtsSpbLoMock.length) {
    //     await createInitialEntity(DistrictSpbLo, districtsSpbLoMock)
    // }
    // const managersStatus = await ManagerStatus.find()
    // if(managersStatus.length !== managersStatusMock.length) {
    //     await createInitialEntity(ManagerStatus, managersStatusMock)
    // }
    // const meetingsStatus = await MeetingStatus.find()
    // if(meetingsStatus.length !== meetingsStatusMock.length) {
    //     await createInitialEntity(MeetingStatus, meetingsStatusMock)
    // }
    // const objectsStatus = await ObjectStatus.find()
    // if(objectsStatus.length !== objectsStatusMock.length) {
    //     await createInitialEntity(ObjectStatus, objectsStatusMock)
    // }
    // const userAccessRoot = await UserAccessRoot.find()
    // if(userAccessRoot.length !== userAccessRootMock.length) {
    //     await createInitialEntity(UserAccessRoot, userAccessRootMock)
    // }
    // const workingPositions = await WorkingPosition.find()
    // if(workingPositions.length !== workingPositionsMock.length) {
    //     await createInitialEntity(WorkingPosition, workingPositionsMock)
    // }
    // const objects = await Object.find()
    // if(objects.length !== objectsMock.length) {
    //     await createInitialEntity(Object, objectsMock)
    // }

}

async function createInitialEntity (Model, data) {
    await Model.collection.drop()
    return Promise.all(
        data.map(async item => {
            try {
                delete item._id
                const newItem = new Model(item)
                await newItem.save()
                return newItem
            } catch (e) {
                return e
            }
        })
    )
}