<script lang="ts">
	import { autorun } from 'mobx';
	import { appStore } from '../stores/mobx/global.store';
	import { onDestroy } from 'svelte';

	let id: number;

	const disposer = autorun(() => {
		id = appStore.currentQuestionStore.id;
	});

	onDestroy(disposer);
</script>

{#if id}
  {id}
{/if}
