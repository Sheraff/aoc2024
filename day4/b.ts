import { readFileSync } from "fs"
import { join } from "path"

const data = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8').split('\n')

const height = data.length
const width = data[0].length

const directions = [
	[[-1, -1], [1, 1], [1, -1], [-1, 1]],
	[[-1, -1], [1, 1], [-1, 1], [1, -1]],
	[[1, 1], [-1, -1], [1, -1], [-1, 1]],
	[[1, 1], [-1, -1], [-1, 1], [1, -1]],
]

let count = 0
for (let y = 0; y < height; y++) {
	for (let x = 0; x < width; x++) {
		if (data[y][x] !== 'A') continue
		count += directions.filter(direction => check(x, y, direction)).length
	}
}

function check(x: number, y: number, direction: number[][]): boolean {
	const [M1, S1, M2, S2] = direction
	if (!data[y + M1[1]] || data[y + M1[1]][x + M1[0]] !== 'M') return false
	if (!data[y + S1[1]] || data[y + S1[1]][x + S1[0]] !== 'S') return false
	if (!data[y + M2[1]] || data[y + M2[1]][x + M2[0]] !== 'M') return false
	if (!data[y + S2[1]] || data[y + S2[1]][x + S2[0]] !== 'S') return false
	return true
}

console.log(count)