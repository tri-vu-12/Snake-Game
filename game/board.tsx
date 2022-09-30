/**
 * STUDENTS SHOULD NOT TOUCH THIS FILE FOR THE EXERCISES
 * (They may improve it after the exercise is done)
 */

import { FunctionComponent, useEffect, useRef, useState } from "react";
import styles from '../styles/Board.module.css';
import CellItem from "./cellItem";
import StudentCode from "./studentCode";

const GridSize = 15;

const gridIterator = (callback: (x: number, y: number) => void) => {
    for(let y = 0; y < GridSize; y++) {
        for(let x = 0; x < GridSize; x++) {
            callback(x, y);
        }
    }
}

class BoardManager {
    private studentCode = new StudentCode();
    private cells = new Map<string, Cell>();
    public items: CellItem[] = [
        { x: 0, y: 3, character: 'x', type: 'test' }
    ];
    constructor() {
        gridIterator((x, y) => this.cells.set(`${x}:${y}`, new Cell(x, y)));
    }

    getCell(x: number, y: number) {
        if(!this.studentCode.isValidCell(GridSize, x, y)) {
            throw new Error('Index outside grid');
        }

        const cell = this.cells.get(`${x}:${y}`);
        if(!cell) {
            throw new Error('FATAL ERROR: Index outside grid');
        }
        return cell;
    }

    update() {
        this.cells.forEach(cell => cell.clearItem());
        this.studentCode.onUpdate('unimplemented', this.items);
        this.items.forEach(item => {
            const cell = this.getCell(item.x, item.y);
            cell.setItem(item);
            console.log(item, cell);
            cell.onChange();
        });
    }
}

class Cell {
    constructor(public x: number, public y: number, private item?: CellItem) {}

    clearItem() {
        this.item = undefined;
        this.onChange();
    }

    setItem(item: CellItem) {
        this.item = item;
        this.onChange();
    }

    getItemCharacter() {
        return this.item?.character ?? '';
    }

    onChange = () => {};
}

type CellProps = {
    cell: Cell;
}

const CellComponent: FunctionComponent<CellProps> = (props) =>  {
    const [character, setCharacter] = useState(props.cell.getItemCharacter());

    props.cell.onChange = () => {
        setCharacter(props.cell.getItemCharacter());
    }

    const onClick = () => {
        console.log(props.cell);
    };

    return <div className={styles.square} onClick={onClick}>{character}</div>
}

const Board: FunctionComponent = () => {
    const [gridSize, setGridSize] = useState(15);
    const boardRef = useRef<HTMLHeadingElement>(null);
    const boardManager = new BoardManager();
    boardManager.update();

    useEffect(() => {
        console.log(boardRef);
        boardRef?.current?.style?.setProperty("--grid-size", gridSize.toString());
    }, [gridSize]);

    useEffect(() => {
        const interval = setInterval(() => {
            boardManager.update();
        }, 1000);
        return () => clearInterval(interval);
    })

    const createCells = () => {
        let cells = [] as JSX.Element[];
        gridIterator((x, y) => {
            const cell = boardManager.getCell(x, y);
            cells.push(<CellComponent cell={cell} key={`${x}-${y}`}></CellComponent>)
        });
        console.log(cells);
        return cells;
    };

    const testItem = () => {
        boardManager.items[0].x++;
    }

    return (
        <div className="App">
            <button onClick={testItem}>Test</button>
            <div ref={boardRef} className={styles.board}>
                {createCells()}
            </div>
        </div>
    );
}

export default Board