<script lang="ts">
	import 'carbon-components-svelte/css/all.css';
	import {
		Header,
		HeaderNav,
		HeaderNavItem,
		Content,
		HeaderNavMenu
	} from 'carbon-components-svelte';

	let isSideNavOpen = false;
</script>

<Header platformName="State management audit" bind:isSideNavOpen href="/">
	<HeaderNav>
		<HeaderNavMenu text="Xstate">
			<HeaderNavItem href="/xstate/surveys" text="Surveys" />
			<HeaderNavItem href="/xstate/surveys/fetch" text="Fetch" />
		</HeaderNavMenu>
	</HeaderNav>
</Header>

<Content>
	<slot />
</Content>
