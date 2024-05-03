<script lang="ts">
	const { data } = $props();
	import ImageCard from '$lib/components/FileImageCard.svelte';
	import { UniversalDirectory, UniversalFile, findByPath } from '$lib/utils/filesystem.svelte';
	import { store } from '$lib/utils/store.svelte';
	import FolderCard from '$lib/components/DirectoryCard.svelte';
	import { throttle } from 'mdui/functions/throttle';
	let content: HTMLElement;
	let rect: DOMRect | undefined = $state();
	function updateRectOnEvent() {
		rect = content!.getBoundingClientRect();
		console.log(rect);
	}
	function ifInViewport(viewport: DOMRect, item: DOMRect, safeDistance = 200) {
		return item.top < viewport.bottom + safeDistance && item.bottom > viewport.top - safeDistance;
	}
	let currentDirectoryOrFile: UniversalDirectory | UniversalFile | undefined = $state();
	function setCurrentDirectoryOrFile(directoryOrFile: UniversalDirectory | UniversalFile) {
		currentDirectoryOrFile = directoryOrFile;
	}
	$effect(() => {
		if (store.universalDirectory instanceof UniversalDirectory)
			findByPath(store.universalDirectory, data.path).then(setCurrentDirectoryOrFile);
	});
</script>

<div
	class="content"
	onload={updateRectOnEvent}
	onscroll={throttle(updateRectOnEvent, 500)}
	bind:this={content}
>
	{#if currentDirectoryOrFile !== undefined}
		{#if currentDirectoryOrFile instanceof UniversalDirectory}
			{#await currentDirectoryOrFile.children then children}
				{#each children as item}
					{@const data:{self: HTMLElement | undefined} = {
						self: undefined
					}}
					<div class="item" bind:this={data.self}>
						{@render card(item, rect && data.self ? ifInViewport(rect!, data.self?.getBoundingClientRect()) : false)}
					</div>
				{/each}
			{/await}
		{/if}
	{/if}
</div>

{#snippet card(item, render)}
	{#if item instanceof UniversalFile}
		<ImageCard file={item} {render} />
	{:else if item instanceof UniversalDirectory}
		<FolderCard directory={item} />
	{/if}
{/snippet}

<style lang="postcss">
	.content {
		@apply h-full w-full overflow-scroll p-4;
	}
	.item {
		@apply h-96 min-h-96 w-64 min-w-64 shrink-0 grow-0;
	}
</style>
