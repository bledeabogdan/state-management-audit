<script lang="ts">
	import type { PageData } from './$types';
	import { Grid, Row, Column, Button, TileGroup, RadioTile } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import { store } from '../../../../stores/immer/current-survey-immer-reducer.store';
	import QuestionPreview from '../../../../components/QuestionPreview.immer.svelte';
	import Tabs from '../../../../components/Tabs.immer.svelte';

	export let data: PageData;

	const { dispatch } = store;

	const { id } = data;

	onMount(() => {
		dispatch({
			type: 'SET_CURRENT_SURVEY',
			payload: id
		});

		return () => {
			dispatch({ type: 'CLEAR_CURRENT_SURVEY' });
		};
	});

	function handleQuestionAdd() {
		const id = Math.random();

		dispatch({
			type: 'ADD_QUESTION',
			payload: {
				id,
				mainCaption: `Caption${id}`,
				shortcut: `Shortcut${id}`
			}
		});
	}

	function handleQuestionClick(question: any) {
		dispatch({
			type: 'SET_CURRENT_QUESTION',
			payload: question.id
		});
	}
</script>

<Grid fullWidth>
	<Row>
		<Column>
			<Button on:click={handleQuestionAdd}>Add question</Button>
			<TileGroup legend="Questions">
				{#each $store.questions as question (question.id)}
					<RadioTile value={question.id} on:click={() => handleQuestionClick(question)}>
						{question.mainCaption}
					</RadioTile>
				{/each}
			</TileGroup>
		</Column>
		<Column>
			<QuestionPreview />
		</Column>
	</Row>
	{#if $store.currentQuestion.id}
		<Row>
			<Column><Tabs /></Column>
		</Row>
	{/if}
</Grid>
