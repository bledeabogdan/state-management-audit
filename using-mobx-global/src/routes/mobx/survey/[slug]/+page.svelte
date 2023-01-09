<script lang="ts">
	import type { PageData } from './$types';
	import { Grid, Row, Column, Button, TileGroup, RadioTile } from 'carbon-components-svelte';
	import { onDestroy, onMount } from 'svelte';
	import { appStore } from '../../../../stores/mobx/global.store';
	import QuestionPreview from '../../../../components/QuestionPreview.mobx-global.svelte';
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
		questions = appStore.currentSurveyStore.questions.map((x) => x);
		currentQuestion = { ...appStore.currentQuestionStore };
	});

	const { id } = data;

	onMount(() => {
		appStore.currentSurveyStore.setCurrentSurvey(id);

		return () => {
			appStore.currentSurveyStore.clearCurrentSurvey();
		};
	});

	function handleQuestionAdd() {
		const id = Math.random();

		appStore.currentSurveyStore.addQuestion({
			id,
			mainCaption: `Caption${id}`,
			shortcut: `Shortcut${id}`
		});
	}

	function handleQuestionClick(question: any) {
		appStore.currentQuestionStore.setCurrentQuestion(question.id);
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
