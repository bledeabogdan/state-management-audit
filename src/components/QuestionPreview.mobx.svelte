<script lang="ts">
	import { autorun } from 'mobx';
	import { store } from '../stores/mobx/current-survey-mobx-class.store';
	import type { CurrentQuestionData } from 'src/stores/types';
	import { onDestroy } from 'svelte';

	let currentQuestion: CurrentQuestionData = {
		id: 0,
		responses: []
	};

	const disposer = autorun(() => {
		currentQuestion = { ...store.currentQuestion };
	});

	onDestroy(disposer);
</script>

{#if currentQuestion.id}
	{currentQuestion.id}
{/if}
