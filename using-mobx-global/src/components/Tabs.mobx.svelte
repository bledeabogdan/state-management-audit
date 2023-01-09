<script>
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';
	import QuestionsResponses from './QuestionsResponses.mobx.svelte';
</script>

<Tabs>
	<Tab label="Responses" />
	<Tab label="Routings" />
	<svelte:fragment slot="content">
		<TabContent><QuestionsResponses /></TabContent>
		<TabContent>Routings</TabContent>
	</svelte:fragment>
</Tabs>
