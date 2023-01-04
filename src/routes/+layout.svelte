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
		<HeaderNavMenu text="Immer">
			<HeaderNavItem href="/immer/surveys/reducers" text="Reducers" />
			<HeaderNavItem href="/immer/surveys/actions" text="Actions" />
		</HeaderNavMenu>
	</HeaderNav>
</Header>

<Content>
	<slot />
</Content>
