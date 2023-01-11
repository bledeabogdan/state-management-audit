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
		<HeaderNavMenu text="Effector" >
			<HeaderNavItem href="/effector/surveys" text="W/O Api" />
			<HeaderNavItem href="/effector/surveys/api" text="Api" />
		</HeaderNavMenu>
	</HeaderNav>
</Header>

<Content>
	<slot />
</Content>
