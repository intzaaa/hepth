<script lang="ts">
	import { onDestroy } from 'svelte';

	const {
		title,
		description,
		href,
		image,
		children,
		...restProps
	}: {
		title: string;
		description?: string;
		href?: string | URL;
		image?: string;
		children?: any;
	} = $props();
	onDestroy(() => {
		if (image !== undefined) {
			URL.revokeObjectURL(image);
			console.log('revokeObjectURL', title, image);
		}
	});
</script>

<mdui-card clickable {href} {...restProps}>
	{#if image}
		<img src={image} alt={title} />
	{/if}
	<div class="info mdui-prose">
		<h1 class="title">{title}</h1>
		<p class="description">{description}</p>
	</div>
</mdui-card>

<style lang="postcss">
	mdui-card {
		@apply relative flex h-full w-full flex-col-reverse;
	}
	.info {
		@apply absolute bottom-0 z-10 pb-2 pl-[1.25%];
	}
	h1 {
		@apply m-1 text-5xl text-opacity-15;
	}
	img {
		@apply h-full w-full object-cover;
	}
</style>
