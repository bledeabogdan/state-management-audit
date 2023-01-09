<script lang="ts">
	import { DataTable, Button, Toolbar, ToolbarContent } from 'carbon-components-svelte';
	import { autorun } from 'mobx';
	import type { SurveysState } from 'src/stores/types';
	import { onDestroy } from 'svelte';
	import { appStore } from '../../../stores/mobx/global.store';

	let surveys: SurveysState = [];

	function handleSurveyAdd() {
		const id = Math.random();
		appStore.surveysStore.addSurvey({ id, name: `Survey${id}` });
	}

	function handleSurveyDelete(id: number) {
		appStore.surveysStore.deleteSurvey(id);
	}

	const disposer = autorun(() => {
		surveys = appStore.surveysStore.surveys.map((x) => x);
	});

	onDestroy(disposer);
</script>

<DataTable
	title="Surveys"
	headers={[
		{ key: 'name', value: 'Name' },
		{ key: 'actions', value: 'Actions' }
	]}
	rows={surveys.map((survey) => ({ id: survey.id, name: survey.name }))}
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
			<Button kind="ghost" size="small" href="/mobx/survey/global/{row.id}">Open</Button>
		{:else}
			{cell.value}
		{/if}
	</svelte:fragment>
</DataTable>
