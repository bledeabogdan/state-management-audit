<script>
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody,
		Button
	} from 'carbon-components-svelte';
	import { store } from '../stores/immer/current-survey-immer-reducer.store';

	const { dispatch } = store;

	function handleAddResponse() {
		const id = Math.random();

		dispatch({
			type: 'ADD_RESPONSE',
			payload: {
				id,
				questionId: $store.currentQuestion.id,
				mainCaption: `Response-Caption${id}`
			}
		});
	}
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
		{#each $store.currentQuestion.responses as response (response.id)}
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
