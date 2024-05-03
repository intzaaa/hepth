import { UniversalDirectory } from './filesystem.svelte';

let localFileSystemDirectory: FileSystemDirectoryHandle | undefined = $state();
let universalDirectory: UniversalDirectory | undefined = $state();

export const store = {
	get localFileSystemDirectory() {
		return localFileSystemDirectory;
	},
	set localFileSystemDirectory(value) {
		localFileSystemDirectory = value;
	},
	get universalDirectory() {
		return universalDirectory;
	},
	set universalDirectory(value) {
		universalDirectory = value;
	}
};
