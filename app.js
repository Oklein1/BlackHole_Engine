const circleOnSreen = document.getElementById('circle');
const blackHoleOnScreen = document.getElementById("blackhole");

var circleObj = {
    "x": 0,
    "y": 0,
    "speed": 6,
    "gPull": 0
};

var blackholeObj = {
    "bx": window.innerWidth / 2,
    "by": window.innerHeight / 2,
};

main()
gravitationalPull(circleObj, blackholeObj) // used to start the black hole's inital state

///////////////////////////////////
///////////////////////////////////
//         FUNCTIONS             //
///////////////////////////////////
///////////////////////////////////


function main() {
    updateBlackholePosition();
    physicsEngine(circleObj, blackholeObj);
}

function physicsEngine(circleObj, blackholeObj) {
    arrowKeysEvent(circleObj, blackholeObj);
}

function gravitationalPull(circleObj, blackholeObj) {
    function distance(shipObj, blackholeObj) {
        const square = (n) => n * n;
        const { x, y } = shipObj;
        const { bx, by } = blackholeObj;
        return Math.sqrt(square(bx - x) + square(by - y));
    }
    
    function generateFields(shipObj, blackholeObj) {
        const distanceIncrement = distance(shipObj, blackholeObj) / 5;
        return [1, 2, 3, 4, 5].map(e => Math.round(e * distanceIncrement));
    }

    const gravFieldIntervals = generateFields(circleObj, blackholeObj);
    let currentShipDistance = distance(circleObj, blackholeObj);

    pullShipToBlackHole(circleObj, blackholeObj, currentShipDistance, gravFieldIntervals);
    updateShipPosition();

    // Repeat the gravitational pull effect
    requestAnimationFrame(() => gravitationalPull(circleObj, blackholeObj));
}

function pullShipToBlackHole(shipObj, blackholeObj, currentShipDistance, gravFieldIntervals) {
    const currPos = Math.round(currentShipDistance);
    const { x, y } = shipObj;
    const { bx, by } = blackholeObj;

    switch (true) {
        case currPos <= gravFieldIntervals[4]:
            shipObj.x += (bx - x) * 0.0001;
            shipObj.y += (by - y) * 0.0001;
            break;
        case gravFieldIntervals[4] < currPos && currPos <= gravFieldIntervals[3]:
            shipObj.x += (bx - x) * 0.001;
            shipObj.y += (by - y) * 0.001;
            break;
        case gravFieldIntervals[3] < currPos && currPos <= gravFieldIntervals[2]:
            shipObj.x += (bx - x) * 0.01;
            shipObj.y += (by - y) * 0.01;
            break;
        case gravFieldIntervals[2] < currPos && currPos <= gravFieldIntervals[1]:
            shipObj.x += (bx - x) * 0.05;
            shipObj.y += (by - y) * 0.05;
            break;
        case gravFieldIntervals[1] < currPos && currPos <= gravFieldIntervals[0]:
            shipObj.x += (bx - x) * 0.1;
            shipObj.y += (by - y) * 0.1;
            break;
    }
}

function updateBlackholePosition() {
    blackHoleOnScreen.style.left = window.innerWidth / 2 + "px";
    blackHoleOnScreen.style.top = window.innerHeight / 2 + "px";
}

function updateShipPosition() {
    circleOnSreen.style.left = circleObj.x + "px";
    circleOnSreen.style.top = circleObj.y + "px";
}

function arrowKeysEvent(polygonObj, blackholeObj) {
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
    });

    window.addEventListener('keyup', () => {
        gravitationalPull(circleObj, blackholeObj);
    });
}
