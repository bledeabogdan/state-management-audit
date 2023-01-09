<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		HeaderNavMenu,
		Content
	} from 'carbon-components-svelte';

	let isSideNavOpen = false;
</script>

<Header platformName="State management audit" bind:isSideNavOpen href="/">
	<HeaderNav>
		<HeaderNavItem text="Mobx Global" href="/mobx/surveys" />
	</HeaderNav>
</Header>

<Content>
	<slot />
</Content>
