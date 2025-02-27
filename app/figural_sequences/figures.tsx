'use client'
import { randomOf, shuffle } from "../utils";
import { FigureBase } from "./bases";
import { WrongAnswer } from "./generate_grid";

export type Pattern = number[];
export type Cord = [number, number];

const rotationPatterns: Pattern[] = [[0], [0, 90, 180, 270], [0, 270, 180, 90], [0, 180],];

const colors: string[] = ["#007FFF", "#39FF14", "#FF5F00", "#FF1493", "#FFD700", "#DC143C", "#30D5C8", "#8000FF", "#32CD32", "#00FFFF"];
const colorPatterns: Pattern[] = [[0], [0, 1], [0, 1, 2]];

class MovementPattern {
    availableStartCords: Cord[];
    availableCords: Cord[];
    changePattern: Cord;
    outOfBoundBehavior: OutOfBoundBehavior;

    constructor(asc: Cord[], ac: Cord[], cp: Cord, oobb: OutOfBoundBehavior) {
        this.availableStartCords = asc;
        this.availableCords = ac;
        this.changePattern = cp;
        this.outOfBoundBehavior = oobb
    }
}
enum OutOfBoundBehavior {
    Invert,
    Rotate,
}
const movementByDirection: Cord[] = [
    [-1, 0], // 0 = up
    [0, 1], // 1 = right
    [1, 0], // 2 = down
    [0, -1] // 3 = left
]
const movementPatterns = [
    new MovementPattern( // diagonal bl <-> tr
        [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2]],
        [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2]],
        [-1, 1],
        OutOfBoundBehavior.Invert
    ),
    new MovementPattern( // diagonal tl <-> br
        [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
        [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]],
        [1, 1],
        OutOfBoundBehavior.Invert
    ),
    new MovementPattern( // left <-> right
        [[0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2]], // cant start on edges
        [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]],
        [0, 1],
        OutOfBoundBehavior.Invert,
    ),
    new MovementPattern( // top <-> bottom
        [[0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2]], // cant start on edges
        [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]],
        [1, 0],
        OutOfBoundBehavior.Invert,
    ),
    new MovementPattern( // small circle
        [[1, 1], [1, 2], [2, 1], [2, 2]],
        [[1, 1], [1, 2], [2, 1], [2, 2]],
        [0, 1],
        OutOfBoundBehavior.Rotate
    ),
    new MovementPattern( // big circle
        [[0, 1], [0, 2], [1, 0], [1, 3], [2, 0], [2, 3], [3, 1], [3, 2]], // cant start on edges because then it'll be undistinguishable from top-down
        [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 3], [2, 0], [2, 3], [3, 0], [3, 1], [3, 2], [3, 3]],
        [0, 1],
        OutOfBoundBehavior.Rotate
    ),
];

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

export class Figure {
    base: FigureBase;

    colorPattern: number[];
    rotationPattern: number[];
    movementPattern: MovementPattern;

    colors: string[];

    rotationPatternIndex: number = 0;
    colorPatternIndex: number = 0;

    // movement
    row: number;
    col: number;
    direction: number = 0;
    progressive: number = 0;

    constructor(figureBase: FigureBase) {
        this.base = figureBase;
        this.progressive = Math.random() >= unprogressiveChance ? 1 : 0; // TODO
        this.colors = this.base.canChangeColor ? shuffle([...colors]).splice(3) : [randomOf(colors)];
        this.rotationPattern = this.base.canRotate ? randomOf(rotationPatterns) : rotationPatterns[0];
        this.colorPattern = randomOf(colorPatterns);
        this.movementPattern = randomOf(movementPatterns);

        const startingPosition = randomOf(this.movementPattern.availableStartCords);
        this.row = startingPosition[0];
        this.col = startingPosition[1];
    }
    getColor(): string {
        return this.colors[this.colorPattern[this.colorPatternIndex]];
    }
    getRotation(): number {
        return this.rotationPattern[this.rotationPatternIndex];
    }
    step() {
        const mp = this.movementPattern;
        const [dr, dc] = mp.changePattern;
        const newRow = this.row + dr;
        const newCol = this.col + dc;

        let canAccess = false;
        for (const [avR, avC] of mp.availableCords) {
            if (avR == newRow && avC == newCol) {
                canAccess = true;
                break;
            }
        }

        if (!canAccess) {
            switch (mp.outOfBoundBehavior) {
                case OutOfBoundBehavior.Invert:
                    mp.changePattern[0] *= -1;
                    mp.changePattern[1] *= -1;
                    break;
                case OutOfBoundBehavior.Rotate:
                    this.direction = (this.direction + 1) % 4;
                    mp.changePattern = movementByDirection[this.direction];
                    break;
            }
            this.step();
            return;
        }
        this.row += mp.changePattern[0];
        this.col += mp.changePattern[1];
    }
    move() {
        const moves = this.progressive == 0 ? 1 : this.progressive;

        this.colorPatternIndex = (this.colorPatternIndex + 1) % this.colorPattern.length; // don't apply progressive to colors
        this.rotationPatternIndex = (this.rotationPatternIndex + moves) % this.rotationPattern.length;

        for (let i = 0; i < moves; i++) {
            this.step();
        }
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

        const actualRow = this.row;
        const actualCol = this.col;
        const actualDirection = this.direction;
        const actualChangePattern: Cord = this.movementPattern.changePattern.map(e => e) as Cord;
        const actualProgressive = this.progressive;
        const actualColorIndex = this.colorPatternIndex;
        const actualRotationIndex = this.rotationPatternIndex;

        const resetChanges = () => {
            this.row = actualRow;
            this.col = actualCol;
            this.direction = actualDirection;
            this.movementPattern.changePattern = actualChangePattern;
            this.progressive = actualProgressive;
            this.colorPatternIndex = actualColorIndex;
            this.rotationPatternIndex = actualRotationIndex;
        }

        // color error:
        if (this.colorPattern.length > 1) {
            this.colorPatternIndex = (this.colorPatternIndex + 1) % this.colorPattern.length;
            wrongAnswers.push(new WrongAnswer(gridI, this.row, this.col, this.row, this.col, this.createDisplayable()));
            resetChanges();
        }

        // rotation error:
        if (this.rotationPattern.length > 1) {
            // too much rotation
            this.rotationPatternIndex = (this.rotationPatternIndex + 1) % this.rotationPattern.length;
            wrongAnswers.push(new WrongAnswer(gridI, this.row, this.col, this.row, this.col, this.createDisplayable()));
            resetChanges();

            // too little rotation
            this.rotationPatternIndex = (this.rotationPatternIndex - 1 + this.rotationPattern.length) % this.rotationPattern.length;
            wrongAnswers.push(new WrongAnswer(gridI, this.row, this.col, this.row, this.col, this.createDisplayable()));
            resetChanges();
        }

        // extra step:
        this.step();
        wrongAnswers.push(new WrongAnswer(gridI, actualRow, actualCol, this.row, this.col, this.createDisplayable()));
        resetChanges();

        // one less step:
        if (gridI == 4) {
            this.move();
            // equal to making a move backward     ↓↓↓↓ for the next grid;                                     
            wrongAnswers.push(new WrongAnswer(gridI + 1, this.row, this.col, actualRow, actualCol, this.createDisplayable()));
            resetChanges();
        }


        return wrongAnswers;
    }
};
