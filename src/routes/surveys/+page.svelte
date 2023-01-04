<script lang="ts">
	import { store, storeReducer } from '../../stores/surveys.immer.store';

	const { actions } = store;
	const { dispatch } = storeReducer;

	function handleClick() {
		const id = Math.random();
		actions.addSurvey({ id, name: `Name${id}` });
	}

	function handleSurveyDelete(id: number) {
		actions.deleteSurvey(id);
	}

	function handleReducerClick() {
		const id = Math.random();
		dispatch({ type: 'ADD_SURVEY', payload: { id, name: `Name${id}` } });
	}

	function handleSurveyReducerDelete(id: number) {
		dispatch({ type: 'DELETE_SURVEY', payload: id });
	}

	$: console.log($storeReducer);
</script>

<button on:click={handleClick}>Add survey</button>
<button on:click={handleReducerClick}>Add reducer survey</button>

<div>
	{#each $store as survey (survey.id)}
		{survey.id}: {survey.name}
		<button on:click={() => handleSurveyDelete(survey.id)}>Delete</button>
	{:else}
		No sruveys
	{/each}
</div>

<div>
	{#each $storeReducer as survey (survey.id)}
		{survey.id}: {survey.name}
		<button on:click={() => handleSurveyReducerDelete(survey.id)}>Delete</button>
	{:else}
		No sruveys
	{/each}
</div>
