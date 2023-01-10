<script lang="ts">
	import {currentSurveyService} from "../machines/current-survey.machine";

	let id: number = 0;

	currentSurveyService.onTransition(state => id = state.context.currentQuestion.id);
</script>

Question preview
{#if id}
	{id}
{/if}
