import { readFileSync } from "fs"
import { join } from "path"

const data = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8').split('\n')

const height = data.length
const width = data[0].length

const letters = ['M', 'A', 'S']
const directions = [
	[0, 1],
	[0, -1],
	[1, 0],
	[1, 1],
	[1, -1],
	[-1, 0],
	[-1, 1],
	[-1, -1],
] as const

let count = 0
for (let y = 0; y < height; y++) {
	for (let x = 0; x < width; x++) {
		if (data[y][x] !== 'X') continue
		count += directions.filter(direction => check(x, y, direction)).length
	}
}

function check(x: number, y: number, direction: readonly [x: number, y: number]): boolean {
	if (x + letters.length * direction[0] < 0 || x + letters.length * direction[0] >= width) return false
	if (y + letters.length * direction[1] < 0 || y + letters.length * direction[1] >= height) return false
	for (let i = 1; i <= letters.length; i++) {
		const letter = data[y + i * direction[1]][x + i * direction[0]]
		const correct = letter === letters[i - 1]
		if (!correct) return false
	}
	return true
}

console.log(count)