<script lang="ts">
	import { DataTable, Button, Toolbar, ToolbarContent } from 'carbon-components-svelte';
	import {surveys, addSurvey, deleteSurvey, clear} from "../../../stores/effector/surveys.store";

	function handleSurveyAdd() {
		const id = Math.random();
		addSurvey({ id, name: `Name${id}` });
	}

	function handleSurveyDelete(id: number) {
		deleteSurvey(id);
	}

	function handleClear() {
		clear();
	}

	$: allSurveys = $surveys;
</script>

<DataTable
	title="Surveys"
	headers={[
		{ key: 'name', value: 'Name' },
		{ key: 'actions', value: 'Actions' }
	]}
	rows={allSurveys.map((survey) => ({ id: survey.id, name: survey.name }))}
>
	<Toolbar>
		<ToolbarContent>
			<Button kind="danger-tertiary" on:click={handleClear}>
				Clear
			</Button>
			<Button on:click={handleSurveyAdd}>Add survey</Button>
		</ToolbarContent>
	</Toolbar>
	<svelte:fragment slot="cell" let:cell let:row>
		{#if cell.key === 'actions'}
			<Button kind="danger-tertiary" size="small" on:click={() => handleSurveyDelete(row.id)}>
				Delete
			</Button>
			<Button kind="ghost" size="small" href="/effector/survey/{row.id}">Open</Button>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
