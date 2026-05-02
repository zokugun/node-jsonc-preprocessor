import { matchEndOfValue } from './match-end-of-value.js';

const COMMENT_REGEX = /^(\s*)(\/\/\s*)?(.*)$/;

export function comment(input: string[], line: number, indent: string, output: string[]): number {
	const endOfValue = matchEndOfValue(input, line);

	const prefix = indent + '// ';

	while(line <= endOfValue) {
		if(!input[line].endsWith('// #del')) {
			output.push(commentLine(input[line], indent, prefix));
		}

		++line;
	}

	return endOfValue + 1;
}

function commentLine(line: string, indentation: string, prefix: string): string {
	const match = COMMENT_REGEX.exec(line)!;
	if(match[2]) {
		return line;
	}
	else if(line.startsWith(indentation)) {
		return prefix + line.slice(indentation.length);
	}
	else {
		return match[1] + '// ' + match[3];
	}
}
