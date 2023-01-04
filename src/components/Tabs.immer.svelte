<script>
	import { Tab, TabContent, Tabs } from 'carbon-components-svelte';

	// to import store
</script>

<Tabs>
	<Tab label="Tab label 1" />
	<Tab label="Tab label 2" />
	<Tab label="Tab label 3" />
	<svelte:fragment slot="content">
		<TabContent>Content 1</TabContent>
		<TabContent>Content 2</TabContent>
		<TabContent>Content 3</TabContent>
	</svelte:fragment>
</Tabs>
