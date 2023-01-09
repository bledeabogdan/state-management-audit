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
	import type { CurrentQuestionData } from '../stores/types';
	import { onDestroy } from 'svelte';
	import { appStore } from '../stores/mobx/global.store';

	let currentQuestion: CurrentQuestionData = {
		id: 0,
		responses: []
	};

	const disposer = autorun(() => {
		currentQuestion = {...appStore.currentQuestionStore};
	});

	function handleAddResponse() {
		const id = Math.random();

		appStore.currentQuestionStore.addResponse({
			id,
			questionId: currentQuestion.id,
			mainCaption: `Response-Caption${id}`
		});
	}

	onDestroy(disposer);


	$: console.log(currentQuestion.responses)
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
