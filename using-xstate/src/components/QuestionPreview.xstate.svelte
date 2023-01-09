<script lang="ts">
	import {currentSurveyMachine} from "../machines/current-survey.machine";
	import { useMachine } from '@xstate/svelte';

	const {state} = useMachine(currentSurveyMachine);
</script>

Question preview
{#if $state.context.id}
	{$state.context.id}
{/if}
