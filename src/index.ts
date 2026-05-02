import { transform as _transform } from './tranform.js';

export function comment(input: string): string {
	return _transform(input, {}, {}, false);
}

export function transform(input: string, types: Record<string, string> = {}, args: Record<string, string> = {}): string {
	return _transform(input, types, args, true);
}
