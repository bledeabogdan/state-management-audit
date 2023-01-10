<script lang="ts">
	import { DataTable, Button, Toolbar, ToolbarContent } from 'carbon-components-svelte';
	import {useMachine} from "@xstate/svelte";
	import { surveysMachine } from '../../../machines/surveys.machine';
	import type { SurveyData } from 'src/machines/types';

	const {state, send} = useMachine(surveysMachine);

    function handleSurveyAdd(){
        const id = Math.random();

        send("NEW_SURVEY", {value: {
            id,
            name: `Name${id}`
        }})
    }

    function handleSurveyDelete(id: number){
        console.log("delete: %d", id);
    }

	$: surveys = $state.context.surveys.map((survey: SurveyData) => ({ id: survey.id, name: survey.name }));
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
