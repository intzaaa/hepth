<script lang="ts">
	import { page } from '$app/stores';
	import { UniversalDirectory, UniversalFile } from '$lib/utils/filesystem.svelte';
	const {
		directory
	}: {
		directory: UniversalDirectory;
	} = $props();
	const name = directory.name;
</script>

<mdui-card clickable href={new URL($page.url.pathname + `/${name}`, $page.url)}>
	<div>{name}</div>
</mdui-card>

<style lang="postcss">
	mdui-card {
		@apply aspect-[3/2] h-auto w-auto;
	}
</style>
