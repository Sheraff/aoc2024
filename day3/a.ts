import { readFileSync } from "fs"
import { join } from "path"

const data = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8')

const m = /mul\(([0-9]{1,3})\,([0-9]{1,3})\)/g

let sum = 0

for (const match of data.matchAll(m)) {
	const a = Number(match[1])
	const b = Number(match[2])
	sum += a * b
}

console.log(sum)