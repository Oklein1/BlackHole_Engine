const circleOnSreen = document.getElementById('circle');
const blackHoleOnScreen = document.getElementById("blackhole")

var circleObj = {
    "x": 0,
    "y": 0,
    "speed": 6,
    "gPull": 0
}

var blackholeObj = {
    "bx": window.innerHeight / 2,
    "by": window.innerHeight / 2,
}



main()



///////////////////////////////////
///////////////////////////////////
//         FUNCTIONS             //
///////////////////////////////////
///////////////////////////////////

function main() {
    updateBlackholePosition()
    physicsEngine(circleObj,blackholeObj)
    
    // requestAnimationFrame(main, 1000);
}

function physicsEngine(circleObj,blackholeObj){
    
    arrowKeysEvent(circleObj,blackholeObj)
}


function distance(shipObj, blackholeObj) {
    const square = (n) => n * n
    const { x, y } = shipObj
    const { bx, by } = blackholeObj

    return Math.sqrt(square(bx - x) + square(by - y))
}

function gravitationalPull(circleObj, blackholeObj) {
    function generateFields(shipObj, blackholeObj) {
        const distanceIncrement = distance(shipObj, blackholeObj) / 5 //imagine 5 rings
        const intervals = [1, 2, 3, 4, 5].map(e => Math.round(e * distanceIncrement))
        return intervals
    }

    const gravFieldIntervals = generateFields(circleObj, blackholeObj)
    let currentShipDistance = distance(circleObj, blackholeObj)


    pullShipToBlackHole(circleObj,blackholeObj,currentShipDistance,gravFieldIntervals)
    updateShipPosition()
    
}



function pullShipToBlackHole(shipObj, blackholeObj, currentShipDistance, gravFieldIntervals) {
    const currPos = Math.round(currentShipDistance)
    const { x, y } = shipObj
    const { bx, by } = blackholeObj
    
        switch (true) {
            case currPos <= gravFieldIntervals[4]:
                if (x < bx && y < by) {
                    shipObj.x += 0.010
                    shipObj.y += 0.010
                } else if (x > bx && y > by) {
                    shipObj.x -= 0.010
                    shipObj.y -= 0.010
                } else if (x < bx && y > by) {
                    shipObj.x += 0.010
                    shipObj.y -= 0.010
                } else if (x > bx && y < by) {
                    shipObj.x -= 0.010
                    shipObj.y += 0.010
                } else {
                    break
                }
            case gravFieldIntervals[4] < currPos <= gravFieldIntervals[3]:
                if (x < bx && y < by) {
                    shipObj.x += 0.5
                    shipObj.y += 0.5
                } else if (x > bx && y > by) {
                    shipObj.x -= 0.5
                    shipObj.y -= 0.5
                } else if (x < bx && y > by) {
                    shipObj.x += 0.5
                    shipObj.y -= 0.5
                } else if (x > bx && y < by) {
                    shipObj.x -= 0.5
                    shipObj.y += 0.5
                } else {
                    break
                }
            case gravFieldIntervals[3] < currPos <= gravFieldIntervals[2]:
                if (x < bx && y < by) {
                    shipObj.x += 1
                    shipObj.y += 1
                } else if (x > bx && y > by) {
                    shipObj.x -= 1
                    shipObj.y -= 1
                } else if (x < bx && y > by) {
                    shipObj.x += 1
                    shipObj.y -= 1
                } else if (x > bx && y < by) {
                    shipObj.x -= 1
                    shipObj.y += 1
                } else {
                    break
                }
            case gravFieldIntervals[2] < currPos <= gravFieldIntervals[1]:
                if (x < bx && y < by) {
                    shipObj.x += 2.5
                    shipObj.y += 2.5
                } else if (x > bx && y > by) {
                    shipObj.x -= 2.5
                    shipObj.y -= 2.5
                } else if (x < bx && y > by) {
                    shipObj.x += 2.5
                    shipObj.y -= 2.5
                } else if (x > bx && y < by) {
                    shipObj.x -= 2.5
                    shipObj.y += 2.5
                } else {
                    break
                }
            case gravFieldIntervals[1] < currPos <= gravFieldIntervals[0]:
                if (x < bx && y < by) {
                    shipObj.x += 3
                    shipObj.y += 3
                } else if (x > bx && y > by) {
                    shipObj.x -= 3
                    shipObj.y -= 3
                } else if (x < bx && y > by) {
                    shipObj.x += 3
                    shipObj.y -= 3
                } else if (x > bx && y < by) {
                    shipObj.x -= 3
                    shipObj.y += 3
                } else {
                    break
                }
        }
}



function updateBlackholePosition() {
    blackHoleOnScreen.style.left = window.innerWidth / 2 + "px"
    blackHoleOnScreen.style.top = window.innerHeight / 2 + "px"
}


function updateShipPosition() {
    circleOnSreen.style.left = circleObj.x + "px"
    circleOnSreen.style.top = circleObj.y + "px"
}

function arrowKeysEvent(polygonObj,blackholeObj) {
    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                polygonObj.y -= polygonObj.speed;
                updateShipPosition();
                break;
            case 'ArrowDown':
                polygonObj.y += polygonObj.speed;
                updateShipPosition();
                break;
            case 'ArrowLeft':
                polygonObj.x -= polygonObj.speed;
                updateShipPosition();
                break;
            case 'ArrowRight':
                polygonObj.x += polygonObj.speed;
                updateShipPosition();
                break;
        }
    })


    window.addEventListener('keyup', () => {
        gravitationalPull(circleObj, blackholeObj)
      })
}