/// <reference types="node" />

import { join } from "path"
import { byLine } from "../byLine.ts"


async function main() {

	const a: number[] = []
	const b: number[] = []

	for await (const line of byLine(join(import.meta.dirname, 'input.txt'))) {
		const [x, y] = line.split('   ').map(Number)
		a.push(x)
		b.push(y)
	}

	const map = new Map<number, number>()
	for (const y of b) {
		map.set(y, (map.get(y) ?? 0) + 1)
	}

	let sum = 0
	for (const x of a) {
		const mul = map.get(x) ?? 0
		sum += mul * x
	}

	console.log(sum)
}

main()