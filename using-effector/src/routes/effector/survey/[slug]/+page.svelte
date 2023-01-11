<script lang="ts">
	import type { PageData } from './$types';
	import { Grid, Row, Column, Button, TileGroup, RadioTile } from 'carbon-components-svelte';
	import { onMount } from 'svelte';
	import {currentSurvey, currentSurveyApi} from "../../../../stores/effector/current-survey.store";
	import QuestionPreview from '../../../../components/QuestionPreview.effector.svelte';
	import Tabs from '../../../../components/Tabs.effector.svelte';

	export let data: PageData;

	const { id } = data;

	onMount(() => {
		return () => {
			currentSurveyApi.clear()
		};
	});

	function handleQuestionAdd() {
		const id = Math.random();
		const question = {
				id,
				mainCaption: `Caption${id}`,
				shortcut: `Shortcut${id}`
			};

		currentSurveyApi.addQuestion(question);
	}

	function handleQuestionClick(id: number) {
		currentSurveyApi.setCurrentQuestion(id);
	}
</script>

<Grid fullWidth>
	<Row>
		<Column>
			<Button on:click={handleQuestionAdd}>Add question</Button>
			<TileGroup legend="Questions">
				{#each $currentSurvey.questions as question (question.id)}
					<RadioTile value={question.id.toString()} on:click={() => handleQuestionClick(question.id)}>
						{question.mainCaption}
					</RadioTile>
				{/each}
			</TileGroup>
		</Column>
		<Column>
			<QuestionPreview />
		</Column>
	</Row>
	{#if $currentSurvey.currentQuestion.id}
		<Row>
			<Column><Tabs /></Column>
		</Row>
	{/if}
</Grid>
