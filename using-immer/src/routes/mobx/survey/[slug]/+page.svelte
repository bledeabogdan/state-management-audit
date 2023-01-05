<script lang="ts">
	import type { PageData } from './$types';
	import { Grid, Row, Column, Button, TileGroup, RadioTile } from 'carbon-components-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { store } from '../../../../stores/mobx/current-survey-mobx-class.store';
	import QuestionPreview from '../../../../components/QuestionPreview.mobx.svelte';
	import Tabs from '../../../../components/Tabs.mobx.svelte';
	import { autorun } from 'mobx';
	import type { CurrentQuestionData, QuestionsState } from 'src/stores/types';

	export let data: PageData;
	let questions: QuestionsState = [];
	let currentQuestion: CurrentQuestionData = {
		id: 0,
		responses: []
	};

	const disposer = autorun(() => {
		questions = store.questions.map((x) => x);
		currentQuestion = { ...store.currentQuestion };
	});

	const { id } = data;

	onMount(() => {
		store.setCurrentSurvey(id);

		return () => {
			store.clearCurrentSurvey();
		};
	});

	function handleQuestionAdd() {
		const id = Math.random();

		store.addQuestion({
			id,
			mainCaption: `Caption${id}`,
			shortcut: `Shortcut${id}`
		});
	}

	function handleQuestionClick(question: any) {
		store.currentQuestion.setCurrentQuestion(question.id);
	}

	onDestroy(disposer);
</script>

<Grid fullWidth>
	<Row>
		<Column>
			<Button on:click={handleQuestionAdd}>Add question</Button>
			<TileGroup legend="Questions">
				{#each questions as question (question.id)}
					<RadioTile value={question.id.toString()} on:click={() => handleQuestionClick(question)}>
						{question.mainCaption}
					</RadioTile>
				{/each}
			</TileGroup>
		</Column>
		<Column>
			<QuestionPreview />
		</Column>
	</Row>
	{#if currentQuestion.id}
		<Row>
			<Column><Tabs /></Column>
		</Row>
	{/if}
</Grid>
