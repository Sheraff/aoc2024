/// <reference types="node" />

import { join } from "path"
import { byLine } from "../byLine.ts"


async function main() {

	let count = 0
	loop: for await (const line of byLine(join(import.meta.dirname, 'input.txt'))) {
		const report = line.split(' ').map(Number)

		let direction: 1 | -1 | 0 = 0
		for (let i = 1; i < report.length; i++) {
			const a = report[i - 1]!
			const b = report[i]!
			
			if (!direction) {
				direction = Math.sign(b - a) as 1 | -1
			} else if (direction !== Math.sign(b - a)) {
				continue loop
			}

			const spread = Math.abs(b - a)
			if (spread < 1 || spread > 3) {
				continue loop
			}
		}
		count++
	}

	console.log(count)

}

main()