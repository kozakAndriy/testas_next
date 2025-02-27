'use client'
import { shuffle } from "../utils";
import { Arrow, Balloon, Cogwheel, Corner, Crown, Rectangle } from "./bases";
import { DisplayableFigure, Figure } from "./figures";

export type Grid = (DisplayableFigure | null)[][];

export function createEmptyGrid() {
    return Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => null));
}

export const basegrids: Grid[] = Array.from({ length: 4 }, () => createEmptyGrid());
export const fillergrids4: Grid[] = Array.from({ length: 4 }, () => createEmptyGrid());
export const fillergrids2: Grid[] = Array.from({ length: 2 }, () => createEmptyGrid());
export const baseguesses: Grid[][] = Array.from({ length: 2 }, () => Array.from({ length: 3 }, () => createEmptyGrid()));
export const baseAnswers = [1, 1];
export const baseSelected = [-1, -1];

export class GeneratedGrids {
    grids: Grid[];
    guesses: Grid[][];
    answer: number[];

    constructor(newGrids: Grid[], newGuesses: Grid[][], newAnswer: number[]) {
        this.grids = newGrids;
        this.guesses = newGuesses;
        this.answer = newAnswer;
    }
};

export class WrongAnswer {
    gridI: number;
    row: number;
    col: number;
    wrongRow: number;
    wrongCol: number;
    wrongFigure: DisplayableFigure;

    constructor(gridI: number, row: number, col: number, wrongRow: number, wrongCol: number, wrongFigure: DisplayableFigure) {
        this.gridI = gridI;
        this.row = row;
        this.col = col;
        this.wrongRow = wrongRow;
        this.wrongCol = wrongCol;
        this.wrongFigure = wrongFigure;
    }
}

const objectBases = [Arrow, Cogwheel, Rectangle, Corner, Crown, Balloon];

export class GridGenerator {
    objectCount: number;
    grids: Grid[];
    guesses: Grid[][];

    #wrongAnswerPossibilities: WrongAnswer[] = [];

    constructor(objectCount: number) {
        this.objectCount = objectCount;
        this.grids = Array.from({ length: 6 }, () => createEmptyGrid());
        this.guesses = Array.from({ length: 2 }, () => []);
        this.generateGrids();
        this.generateGuesses();
    }
    static isCorrect(grid: Grid, correctGrid: Grid) {
        if (grid == undefined || correctGrid == undefined) return false;

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] == null && correctGrid[i][j] == null) continue;
                if (grid[i][j] == null || correctGrid[i][j] == null) return false;

                if (!grid[i][j]!.isEqual(correctGrid[i][j]!)) return false;
            }
        }
        return true;
    }
    static cloneGrid(grid: Grid): Grid {
        const newGrid: Grid = createEmptyGrid();

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j] != null) {
                    newGrid[i][j] = grid[i][j]!.copy();
                }
            }
        }
        return newGrid;
    }

    generateGrids() {
        shuffle(objectBases);

        for (let i = 0; i < this.objectCount; i++) {
            let it = 0;
            while (++it < 100 && !this.tryPlaceObject(new Figure(new objectBases[i]()), 0));
        }
    }
    generateGuesses() {
        for (let i = 0; i <= 1; i++) {
            this.guesses[i].push(this.grids[4 + i]);
        }
        shuffle(this.#wrongAnswerPossibilities);

        for (const wrong of this.#wrongAnswerPossibilities) {
            if (this.guesses[wrong.gridI - 4].length >= 3) continue;
            const grid = this.grids[wrong.gridI];

            const canPlace = (wrong.row == wrong.wrongRow && wrong.col == wrong.wrongCol) || (grid[wrong.wrongRow][wrong.wrongCol] == null);
            if (!canPlace) continue;

            const wrongGrid: Grid = GridGenerator.cloneGrid(grid);

            wrongGrid[wrong.row][wrong.col] = null;
            wrongGrid[wrong.wrongRow][wrong.wrongCol] = wrong.wrongFigure;

            this.guesses[wrong.gridI - 4].push(wrongGrid);
        }

        for (let i = 0; i <= 1; i++) {
            shuffle(this.guesses[i]);
        }
    }

    tryPlaceObject(figure: Figure, gridI: number): boolean {
        if (gridI >= this.grids.length) {
            return true;
        }
        const grid: Grid = this.grids[gridI];

        if (grid[figure.row][figure.col] !== null) return false;
        figure.move();
        if (grid[figure.row][figure.col] !== null) return false;

        grid[figure.row][figure.col] = figure.createDisplayable();

        let wrongAnswers: WrongAnswer[] = [];
        if (gridI >= 4) {
            wrongAnswers = figure.generateWrongAnswers(gridI);
        }
        const prevRow = figure.row;
        const prevCol = figure.col;
        if (!this.tryPlaceObject(figure, gridI + 1)) {
            grid[prevRow][prevCol] = null;
            return false;
        }

        this.#wrongAnswerPossibilities.push(...wrongAnswers);
        return true;
    }
};
