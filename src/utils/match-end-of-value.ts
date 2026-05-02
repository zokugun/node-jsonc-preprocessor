import { matchPair } from '@zokugun/balanced-pairs';

const PROPERTY_REGEX = /\s*:\s*/;
const START_REGEX = /^\s*(\/\/\s?)?\s*([[{"])/i;
const UNCOMMENT_REGEX = /^(\s*)\/\/\s?(\s*(?:[[\]{}"\d]|true|false).*)$/i;

const JSONC_CONFIG = {
	pairs: {
		blocks: [
			['{', '}'],
			['[', ']'],
		],
		strings: [
			['"', '"', '\\"', '\\\\'],
			['\'', '\'', '\'', '\\\\'],
			['`', '`', '`', '\\\\'],
		],
	},
	comments: {
		lines: [
			'//',
		],
		blocks: [
			['/*', '*/'],
		],
	},
};

function uncomment(line: string): string {
	const match = UNCOMMENT_REGEX.exec(line);
	if(match) {
		return match[1] + match[2];
	}
	else {
		return line;
	}
}

export function matchEndOfValue(input: string[], line: number, offset = 0): number {
	const match = START_REGEX.exec(offset ? input[line].slice(offset) : input[line]);
	if(!match) {
		return line;
	}

	if(match[2] === '"') {
		const pair = matchPair(input, {
			line: line + 1,
			column: offset + match[0].length,
		}, JSONC_CONFIG);
		if(!pair) {
			return line;
		}

		const propertyMatch = PROPERTY_REGEX.exec(input[line].slice(pair.column));
		if(propertyMatch) {
			return matchEndOfValue(input, line, pair.column + propertyMatch[0].length - 1);
		}
	}
	else if(match[2] === '[' || match[2] === '{') {
		const pair = matchPair(input, {
			line: line + 1,
			column: offset + match[0].length,
		}, JSONC_CONFIG, uncomment);

		if(pair) {
			return pair.line - 1;
		}
	}
	else {
		throw new Error('not implemented');
	}

	return line;
}
