'use client'
import { contains, randomOf, shuffle } from "../utils";
import { FigureBase } from "./bases";
import { WrongAnswer } from "./generate_grid";

export type Pattern = number[];
export type Cord = [number, number];

const rotationPatterns: Pattern[] = [[0], [0, 90, 180, 270], [0, 270, 180, 90],];

const colors: string[] = ["#f20505", "#ffcd03", "#0bbf1a", "#11a2f0", "#1706d4", "#ed07d2", "#f7020f"];
const colorPatterns: Pattern[] = [[0], [0, 1], [0, 1, 2]];

interface MovementEngine {
    move(n: number): Cord;
    clone(): MovementEngine;
    getCords(): Cord;
}


class CircleMovementEngine implements MovementEngine {
    path: Cord[];
    pathI: number = -1;

    constructor(availableStartCords: Cord[] | null, path: Cord[], pathI: number = -1) {
        this.path = path.map(e => e).reverse();

        if (pathI == -1) {
            let i: number = Math.floor(Math.random() * availableStartCords!.length);
            let [row, col] = availableStartCords![i];

            for (let j = 0; j < this.path.length; j++) {
                if (this.path[j][0] == row && this.path[j][1] == col) {
                    this.pathI = j;
                    break;
                }
            }
        }
        else {
            this.pathI = pathI!;
        }
    }
    getCords(): Cord {
        return this.path[this.pathI];
    }
    clone(): MovementEngine {
        return new CircleMovementEngine(null, this.path, this.pathI);
    }
    move(n: number): Cord {
        this.pathI = (this.pathI + n) % this.path.length;
        return this.getCords();
    }
}
class BounceMovementEngine implements MovementEngine {
    availableStartCords: Cord[];
    availableCords: Cord[];
    changePattern: Cord;

    row: number;
    col: number;

    constructor(availableStartCords: Cord[], availableCords: Cord[], changePattern: Cord, row: number | null = null, col: number | null = null) {
        this.availableStartCords = availableStartCords;
        this.availableCords = availableCords;
        this.changePattern = changePattern;

        if (row == null && col == null) {
            [this.row, this.col] = randomOf(this.availableStartCords);
        }
        else {
            this.row = row!;
            this.col = col!;
        }
    }
    getCords() {
        return [this.row, this.col] as Cord;
    }
    clone(): BounceMovementEngine {
        return new BounceMovementEngine(this.availableStartCords, this.availableCords, [...this.changePattern], this.row, this.col);
    }
    move(n: number): Cord {
        for (let i = 0; i < n; i++) {
            this.step();
        }
        return [this.row, this.col];
    }
    step() {
        const [dr, dc] = this.changePattern;
        let canAccess = contains(this.row + dr, this.col + dc, this.availableCords);
        if (!canAccess) {
            this.changePattern[0] *= -1;
            this.changePattern[1] *= -1;

            this.step();
            return;
        }
        this.row += this.changePattern[0];
        this.col += this.changePattern[1];
    }
}
function getMovementEngine(): MovementEngine {
    const movementEngines: MovementEngine[] = [
        new BounceMovementEngine( // diagonal bl <-> tr
            [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2]],
            [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2]],
            [-1, 1],
        ),
        new BounceMovementEngine( // diagonal tl <-> br
            [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
            [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
            [1, 1],
        ),
        new BounceMovementEngine( // left <-> right
            [[0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2]], // cant start on edges
            [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]],
            [0, 1],
        ),
        new BounceMovementEngine( // top <-> bottom
            [[0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2]], // cant start on edges
            [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]],
            [1, 0],
        ),
        new CircleMovementEngine( // small circle
            [[1, 1], [1, 2], [2, 1], [2, 2]],
            [[1, 1], [1, 2], [2, 2], [2, 1]],
        ),
        new CircleMovementEngine( // big circle
            [[0, 1], [0, 2], [1, 0], [1, 3], [2, 0], [2, 3], [3, 1], [3, 2]], // cant start on edges because then it'll be undistinguishable from top-down
            [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3], [3, 3], [3, 2], [3, 1], [3, 0], [2, 0], [1, 0],],
        ),
    ];
    return randomOf(movementEngines);
}


export class DisplayableFigure {
    base: FigureBase;
    color: string;
    rotation: number;

