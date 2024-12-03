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

	a.sort((a, b) => a - b)
	b.sort((a, b) => a - b)

	let sum = 0
	for (let i = 0; i < a.length; i++) {
		sum += Math.abs(a[i] - b[i])
	}

	console.log(sum)
}

main()