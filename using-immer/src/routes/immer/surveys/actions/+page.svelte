<script lang="ts">
	import { DataTable, Button, Toolbar, ToolbarContent } from 'carbon-components-svelte';
	import { store } from '../../../../stores/immer/surveys-immer-actions.store';

	const { actions } = store;

	function handleSurveyAdd() {
		const id = Math.random();
		actions.addSurvey({ id, name: `Name${id}` });
	}

	function handleSurveyDelete(id: number) {
		actions.deleteSurvey(id);
	}
</script>

<DataTable
	title="Surveys"
	headers={[
		{ key: 'name', value: 'Name' },
		{ key: 'actions', value: 'Actions' }
	]}
	rows={$store.map((survey) => ({ id: survey.id, name: survey.name }))}
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
			<Button kind="ghost" size="small" href="/immer/survey/{row.id}">Open</Button>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
