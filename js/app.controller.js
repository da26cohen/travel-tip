import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'


window.onload = onInit
window.onAddMarker = onAddMarker
window.OnPanToUserLoc = OnPanToUserLoc
window.onGetLocs = renderLocs
window.onGetUserPos = onGetUserPos
window.onPanTo = onPanTo
window.onRemoveLoc = onRemoveLoc
window.onSearch = onSearch

function onInit() {
    mapService.initMap()
        .then(() => {
            mapService.clickedMap()


        })
        .catch(() => console.log('Error: cannot init map'))

}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos')
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker')
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 })
}

function renderLocs() {
    let strHtml = `<tr>
 <th>name</th>
 <th>lat</th>
 <th>lang</th>
 <th>weather</th>
 <th>createdAt</th>
 <th>updateAt</th>
 <th>actions</th>
</tr>`
    function onMapClick() {
        gMap.addListener("click", (mapsMouseEvent) => {
            let pos = mapsMouseEvent.latLng.toJSON()
            locService.createNewLoc(pos)
        });

    }

    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            strHtml += locs.map(loc => `
                 <tr>
                 <td>${loc.name}</td> 
                 <td>${loc.lat}</td> 
                 <td>${loc.lng}</td> 
                 <td>${loc.weather}</td> 
                 <td>${loc.createdAt}</td> 
                 <td>${loc.updatedAt}</td> 
                 <td><button class="btn-go" onclick="onPanTo(${loc.lat},${loc.lng})">go</button>
                 <button class="btn-delete" onclick="onRemoveLoc('${loc.id}')">delete</button> 
                 </td> 
                 </tr>
                 `
            ).join('')
            document.querySelector('.locs-table').innerHTML = strHtml
        })


}

function onGetUserPos() {
    locService.getLocs()
        .then(res => console.log(res))

    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords)
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err)
        })
}

function OnPanToUserLoc() {
    getPosition()
        .then(res => mapService.panTo(res.coords.latitude, res.coords.longitude))
}

function onPanTo(lat, lng) {
    console.log(lat, lng);
    mapService.panTo(lat, lng)
}

function onRemoveLoc(id) {
    locService.removeLocById(id)
    renderLocs()
}


function onSearch(ev) {
    ev.preventDefault()
    const API_KEY = 'AIzaSyCx6oTjqM9rukY905vfCTxcwW2Hv23l-vE'
    const address = document.querySelector(".search-input").value;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;
    fetch(geocodeUrl)
        .then(search => search.json())
        .then(res => {
            const loc = res.results[0].geometry.location;
            onPanTo(loc.lat, loc.lng)
            locService.createNewLoc(loc,address)
        })
}