    constructor(base: FigureBase, color: string, rotation: number) {
        this.base = base;
        this.color = color;
        this.rotation = rotation;
    }
    copy(): DisplayableFigure {
        return new DisplayableFigure(this.base, this.color, this.rotation);
    }
    isEqual(other: DisplayableFigure): boolean {
        return this.base === other.base && this.color === other.color && this.rotation === other.rotation;
    }
    display(): React.ReactNode {
        return this.base.display(this.color, this.rotation);
    }
}
const unprogressiveChance = 0.8;
const colorlessChance = 0.65;
const rotationlessChance = 0.65;

export class Figure {
    base: FigureBase;

    colorPattern: number[];
    rotationPattern: number[];

    movementEngine: MovementEngine;
    progressive: number = 0;

    colors: string[];

    rotationPatternIndex: number = 0;
    colorPatternIndex: number = 0;

    constructor(figureBase: FigureBase) {
        this.base = figureBase;
        this.progressive = Math.random() > unprogressiveChance ? 1 : 0;

        const doesChangeColor = (this.base.canChangeColor && Math.random() > colorlessChance);
        this.colorPattern = doesChangeColor ? randomOf(colorPatterns.slice(1)) : colorPatterns[0];
        this.colors = doesChangeColor ? shuffle([...colors]).splice(3) : ["#36454F"];

        this.rotationPattern = (this.base.canRotate && Math.random() >= rotationlessChance) ? randomOf(rotationPatterns.slice(1)) : rotationPatterns[0];
        this.movementEngine = getMovementEngine();
    }
    getColor(): string {
        return this.colors[this.colorPattern[this.colorPatternIndex]];
    }
    getRotation(): number {
        return this.rotationPattern[this.rotationPatternIndex];
    }

    move(moves: number | null = null) {
        if (moves == null) {
            moves = this.progressive == 0 ? 1 : this.progressive;
        }

        this.colorPatternIndex = (this.colorPatternIndex + 1) % this.colorPattern.length; // don't apply progressive to colors
        this.rotationPatternIndex = (this.rotationPatternIndex + moves) % this.rotationPattern.length;


        this.movementEngine.move(moves);

        if (this.progressive != 0) {
            this.progressive++;
        }
    }
    display() {
        return this.base.display(this.colors[this.colorPattern[this.colorPatternIndex]], this.rotationPattern[this.rotationPatternIndex],)
    }
    createDisplayable(): DisplayableFigure {
        return new DisplayableFigure(this.base, this.getColor(), this.getRotation());
    }
    generateWrongAnswers(gridI: number): WrongAnswer[] {
        const wrongAnswers = [];

        const actualMovementEngine = this.movementEngine.clone();
        const actualProgressive = this.progressive;
        const actualColorIndex = this.colorPatternIndex;
        const actualRotationIndex = this.rotationPatternIndex;
        const [actualRow, actualCol] = this.movementEngine.getCords();

        const resetChanges = () => {
            this.movementEngine = actualMovementEngine.clone();
            this.progressive = actualProgressive;
            this.colorPatternIndex = actualColorIndex;
            this.rotationPatternIndex = actualRotationIndex;
        }

        // color error:
        if (this.colorPattern.length > 1) {
            this.colorPatternIndex = (this.colorPatternIndex + 1) % this.colorPattern.length;
            wrongAnswers.push(new WrongAnswer(gridI, actualRow, actualCol, actualRow, actualCol, this.createDisplayable()));
            resetChanges();
        }

        // rotation error:
        if (this.rotationPattern.length > 1) {
            // too much rotation
            this.rotationPatternIndex = (this.rotationPatternIndex + 1) % this.rotationPattern.length;
            wrongAnswers.push(new WrongAnswer(gridI, actualRow, actualCol, actualRow, actualCol, this.createDisplayable()));
            resetChanges();

            // too little rotation
            this.rotationPatternIndex = (this.rotationPatternIndex - 1 + this.rotationPattern.length) % this.rotationPattern.length;
            wrongAnswers.push(new WrongAnswer(gridI, actualRow, actualCol, actualRow, actualCol, this.createDisplayable()));
            resetChanges();
        }

        // extra step:
        this.move(1);
        let [newRow, newCol] = this.movementEngine.getCords();
        wrongAnswers.push(new WrongAnswer(gridI, actualRow, actualCol, newRow, newCol, this.createDisplayable()));
        resetChanges();

        // one less step:
        if (gridI == 4) {
            this.move();
            [newRow, newCol] = this.movementEngine.getCords();
            // equal to making a move backward     ↓↓↓↓ for the next grid;                                     
            wrongAnswers.push(new WrongAnswer(gridI + 1, newRow, newCol, actualRow, actualCol, this.createDisplayable()));
            resetChanges();
        }


        return wrongAnswers;
    }
};
