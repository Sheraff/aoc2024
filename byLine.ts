import { createReadStream } from "fs"
import { createInterface } from "readline"

export function byLine(path: string) {
	const fileStream = createReadStream(path)

	const rl = createInterface({
		input: fileStream,
		crlfDelay: Infinity
	})

	return rl
}