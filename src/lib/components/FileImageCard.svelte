<script lang="ts">
	import type { UniversalFile } from '$lib/utils/filesystem.svelte';
	import BaseCard from './BaseCard.svelte';

	const {
		file,
		render = false,
		...restProps
	}: {
		file: UniversalFile;
		render?: boolean;
	} = $props();
</script>

{#if render}
	{#await file.blob then blob}
		<BaseCard title={file.name} image={blob} {...restProps}></BaseCard>
	{/await}
{:else}
	<BaseCard title={file.name} {...restProps}></BaseCard>
{/if}

<style lang="postcss">
</style>
