/// <reference types="node" />

import { join } from "path"
import { byLine } from "../byLine.ts"

const ordering: [number, number][] = []
const updates: number[][] = []

async function main() {

	let mode = 'ordering'

	let sum = 0

	for await (const line of byLine(join(import.meta.dirname, 'input.txt'))) {
		if (!line) {
			mode = 'updates'
			continue
		}
		switch (mode) {
			case 'ordering': {
				ordering.push(line.split('|').map(Number) as [number, number])
				break
			}
			case 'updates': {
				const update = line.split(',').map(Number)
				updates.push(update)
				if (!isCorrect(update)) {
					update.sort(sort)
					const index = Math.floor(update.length / 2)
					console.log('correct', update[index], 'in', update)
					sum += update[index]
				}
				break
			}
		}
	}
	console.log('sum', sum)
}

function sort(a: number, b: number) {
	if (ordering.some(pair => pair[0] === a && pair[1] === b)) return -1
	if (ordering.some(pair => pair[0] === b && pair[1] === a)) return 1

	return 0
}

function isCorrect(update: number[]) {
	for (let i = 0; i < update.length; i++) {
		const a = update[i]
		const after = ordering.filter((pair) => a === pair[0]).map(pair => pair[1])
		const before = ordering.filter((pair) => a === pair[1]).map(pair => pair[0])
		for (let j = 0; j < update.length; j++) {
			if (i === j) continue
			const b = update[j]
			if (i > j) {
				if (after.includes(b)) return false
			} else {
				if (before.includes(b)) return false
			}
		}
	}
	return true
}

main()