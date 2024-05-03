<script lang="ts">
	const { data } = $props();
	import ImageCard from '$lib/components/ImageCard.svelte';
	import { UniversalDirectory, UniversalFile, findByPath } from '$lib/utils/filesystem.svelte';
	import { store } from '$lib/utils/store.svelte';
	import FolderCard from '$lib/components/FolderCard.svelte';
	let currentDirectoryOrFile: UniversalDirectory | UniversalFile | undefined = $state();
	function setCurrentDirectoryOrFile(directoryOrFile: UniversalDirectory | UniversalFile) {
		currentDirectoryOrFile = directoryOrFile;
	}
	$effect(() => {
		if (store.universalDirectory instanceof UniversalDirectory)
			findByPath(store.universalDirectory, data.path).then(setCurrentDirectoryOrFile);
	});
	$inspect(data, currentDirectoryOrFile);
</script>

{#if currentDirectoryOrFile !== undefined}
	{#if currentDirectoryOrFile instanceof UniversalDirectory}
		{#await currentDirectoryOrFile.children then children}
			{#each children as item}
				{#if item instanceof UniversalFile}
					<ImageCard file={item} />
				{:else if item instanceof UniversalDirectory}
					<FolderCard directory={item} />
				{/if}
			{/each}
		{/await}
	{/if}
{/if}
