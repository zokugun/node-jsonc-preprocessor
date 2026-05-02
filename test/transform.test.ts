import path from 'path';
import fse from '@zokugun/fs-extra-plus/sync';
import { globbySync } from 'globby';
import { expect, it } from 'vitest';
import yaml from 'yaml';
import { transform } from '../src/index.js';

function prepare(file: string) {
	const name = path.basename(file).slice(0, path.basename(file).lastIndexOf('.'));

	const content = fse.readFile(file, 'utf8');
	expect(content.fails).to.be.false;

	const data = yaml.parse(content.value!) as { input: string; output: string; types?: Record<string, string>; args?: Record<string, string> };

	it(`${name}`, () => {
		const result = transform(data.input, data.types, data.args ?? {});

		expect(result).to.eql(data.output);
	});
}

const files = globbySync('test/fixtures/transform/*.yml');

for(const file of files) {
	prepare(file);
}
