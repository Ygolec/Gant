export function basicScheduling(inputMatrix: number[][]): number[] {
    return inputMatrix.map((_, index) => index)
}

export function johnsonScheduling(inputMatrix: number[][]): number[] {
    const firstColumn: number[] = inputMatrix.map(row => row.at(0) ?? 0)
    const lastColumn: number[] = inputMatrix.map(row => row.at(-1) ?? 0)
    const workDurations = [firstColumn, lastColumn]
    const scheduleStart = []
    const scheduleEnd = []

    for (let i = 0; i < firstColumn.length; i++) {
        const min = findMin(workDurations)
        if (min.x === 0) {
            scheduleStart.push(min.y)
        } else {
            scheduleEnd.push(min.y)
        }
        workDurations[0][min.y] = Number.MAX_VALUE
        workDurations[1][min.y] = Number.MAX_VALUE
    }

    return [...scheduleStart, ...scheduleEnd.reverse()]
}

export function firstJohnsonGeneralization(inputMatrix: number[][]): number[] {
    const schedule = []
    let firstColumn = inputMatrix.flatMap(row => row.at(0) ?? 0);

    for (let i = 0; i < firstColumn.length; i++) {
        let min = findMin([firstColumn]);
        schedule.push(min.y)
        firstColumn[min.y] = Number.MAX_VALUE
    }

    return schedule
}

export function secondJohnsonGeneralization(inputMatrix: number[][]): number[] {
    const schedule = []
    let lastColumn = inputMatrix.flatMap(row => row.at(-1) ?? 0);

    for (let i = 0; i < lastColumn.length; i++) {
        let min = findMax([lastColumn]);
        schedule.push(min.y)
        lastColumn[min.y] = Number.MIN_VALUE
    }

    return schedule
}

export function thirdJohnsonGeneralization(inputMatrix: number[][]): number[] {
    let schedule = []

    const maxTimes = inputMatrix.map((row, index) => {
        let max = findMax([row]);
        max.x = index
        return max
    })
        .sort((a, b) => {
            // if (b.y === a.y) return inputMatrix[b.x][b.y] - inputMatrix[a.x][a.y]
            // if (b.y === a.y) return inputMatrix[a.x][0] - inputMatrix[b.x][0]
            return b.y - a.y
        })

    schedule = maxTimes.map(time => time.x)

    return schedule
}

export function fourthJohnsonGeneralization(inputMatrix: number[][]): number[] {
    const schedule = []
    let totalTimes = inputMatrix.map(row => row.reduce((a, b) => a + b));

    for (let i = 0; i < totalTimes.length; i++) {
        let min = findMax([totalTimes]);
        schedule.push(min.y)
        totalTimes[min.y] = Number.MIN_VALUE
    }

    return schedule
}

export function fifthJohnsonGeneralization(inputMatrix: number[][]): number[] {
    const orders = [
        firstJohnsonGeneralization(inputMatrix),
        secondJohnsonGeneralization(inputMatrix),
        thirdJohnsonGeneralization(inputMatrix),
        fourthJohnsonGeneralization(inputMatrix),
    ]

    const result = orders.reduce((r, a) => {
        a.forEach(function (b, i) {
            r[i] = (r[i] || 0) + b;
        });
        return r;
    }, [])
        .map((value, index) => {return {value, i: index}})
        .sort((a, b) => a.value - b.value)

    return result.map(value => value.i)
}

function findMin(matrix: number[][]): { x: number, y: number } {
    let min = Number.MAX_VALUE
    let minX = 0
    let minY = 0

    matrix.forEach((col, x) => {
        col.forEach((cell, y) => {
            if (cell < min) {
                min = cell
                minX = x
                minY = y
            }
        })
    })

    return {x: minX, y: minY}
}

function findMax(matrix: number[][]): { x: number, y: number } {
    let max = Number.MIN_VALUE
    let maxX = 0
    let maxY = 0

    matrix.forEach((col, x) => {
        col.forEach((cell, y) => {
            if (cell > max) {
                max = cell
                maxX = x
                maxY = y
            }
        })
    })

    return {x: maxX, y: maxY}
}
