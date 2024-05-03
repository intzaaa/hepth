<script lang="ts">
	import { goto } from '$app/navigation';
	import { LocalFileSystemAdapter } from '$lib/utils/filesystem.svelte';
	import { store } from '$lib/utils/store.svelte';
	async function selectDirectory() {
		try {
			store.localFileSystemDirectory = await window.showDirectoryPicker({ mode: 'read' });
			store.universalDirectory = await LocalFileSystemAdapter(store.localFileSystemDirectory);
			goto('/view');
		} catch (error) {
			throw error;
		}
	}
</script>

<div class="content">
	<div class="mdui-prose">
		<h1>Hepth</h1>
		<mdui-button role="button" tabindex="0" onkeydown={() => {}} onclick={selectDirectory}>
			Select Folder
		</mdui-button>
	</div>
</div>

<style lang="postcss">
	.content {
		@apply flex h-full w-full flex-col items-center justify-center text-center;
	}
	h1 {
		font-stretch: 150%;
		font-variation-settings:
			'YTDE' -250,
			'YOPQ' 25;
		@apply text-6xl font-semibold;
	}
</style>
