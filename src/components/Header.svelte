<script lang="ts">
	import DatePicker from './DatePicker.svelte'
	import { dictionary } from '../dictionary'
	import { lang, isHebrew } from '../store'

	export let date: Date = new Date(Date.now())
</script>

<header class="navbar p-2 navbar-expand-lg navbar-dark bg-primary text-light">
	<div class="container-fluid">
		<DatePicker bind:date jewish isHebrew={$isHebrew} />

		<button class="btn" on:click={() => (date = new Date(Date.now()))}>
			{dictionary[$lang].today}
		</button>

		<!-- setDate={newDate => (date = newDate)} -->
		<DatePicker bind:date isHebrew={$isHebrew} />
	</div>
</header>
