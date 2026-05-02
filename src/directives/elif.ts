import { type State, StateType } from '../types/state.js';

export function elif(condition: boolean, input: string[], line: number, output: string[], stack: State[]): number {
	output.push(input[line]);

	for(const [i, { type, value }] of stack.entries()) {
		if(type === StateType.ELSE_IF) {
			if(value) {
				condition = false;
			}
		}
		else if(type === StateType.IF) {
			// eslint-disable-next-line unicorn/no-lonely-if
			if(value || !stack[i + 1].value) {
				condition = false;
			}
		}
	}

	stack.unshift({
		type: StateType.ELSE_IF,
		value: condition,
		indent: stack[0].indent,
		rewrite: stack[0].rewrite,
	});

	return line + 1;
}

elif.isConditional = true;
