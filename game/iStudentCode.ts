/**
 * STUDENTS SHOULD NOT TOUCH THIS FILE FOR THE EXERCISES
 * (They may improve it after the exercise is done)
 */

import CellItem from "./cellItem";

export default interface IStudentCode {
    isValidCell(gridSize: number, x: number, y: number): boolean;

    onUpdate(direction: string, cellItems: CellItem[]): void;
}