<script lang="ts">
	import type { UniversalFile } from '$lib/utils/filesystem.svelte';

	const {
		file
	}: {
		file: UniversalFile;
	} = $props();

	let image: HTMLImageElement | undefined = $state();
	let ratio = $state(3 / 2);
</script>

<mdui-card>
	{#await file.blob then blob}
		<img
			alt={file.name}
			onload={() => {
				ratio = image!.naturalWidth / image!.naturalHeight;
				console.log(ratio);
			}}
			src={blob}
			bind:this={image}
		/>
	{/await}
</mdui-card>

<style lang="postcss">
	mdui-card {
		@apply aspect-[3/2] h-auto w-auto;
	}
	img {
		@apply h-full w-full object-cover;
	}
</style>
