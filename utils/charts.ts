import dayjs from "dayjs";


type Schedule = {
    id: number
    start: number,
    end: number,
}[][]

export function generateSchedule(durations: number[][], order: number[]): Schedule {
    const firstJobQueue = order
    const jobs = durations[0].length

    const result = [] as Schedule

    for (let job = 0; job < jobs; job++) {
        if (!result[job]) result[job] = []
        for (let i = 0; i < order.length; i++) {
            // if (job === 0 && i === 1) debugger

            const index = order[i];
            const previous = order[i - 1] ?? -1
            let start = 0
            if (job !== 0) {
                if (i !== 0) {
                    start = Math.max(result[job - 1][index].end, result[job][previous].end)
                } else {
                    start = result[job - 1][index].end
                }
            } else if (i !== 0) {
                start = result[job][previous].end
            }

            if (isNaN(start)) debugger

            const end = start + durations[index][job]

            if (isNaN(end)) debugger

            result[job][index] = {
                id: index,
                start,
                end,
            }
        }
    }

    return result
}

export function prepareChartData(schedule: Schedule, startDate: Date) {
    const colors = [] as string[]
    schedule[0].forEach(() => {
        colors.push(`${randomHexColor()}`)
    })
    const start: dayjs.Dayjs = dayjs(startDate)
    return schedule.map(job => {
        return job.map(entry => {
            return {
                start: start.add(entry.start, 'hour').toDate(),
                end: start.add(entry.end, 'hour').toDate(),
                ganttBarConfig: {
                    id: `${entry.id} - ${entry.start} - ${entry.end}`,
                    label: `${entry.id + 1}`,
                    style: {
                        background: colors[entry.id]
                    }
                }
            }
        })
    })
}

function randomInteger(max: number) {
    return Math.floor(Math.random()*(max + 1));
}
function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);

    return [r, g, b];
}


function randomHexColor() {
    let [r, g, b] = randomRgbColor();
    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');

    return "#" + hr + hg + hb;
}
