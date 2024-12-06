/// <reference types="node" />

import { join } from "path"
import { byLine } from "../byLine.ts"
import { readFileSync } from "fs"


const guard = ['^', '>', 'v', '<']

const directions = [
	[0, -1],
	[1, 0],
	[0, 1],
	[-1, 0]
]

const nothing = '.'

async function main() {

	const data = readFileSync(join(import.meta.dirname, 'input.txt'), 'utf-8').split('\n').map(line => line.split(''))
	const width = data[0].length
	const height = data.length

	console.log('width', width)
	console.log('height', height)

	const initial = [0, 0, 0] as [x: number, y: number, direction: number]
	for (let y = 0; y < data.length; y++) {
		const line = data[y]
		for (let x = 0; x < line.length; x++) {
			if (guard.includes(line[x])) {
				initial[0] = x
				initial[1] = y
				initial[2] = guard.indexOf(line[x])
			}
		}
	}
	data[initial[1]][initial[0]] = nothing

	
	const seen = new Set<string>()

	function addPos(pos: number[]) {
		seen.add(`${pos[0]},${pos[1]},${pos[2]}`)
	}
	function isSeen(pos: number[]) {
		return seen.has(`${pos[0]},${pos[1]},${pos[2]}`)
	}

	function isLoop(initial: number[]) {
		const position = [...initial]
		while(true) {
			if (isSeen(position)) return true
			addPos(position)
			const direction = directions[position[2]]
			const x = position[0] + direction[0]
			const y = position[1] + direction[1]
			const line = data[y]
			if (!line) break
			const next = line[x]
			if (!next) break
			if (next === nothing) {
				position[0] = x
				position[1] = y
				continue
			}
			position[2] = (position[2] + 1) % guard.length
		}
		return false
	}

	let count = 0
	for (let y = 0; y < data.length; y++) {
		const line = data[y]
		console.log('evaluating line', y + 1, '/', height, 'current count', count)
		for (let x = 0; x < line.length; x++) {
			if (line[x] !== nothing) continue
			line[x] = '#'
			seen.clear()
			if (isLoop(initial)) {
				count++
			}
			line[x] = nothing
		}
	}
	console.log(count)

}

main()