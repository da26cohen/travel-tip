export const locService = {
    getLocs
}

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const locs = [
    _createLoc('paris', 33.33, 34.33),
    _createLoc('athens', 33.33, 35.33),
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function createNewLoc(name, lat, lng) {
    const loc = {}
    loc.id = utilService.makeId()
    loc.name = prompt('Enter location name') // change to modal later
    loc.lat = lat
    loc.lng = lng
    loc.weather = 'no weather yet'
    loc.createdAt = utilService.getCurrentDate()
    loc.updatedAt = utilService.getCurrentDate()
    _addNewLoc(loc) // add to locs
    return loc
}

function _addNewLoc(loc) {
    locs.push(loc)
}

function removeLocById(id) {
    let removeIdx = locs.findIndex(loc => loc.id === id)
    locs.splice(removeIdx,1)
}

function getLocById(id) {
    return locs.find(loc => loc.id === id)
}

function updateLocById(id, name) {
    let updateIdx = locs.findIndex(loc => loc.id === id)
    locs[updateIdx].name = name
}