import { Dir } from "fs";
import { Cell } from "./cell";
import CellItem from "./cellItem";
import Collision from "./collistion";
import Coordinate from "./coordinate";
import Direction from "./direction";
import { IBoardHelper, ISnake } from "./iStudentCode";

export class BoardHelper implements IBoardHelper {
    /**
     * Get the grid size
     * @returns the number of cells for the square grid's size
     */
    getGridSize(): number {
        return 10;
    }

    /**
     * Gets the millisecond frame update period. Smaller numbers will increase the speed of the game
     * @returns the millisecond refresh rate
     */
    getRefreshRateMs(): number {
        return 500;
    }

    /**
     * Create a new apple cell item, which will be displayed on the board
     * @param freeCells the cells that are currently not occupied
     * @returns the new cell item
     */
    createApple(freeCells: Coordinate[]): CellItem {
        let x = freeCells.length;

        return new CellItem(freeCells[Math.floor(Math.random() * 98)], './game-assets/apple.png');
    }

    /**
     * Processes a keyboard event and potentially returns a direction
     * @param keyBoardEvent the event to process. See for more details: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent
     * @returns the associated direction, or null if not an accepted key code
     */
    getDirection(keyBoardEvent: KeyboardEvent): Direction | null {
        console.log(keyBoardEvent.code)
        switch (keyBoardEvent.code) {
            case "KeyA":
                return Direction.LEFT

            case "KeyD":
                return Direction.RIGHT

            case "KeyW":
                return Direction.UP

            case "KeyS":
                return Direction.DOWN

        }
        return null;
    }
}


export class Snake implements ISnake {
    protected snakeHead = new CellItem(new Coordinate(5, 5), 'blue');
    protected snakeBody: CellItem[] = [new CellItem(new Coordinate(4,5), 'blue'), new CellItem(new Coordinate(3,5), 'blue')];
    protected touchedApple = false;

    /**
     * @returns the Snake Head Cell Item
     */
    getSnakeHead(): CellItem {
        return this.snakeHead;
    }

    /**
     * @returns the Snake Body Cell Items (not including the Snake Head) 
     */
    getSnakeBodyParts(): CellItem[] {
        return this.snakeBody;
    }

    /**
     * @returns all the Snake Cell Items
     */
    getAllSnakeParts(): CellItem[] {
        return [this.snakeHead].concat(this.getSnakeBodyParts());
    }

    /**
     * Handles moving the snake in a certain direct
     * @param direction the diection to move the snake in
     */
    update(direction: Direction): void {
        console.log(direction)
        const snakeHeadCoordinate = this.snakeHead.coordinate;
        let oldX = snakeHeadCoordinate.x;
        let oldY = snakeHeadCoordinate.y;
        switch (direction) {
            case Direction.LEFT:
                snakeHeadCoordinate.x--
                break;

            case Direction.RIGHT:
                snakeHeadCoordinate.x++
                break;

            case Direction.UP:
                snakeHeadCoordinate.y++
                break;

            case Direction.DOWN:
                snakeHeadCoordinate.y--
                break;
        }
        if (this.touchedApple == true) {

            this.touchedApple = false;
        }
        else {
            this.snakeBody.pop()
        }
        this.snakeBody.unshift(new CellItem(new Coordinate(oldX, oldY), 'blue'));
    }

    /**
     * Detects if the snake is colliding with any obstacles or other Cell Items
     * @param gridSize the size of the grid
     * @param appleLocation the location of the apple
     * @returns the collision type or null if no collision
     */
    detectCollision(gridSize: number, appleLocation: Coordinate): Collision | null {
        let snakeHeadCoordinate = this.snakeHead.coordinate;
        if (snakeHeadCoordinate.x < 0 || snakeHeadCoordinate.x >= gridSize || snakeHeadCoordinate.y < 0 || snakeHeadCoordinate.y >= gridSize) {
            return Collision.WALL;
        }

        if (snakeHeadCoordinate.x == appleLocation.x && snakeHeadCoordinate.y == appleLocation.y) {
            return Collision.APPLE;
        }

        for (let snakePart of this.snakeBody) {
            if (snakePart.coordinate.x == snakeHeadCoordinate.x && snakePart.coordinate.y == snakeHeadCoordinate.y) {

                return Collision.SNAKE;
            }
        }
        return null;
    }

    /**
     * Handles the consumption of an apple, which should add a new body part
     */
    consumeApple(): void {
        this.touchedApple = true;
    }

    /**
     * Allows a quick method to update the snake part given the current index in the snake
     * @param snakePart the snake body part or head
     * @param indexInSnake the index into the snake body, as returned by `getAllSnakeParts`
     * @returns the background to set as the cell item's background (color or url)
     */
    updateSnakePartBackground(snakePart: CellItem, indexInSnake: number, lastDirection: Direction): string {
        return snakePart.background;
    }

}

