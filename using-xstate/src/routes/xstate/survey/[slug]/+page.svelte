<script lang="ts">
	import type { PageData } from './$types';
	import { Grid, Row, Column, Button, TileGroup, RadioTile } from 'carbon-components-svelte';
	import {currentSurveyMachine} from "../../../../machines/current-survey.machine";
	import QuestionPreview from '../../../../components/QuestionPreview.xstate.svelte';
	import Tabs from '../../../../components/Tabs.mobx.svelte';
	import type { CurrentQuestionData, QuestionsState } from 'src/machines/types';
	import { interpret } from 'xstate';
	import { onMount } from 'svelte';

	export let data: PageData;
	let questions: QuestionsState = [];
	let currentQuestion: CurrentQuestionData = {
		id: 0,
		responses: []
	};

	const currentSurveyService = interpret(currentSurveyMachine).onTransition((state) => {
		console.log("survey page on transition", state.context);
		questions = state.context.questions;
		currentQuestion = state.context.currentQuestion;
	}).start();

	const { id } = data;

	onMount(() => {
		currentSurveyService.send("SET_CURRENT_SURVEY", {value: id});
	});

	function handleQuestionAdd() {
		const id = Math.random();
		const question = {
			id,
			mainCaption: `Caption${id}`,
			shortcut: `Shortcut${id}`
		};

		currentSurveyService.send("ADD_QUESTION", {value: question})
	}

	function handleQuestionClick(question: any) {
		currentSurveyService.send("SET_CURRENT_QUESTION", {value: question.id})
	}
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
