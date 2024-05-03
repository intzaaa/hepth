<script lang="ts">
	import { page } from '$app/stores';
	import { UniversalDirectory, UniversalFile } from '$lib/utils/filesystem.svelte';
	import BaseCard from './BaseCard.svelte';
	const {
		directory,
		...restProps
	}: {
		directory: UniversalDirectory;
	} = $props();
	const name = directory.name;
	let children: (UniversalDirectory | UniversalFile)[] | undefined = $state();
	function setChildren(value: (UniversalDirectory | UniversalFile)[]) {
		children = value;
	}
	$effect(() => {
		directory.children.then((value) => {
			setChildren(value);
		});
	});
</script>

<BaseCard
	title={name}
	description={children?.length + ' items'}
	href={new URL($page.url.pathname + `/${name}`, $page.url)}
	{...restProps}
></BaseCard>

<style lang="postcss">
</style>
