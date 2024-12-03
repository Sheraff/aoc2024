import { readFileSync } from "fs"
import { join } from "path"

const data = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8')

const m = /(mul\(([0-9]{1,3})\,([0-9]{1,3})\))|(do\(\))|(don\'t\(\))/g

let sum = 0
let enabled = true

for (const match of data.matchAll(m)) {
	if (match[4]) {
		enabled = true
	} else if (match[5]) {
		enabled = false
	} else if (enabled) {
		sum += Number(match[2]) * Number(match[3])
	}
}

console.log(sum)