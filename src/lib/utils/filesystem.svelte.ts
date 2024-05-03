import { imageExtension } from './image.svelte';

class UniversalFile {
	constructor(name: string, getBuffer: () => Promise<Uint8Array>) {
		this.name = name;
		this.getBuffer = getBuffer;
	}
	readonly name;
	readonly getBuffer;
	get buffer(): Promise<Uint8Array> {
		return this.getBuffer();
	}
	get blob(): Promise<string> {
		return (async () => URL.createObjectURL(new Blob([await this.buffer])))();
	}
}

class UniversalDirectory {
	constructor(name: string, getChildren: () => Promise<(UniversalFile | UniversalDirectory)[]>) {
		this.name = name;
		this.getChildren = getChildren;
	}
	readonly name;
	readonly getChildren;
	get children() {
		return (async () =>
			(await this.getChildren()).filter((v) => {
				return (
					v instanceof UniversalDirectory || imageExtension.includes(v.name.split('.').at(-1) ?? '')
				);
			}))();
	}
}

/**
 * Creates a local file system adapter for the given directory.
 * @param directory - The directory handle representing the root directory.
 * @returns A promise that resolves to a UniversalDirectory object representing the root directory and its contents.
 */
async function LocalFileSystemAdapter(directory: FileSystemDirectoryHandle) {
	async function listFiles(directory: FileSystemDirectoryHandle) {
		const files: (UniversalFile | UniversalDirectory)[] = [];
		for await (const entry of directory.values()) {
			if (entry.kind === 'file') {
				files.push(
					new UniversalFile(
						entry.name,
						async () => new Uint8Array(await (await entry.getFile()).arrayBuffer())
					)
				);
			} else if (entry.kind === 'directory') {
				files.push(new UniversalDirectory(entry.name, async () => await listFiles(entry)));
			}
		}
		return files;
	}
	return new UniversalDirectory(directory.name, async () => await listFiles(directory));
}

async function findByPath(
	root: UniversalDirectory,
	path: string
): Promise<UniversalFile | UniversalDirectory> {
	function findItem(array: Array<UniversalFile | UniversalDirectory>, name: string) {
		return array.find((item) => item.name === name);
	}
	console.log('Root', root);
	const parts = path.split('/').filter((part) => part !== '');
	let current: UniversalFile | UniversalDirectory = root;
	for (const part of parts) {
		const isLast = part === parts[parts.length - 1];
		const children = await (current as UniversalDirectory).children;
		const item = findItem(children, part);
		if (!isLast && item instanceof UniversalFile) {
			throw new Error('Invalid path');
		} else {
			current = item!;
		}
	}
	console.log(current);
	return current;
}

export { UniversalFile, UniversalDirectory, LocalFileSystemAdapter, findByPath };
