<script lang="ts">
	import { autorun } from 'mobx';
	import { store } from '../stores/mobx/current-survey-mobx-class.store';
	import { onDestroy } from 'svelte';

	let id : number = 0;

	const disposer = autorun(() => {
		id = store.currentQuestion.id;
	});

	onDestroy(disposer);
</script>

{#if id}
	{id}
{/if}
