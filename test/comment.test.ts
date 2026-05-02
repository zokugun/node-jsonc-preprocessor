import path from 'path';
import fse from '@zokugun/fs-extra-plus/sync';
import { globbySync } from 'globby';
import { expect, it } from 'vitest';
import yaml from 'yaml';
import { comment } from '../src/index.js';

function prepare(file: string) {
	const name = path.basename(file).slice(0, path.basename(file).lastIndexOf('.'));

	const content = fse.readFile(file, 'utf8');
	expect(content.fails).to.be.false;

	const data = yaml.parse(content.value!) as { input: string; output: string };

	it(`${name}`, () => {
		const result = comment(data.input);

		expect(result).to.eql(data.output);
	});
}

const files = globbySync('test/fixtures/comment/*.yml');

for(const file of files) {
	prepare(file);
}
