import { matchEndOfValue } from './match-end-of-value.js';
import { rewriteLine } from './rewrite-line.js';

const UNCOMMENT_REGEX = /^(\s*)(?:\/\/\s?)?(.*)$/;

export function uncomment(input: string[], line: number, output: string[], rewrite: boolean, args?: Record<string, string>): number {
	const endOfValue = matchEndOfValue(input, line);

	if(rewrite) {
		while(line <= endOfValue) {
			const uncomment = uncommentLine(input[line]);
			const rewrite = rewriteLine(uncomment, args!);

			if(uncomment === rewrite) {
				output.push(uncomment);
			}
			else {
				output.push(input[line], rewrite);
			}

			++line;
		}
	}
	else {
		while(line <= endOfValue) {
			output.push(uncommentLine(input[line]));

			++line;
		}
	}

	return endOfValue + 1;
}

function uncommentLine(line: string): string {
	const match = UNCOMMENT_REGEX.exec(line);
	if(match) {
		return match[1] + match[2];
	}
	else {
		return line;
	}
}
