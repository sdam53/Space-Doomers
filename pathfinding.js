//class of functions for pathfinding
//done using BFS

/**
 * checks if cell is a valid movement location
 * @param {*} point attempted movement spot
 * @param {*} myMap 2d array as map
 * @returns boolean whether it is valid location
 */
const isWalkable = (point, myMap, game) => {
    if (point.y < 0 || point.y > myMap.length - 1) return false;
    if (point.x < 0 || point.y > myMap[0].length - 1) return false;
    let doors = game.camera.level.doors;
    for (let i = 0; i < doors.length; i++) {
        if (point.x === doors[i].x && point.y === doors[i].y ) {
            return false;
        }
    }
    return myMap[point.y][point.x] === 1;
};

/**
 * returns array for neighboring cells
 * @param {*} point starting point
 * @param {*} map 2d array as map
 * @returns array of neighboring cells
 */
const findNeighbors = (point, map, game) => {
    neighbors = []
    let up = point.offset(0,  1);
    let down = point.offset(0,  -1);
    let left = point.offset(-1, 0);
    let right = point.offset(1, 0);
    if (isWalkable(up, map, game)) neighbors.push(up);
    if (isWalkable(down, map, game)) neighbors.push(down);
    if (isWalkable(left, map, game)) neighbors.push(left);
    if (isWalkable(right, map, game)) neighbors.push(right);
    return neighbors;
};

/**
 * checks if point is already present in array
 * the way i wrote it is a bit weird and could prob be better
 * @param {*} array 
 * @param {*} point 
 * @returns 
 */
const contains = (array, point) => {
    let result = false;
    const isFound = array.some(element => {
        if (element.equals(point)) {
            result = true;
            return true;
        }
    });
    return result;
}

/**
 * checks whether path is straigh
 * @param {*} path array of paths
 */
const checkStraightPath = (path) => {
    
}

/**
 * returns array of cells to target
 * @param {*} start starting point
 * @param {*} end target point
 * @param {*} map 2d array that acts as map
 * @returns array to target
 */
const findPath = (start, end, map, game) => {
    let finished = false;
    let used = [];
    used.push(start);
    while (!finished) {
        let newOpen = [];
        for (let i = 0; i < used.length; i++) {
            let point = used[i];
            let temp = findNeighbors(point, map, game)
            temp.forEach((neighbor) => {
                if (!contains(used, neighbor) && !contains(newOpen, neighbor)) {
                    newOpen.push(neighbor);
                }
            });
        }

        for (let i = 0; i < newOpen.length; i++) {
            used.push(newOpen[i]);
            if (end.equals(newOpen[i])) {
                finished = true;
                break;
            }
        }
        if (!finished && newOpen.length === 0) {
            return [];
        }
    }
    let path = [];
    let point = used[used.length - 1];
    while (point.previous != null) {
        path.splice(0, 0, point);
        point = point.previous;
    }
    return path;
};