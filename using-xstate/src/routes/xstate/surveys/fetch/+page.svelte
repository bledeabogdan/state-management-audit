<script lang="ts">
	import { DataTable, Button, Toolbar, ToolbarContent } from 'carbon-components-svelte';
	import type { SurveyData } from 'src/machines/types';
	import { onMount } from 'svelte';
	import { surveysService } from '../../../../machines/surveys-fetch.machine';

	let surveys: SurveyData[] = [];

	const {send} = surveysService;

	onMount(() => {
		surveysService.send("FETCH");
	})

	surveysService.onTransition((state) => {
		surveys = state.context.surveys;
	})

    function handleSurveyAdd(){
        const id = Math.random();
		const survey = {
            id,
            name: `Name${id}`
        }

        send("NEW_SURVEY", {survey})
    }

    function handleSurveyDelete(id: number){
        send("DELETE_SURVEY", {surveyId: id});
    }
</script>

<DataTable
	title="Surveys"
	headers={[
		{ key: 'name', value: 'Name' },
		{ key: 'actions', value: 'Actions' }
	]}
	rows={surveys}
>
	<Toolbar>
		<ToolbarContent>
			<Button on:click={handleSurveyAdd}>Add survey</Button>
		</ToolbarContent>
	</Toolbar>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if cell.key === 'actions'}
			<Button kind="danger-tertiary" size="small" on:click={() => handleSurveyDelete(row.id)}>
				Delete
			</Button>
			<Button kind="ghost" size="small" href="/xstate/survey/{row.id}">Open</Button>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
