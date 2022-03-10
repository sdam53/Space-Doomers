//class representing point of screen/map
//not used anymore
class Point {
    constructor(game, x, y, previous) {
        Object.assign(this, {game, x, y, previous});
        this.myPrevious = previous;
    }

    /**
     * returns new point depending of offset
     * @param {*} ox x offset
     * @param {*} oy y offset
     * @returns new point
     */
    offset(ox, oy) {
        return new Point(this.game, this.x + ox, this.y + oy, this);
    }

    /**
     * returns whether another point is equal to each other
     * @param {*} point 
     * @returns 
     */
    equals(point) {
        return ((this.x === point.x) && (this.y === point.y));
    }

    /**
     * 
     * @returns string representation of point
     */
    toString() {
        return "(" + this.x + " " + this.y + ")";
    }
}