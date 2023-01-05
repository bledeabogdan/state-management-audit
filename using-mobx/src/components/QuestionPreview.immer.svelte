<script>
	import { store } from '../stores/immer/current-survey-immer-reducer.store';
</script>

{#if $store.currentQuestion.id}
	{$store.currentQuestion.id}
{/if}
