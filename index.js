

const MOVE_STEP = 51.6;
const listShapes = [
    { "L": 5 },
    { "O": 5 },
    { "I": 5 },
    { "J": 5 },
    { "S": 6 },
    { "Z": 6 },
    { "T": 6 }]




function generateTetrisShape(shapeName, displacment = 100, uniqueId) {


    let numIterations = listShapes.filter((element) => { if (shapeName == Object.keys(element)[0]) { return element } })[0][shapeName] - 1
    let newShape = document.createElement("div")
    newShape.id = shapeName
    newShape.className = "shape"
    newShape.style.left = displacment + "px"
    document.querySelector("body").appendChild(newShape)

    for (let repetition = 0; repetition < numIterations; repetition++) {
        let square = document.createElement("div")
        square.className = shapeName

        if (shapeName == "T") {
            if ([3, numIterations].includes(repetition)) {
                square.className = ""

            }
        } else if (["Z", "S"].includes(shapeName)) {
            if (repetition == 0 || repetition == numIterations) {
                square.className = ""

            }
            if (shapeName == "Z") {
                newShape.style.webkitTransform = "scaleY(-1)"
            }
        }

        newShape.appendChild(square)

    }



}









generateTetrisShape("L")

generateTetrisShape("Z")



let currentShape = document.querySelector("#L")
currentShape.style.left = currentShape.getBoundingClientRect().left
currentShape.style.top = currentShape.getBoundingClientRect().top + 10 * MOVE_STEP + "px"



let movingShape = document.querySelector("#Z")

const keyListener = (e) => {

    if (["ArrowRight", "ArrowLeft", "ArrowDown"].includes(e.key)) {
        updatePosition(e.key)
    }
}

//
document.addEventListener("keydown", keyListener)


//setInterval(continuousFalling,2000)
setInterval(hasCollided, 100)


function hasCollided() {

    const movingSubparts = document.querySelectorAll("#Z > div.Z")
    const fixedSubparts = document.querySelectorAll("#L > div.L")

    for (let movingSubpart of movingSubparts) {
        for (let fixedSubpart of fixedSubparts) {


            if ((Math.round(movingSubpart.getBoundingClientRect().bottom) == Math.round(fixedSubpart.getBoundingClientRect().top)) && (Math.round(movingSubpart.getBoundingClientRect().left) == Math.round(fixedSubpart.getBoundingClientRect().left))) {
                console.log("Collision detected")
                document.removeEventListener("keydown", keyListener)
            }

            if ((Math.round(movingSubpart.getBoundingClientRect().bottom) == Math.round(fixedSubpart.getBoundingClientRect().bottom)))
                {
                    if(Math.round(movingSubpart.getBoundingClientRect().right) == Math.round(fixedSubpart.getBoundingClientRect().left)){
                        console.log("Touch from the left")}
                    else if (Math.round(movingSubpart.getBoundingClientRect().left) == Math.round(fixedSubpart.getBoundingClientRect().right)){
                        console.log("Touch from the right")
                    } 
                //document.removeEventListener("keydown", keyListener)
            }
        }
    }
}

function continuousFalling() { // check for collision
    currentShape.style.top = currentShape.getBoundingClientRect().top + MOVE_STEP + "px"
}


function updatePosition(direction) {

    console.log(direction)
    if (direction == "ArrowLeft") {
        return movingShape.style.left = movingShape.getBoundingClientRect().left - MOVE_STEP + "px"

    } else if (direction == "ArrowRight") {
        movingShape.style.left = movingShape.getBoundingClientRect().left + MOVE_STEP + "px"

    }
    else if (direction == "ArrowDown") {
        movingShape.style.top = movingShape.getBoundingClientRect().top + MOVE_STEP + "px"
    }



}