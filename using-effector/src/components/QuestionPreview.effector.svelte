<script>
import {currentSurvey} from "../stores/effector/current-survey.store";
</script>

{#if $currentSurvey.currentQuestion.id}
	{$currentSurvey.currentQuestion.id}
{/if}
