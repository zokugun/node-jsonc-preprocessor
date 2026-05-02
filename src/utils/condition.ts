import { matchPair } from '@zokugun/balanced-pairs';
import compareVersions, { type CompareOperator } from 'compare-versions';

const DIRECTIVE_CONFIG = {
	pairs: {
		blocks: [
			['(', ')'],
		],
		strings: [
			['"', '"', '\\"', '\\\\'],
		],
	},
};

const COMMA_REGEX = /^\s*,?\s*/;
const IDENTIFIER_REGEX = /^\s*(\w+)/;
const OPERATOR_REGEX = /^\s*([!<>]?=|<|>)/;
const OR_REGEX = /^\s*\|/;
const VALUE_REGEX = /^\s*"/;
const UNARY_REGEX = /^\s*(\?|!\?)/;

export function condition(match: RegExpExecArray, types: Record<string, string>, args: Record<string, string>): boolean {
	if(!match[3]) {
		return true;
	}

	const line = match[2];
	const end = matchPair(line, 0, DIRECTIVE_CONFIG);

	if(end) {
		let result = true;
		let condition = line.slice(1, end);
		let match: RegExpExecArray | null;

		while(result && condition.length > 0) {
			match = UNARY_REGEX.exec(condition);

			if(match) {
				const operator = match[1];
				condition = condition.slice(match[0].length);

				match = IDENTIFIER_REGEX.exec(condition);
				if(!match) {
					return false;
				}

				const identifier = match[1];
				condition = condition.slice(match[0].length);

				switch(operator) {
					case '?': {
						result = args[identifier] !== undefined;
						break;
					}

					case '!?': {
						result = args[identifier] === undefined;
						break;
					}

					default: {
						return false;
					}
				}
			}
			else {
				match = IDENTIFIER_REGEX.exec(condition);
				if(!match) {
					return false;
				}

				const identifier = match[1];
				condition = condition.slice(match[0].length);

				match = OPERATOR_REGEX.exec(condition);
				if(!match) {
					return false;
				}

				const operator = match[1];
				condition = condition.slice(match[0].length);

				match = VALUE_REGEX.exec(condition);
				if(!match) {
					return false;
				}

				const end = matchPair(condition, match[0].length - 1, DIRECTIVE_CONFIG);
				if(!end) {
					return false;
				}

				const operands = [condition.slice(match[0].length, end)];
				condition = condition.slice(end + 1);

				while((match = OR_REGEX.exec(condition))) {
					condition = condition.slice(match[0].length);

					match = VALUE_REGEX.exec(condition);
					if(!match) {
						return false;
					}

					const end = matchPair(condition, match[0].length - 1, DIRECTIVE_CONFIG);
					if(!end) {
						return false;
					}

					operands.push(condition.slice(match[0].length, end));
					condition = condition.slice(end + 1);
				}

				// console.log(identifier, operator, operands)

				const value = args[identifier];

				if(types[identifier] === 'version') {
					switch(operator) {
						case '=': {
							result = operands.includes(value);
							break;
						}

						case '!=': {
							result = !operands.includes(value);
							break;
						}

						default: {
							for(const operand of operands) {
								if(compareVersions.compare(value, operand, operator as CompareOperator)) {
									result = true;
									break;
								}
							}

							return false;
						}
					}
				}
				else {
					switch(operator) {
						case '=': {
							result = operands.includes(value);
							break;
						}

						case '!=': {
							result = !operands.includes(value);
							break;
						}

						default: {
							return false;
						}
					}
				}
			}

			if((match = COMMA_REGEX.exec(condition))) {
				condition = condition.slice(match[0].length);
			}
		}

		return result;
	}

	return false;
}
