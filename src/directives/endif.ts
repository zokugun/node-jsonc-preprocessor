import { type State, StateType } from '../types/state.js';

export function endif(condition: boolean, input: string[], line: number, output: string[], stack: State[]): number {
	output.push(input[line]);

	if(stack[0].type === StateType.ELSE) {
		stack.shift();
	}

	while(stack[0].type === StateType.ELSE_IF) {
		stack.shift();
	}

	if(stack[0].type === StateType.IF) {
		stack.shift();
	}

	return line + 1;
}
