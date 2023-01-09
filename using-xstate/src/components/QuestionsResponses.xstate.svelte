<script lang="ts">
	import {
		StructuredList,
		StructuredListHead,
		StructuredListRow,
		StructuredListCell,
		StructuredListBody,
		Button
	} from 'carbon-components-svelte';
	import {currentSurveyMachine} from "../machines/current-survey.machine";
	import {interpret} from "xstate";
	import type { CurrentQuestionData } from 'src/machines/types';

	let question: CurrentQuestionData = {
		id: 0,
		responses: []
	}

	const currentSurveyService = interpret(currentSurveyMachine).onTransition((state) => {
		question = state.context.currentQuestion;
	}).start();

	function handleAddResponse() {
		const id = Math.random();
		const response = {
			id,
			questionId: question.id,
			mainCaption: `Response-Caption${id}`
		};

		currentSurveyService.send("ADD_RESPONSE", {value: response})
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
		{#each question.responses as response (response.id)}
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
