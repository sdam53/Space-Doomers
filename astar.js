/**
 * class representing a point
 * not being used rn, keeping just in case
 */
class Point2 {
    constructor(x, y) {
		Object.assign(this, {x, y});
    }

    /**
     * returns point in repect to offset
     * @param {*} ox x offset
     * @param {*} oy y offset
     * @returns point in repect to offset
     */
    offset(ox, oy) {
        return new Point(this.x + ox, this.y + oy);
    }

    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

/**
 * class representing node
 * extension of point that contains parent node and scores
 */
class Node {
    constructor(parent, position) {
		Object.assign(this, {parent, position});
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    equals(other) {
        return this.position.equals(other.position);
    }
}

const aStarPath = (start, end, map, game) => {

    //if player is in invaid area, wall glitching. fixs itself since player gets pushed back
    if (!validEnd(end, map)) {

        return [];
    }
    startNode = new Node(null, start);
    endNode = new Node(null, end); 
    //list of nodes to check
    openList = new PriorityQueue();
    //list of already checked lists
    closedList = [];
    //adding the starting node to the openList to be checked
    openList.enqueue(startNode);
    let lowestF; //int of the node in openList that has the lowest f score
    while (openList.values.length > 0) {
        //get node with lowest f score and removing it
        // lowestF = findLowestF(openList); 
        // let current = openList[lowestF];
        // openList.splice(lowestF, 1); 
        let current = openList.dequeue();
        //console.log(openList.values.length);

        //if that node is endNode then path found
        if (current.equals(endNode)) { 
            let path = [];
            let currentNode = current;
            while (currentNode) {
                path.push(currentNode.position);
                currentNode = currentNode.parent;
            }
            path.pop();
            //console.log(path.reverse());
            return path;
        }

        if (openList.values.length > 100) {
            return [];
        }
        

        //getting neighboring nodes
        let neighbor = findNeighbors1(game, current.position, map, current);
        for (let i = 0; i < neighbor.length; i++) {

            //updating neighbor scores
            let successor = neighbor[i]; 
            neighbor[i].g = current.g + 1;
            neighbor[i].h = abs(successor.position.x - endNode.position.x) + abs(successor.position.y - endNode.position.y);
            neighbor[i].f = neighbor[i].g + neighbor[i].h;
            //if neighbor is already in the open list and has a lower f score, skip this neighbor
            //let contain = contains1(openList, neighbor[i]);

            if (openList.contains(neighbor[i])) {
               continue;
            }
            //console.timeEnd("start")

            //if neighbor is already in the closedList and has a lower f score, else add neighbor to the openList
            contain = contains1(closedList, neighbor[i]);
            if (contain[0] && contain[1] < neighbor[i].f) {
                continue;
            } else {
                openList.enqueue(neighbor[i]);
            }

        }
        //current node has been checked. add to the closed list
        closedList.push(current);
    }
    return []; //no path found

}

/**
 * checks whether point is walkable
 * @param {*} point point to check
 * @param {*} myMap 2d map
 * @param {*} game game engine
 * @returns boolean whether point is walkable
 */
const isWalkable1 = (point, myMap, game) => {
    let valid = false;
    if (point.y < 0 || point.y > myMap.length - 1) {
        return false;
    }
    if (point.x < 0 || point.y > myMap[0].length - 1) {
        return false;
    }
    let doors = game.camera.level.doors;
    for (let i = 0; i < doors.length; i++) {
        if (point.x === doors[i].x && point.y === doors[i].y ) {
            return false;
        }
    }
    if (myMap[point.y][point.x] === 1) {
        valid = true;
    }
    return valid;
};
/**
 * returns of list of neighboring nodes
 * @param {*} game game engine
 * @param {*} point parent point
 * @param {*} map 2d map
 * @param {*} currentNode node containing the parent point 
 * @returns list of neighboring nodes
 */
const findNeighbors1 = (game, point, map, currentNode) => {
    neighbors = []
    let up = point.offset(0,  1);
    let down = point.offset(0,  -1);
    let left = point.offset(-1, 0);
    let right = point.offset(1, 0);
    if (isWalkable1(up, map, game)) neighbors.push(new Node(currentNode, up));
    if (isWalkable1(down, map, game)) neighbors.push(new Node(currentNode, down));
    if (isWalkable1(left, map, game)) neighbors.push(new Node(currentNode, left));
    if (isWalkable1(right, map, game)) neighbors.push(new Node(currentNode, right));
    return neighbors;
};

/**
 * finds the index of the lowest f score node. could maybe be morre efficient if using something like a priority queue
 * have data structure that orders it at lowest f score would be better than a loop
 * this one will just take the first lowest which is the first one
 * @param {*} list list of nodes
 * @returns index of lowest f score node
 */
const findLowestF = (list) => {
    let index = -1;
    let lowest = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < list.length; i++) {
        if (list[i].f < lowest) {
            index = i;
            break; 
        }
    }
    return index;
};

/**
 * checks if list contains that node in relation of position
 * @param {*} array array of nodes
 * @param {*} Node node to be checks
 * @returns list of size 2 with boolean whether list contains the node and its f score
 */
const contains1 = (array, Node) => {
    let result = [false, Number.MAX_SAFE_INTEGER];
    array.some(element => {
        if (element.equals(Node)) {
            result[0] = true;
            result[1] = element.f;
            return;
        }
    });
    return result;
}

const validEnd = (point, myMap) => {
    if (point.y < 0 || point.y > myMap.length - 1) {
        return false;
    }
    if (point.x < 0 || point.x > myMap[0].length - 1) {
        return false;
    }
    return myMap[point.y][point.x] === 1;
}