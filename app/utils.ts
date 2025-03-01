export function shuffle<T>(arr: Array<T>): Array<T> {

    for (let i = arr.length - 1; i >= 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1));

        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function randomOf<T>(arr: Array<T>): T {
    return arr[Math.floor(Math.random() * arr.length)];
}

export function contains(newRow: number, newCol: number, cords: [number, number][]): boolean {
    let canAccess = false;
    for (const [avR, avC] of cords) {
        if (avR == newRow && avC == newCol) {
            canAccess = true;
            break;
        }
    }
    return canAccess;
}