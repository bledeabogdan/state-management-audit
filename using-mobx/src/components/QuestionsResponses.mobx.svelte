<script lang="ts">
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody,
		Button
	} from 'carbon-components-svelte';
	import { autorun } from 'mobx';
	import type { CurrentQuestionData } from 'src/stores/types';
	import { onDestroy } from 'svelte';
	import { store } from '../stores/mobx/current-survey-mobx-class.store';

	let currentQuestion: CurrentQuestionData = {
		id: 0,
		responses: []
	};

	const disposer = autorun(() => {
		currentQuestion = { ...store.currentQuestion };
	});

	function handleAddResponse() {
		const id = Math.random();

		store.addResponse({
			id,
			questionId: currentQuestion.id,
			mainCaption: `Response-Caption${id}`
		});
	}

	onDestroy(disposer);
</script>

<Button on:click={handleAddResponse}>Add response</Button>
<StructuredList>
	<StructuredListHead>
		<StructuredListRow head>
			<StructuredListCell head>Caption</StructuredListCell>
			<StructuredListCell head>Action</StructuredListCell>
		</StructuredListRow>
	</StructuredListHead>
	<StructuredListBody>
		{#each currentQuestion.responses as response (response.id)}
			<StructuredListRow>
				<StructuredListCell noWrap>{response.mainCaption}</StructuredListCell>
				<StructuredListCell>
					<Button>Some action</Button>
				</StructuredListCell>
			</StructuredListRow>
		{:else}
			No responses
		{/each}
	</StructuredListBody>
</StructuredList>
