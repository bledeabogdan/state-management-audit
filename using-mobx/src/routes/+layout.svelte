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
		<HeaderNavMenu text="Mobx">
			<HeaderNavItem href="/mobx/surveys/class" text="Class" />
			<HeaderNavItem href="/mobx/surveys/factory" text="Factory" />
		</HeaderNavMenu>
	</HeaderNav>
</Header>

<Content>
	<slot />
</Content>
