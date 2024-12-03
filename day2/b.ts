/// <reference types="node" />

import { join } from "path"
import { byLine } from "../byLine.ts"


async function main() {

	let count = 0
	loop: for await (const line of byLine(join(import.meta.dirname, 'input.txt'))) {
		const report = line.split(' ').map(Number)

		skipper: for (let skip = 0; skip < report.length; skip++) {
			const r = report.slice(0,skip).concat(report.slice(skip + 1))
			let direction: 1 | -1 | 0 = 0
			for (let i = 1; i < r.length; i++) {
				const a = r[i - 1]!
				const b = r[i]!
				
				if (!direction) {
					direction = Math.sign(b - a) as 1 | -1
				} else if (direction !== Math.sign(b - a)) {
					continue skipper
				}

				const spread = Math.abs(b - a)
				if (spread < 1 || spread > 3) {
					continue skipper
				}
			}
			count++
			continue loop
		}
	}

	console.log(count)

}

main()