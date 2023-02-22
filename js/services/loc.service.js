export const locService = {
    getLocs,
    createNewLoc,
    removeLocById
}

import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'


const locs = [
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs)
        }, 2000)
    })
}

function createNewLoc(pos) {
    const loc = {}
    loc.id = utilService.makeId()
    loc.name = prompt('whats the location name?')
    loc.lat = pos.lat
    loc.lng = pos.lng
    loc.weather = 'no weather yet'
    loc.createdAt = utilService.getCurrentDate()
    loc.updatedAt = utilService.getCurrentDate()
    _addNewLoc(loc) // add to locs
    console.log(locs);
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