import CellItem from "./cellItem";
import IStudentCode from "./iStudentCode";

export default class StudentCode implements IStudentCode {
    isValidCell(gridSize: number, x: number, y: number): boolean {
        // TODO: Implement
        return true;
    }

    onUpdate(direction: string, cellItems: CellItem[]): void {
        // TODO: Implement
        cellItems[0].x++;
    }
}
