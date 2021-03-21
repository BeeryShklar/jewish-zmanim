<script lang="ts">
	import Geolocation from 'svelte-geolocation'
	import Header from './components/Header.svelte'
	import Main from './components/Main.svelte'
	import DateZmanim from './components/DateZmanim.svelte'
	import { date, coords } from './store'

	import './style/style.scss'
	import WeekZmanim from './components/WeekZmanim.svelte'

	let notSupported = false
</script>

<Geolocation getPosition bind:coords={$coords} bind:notSupported />

<Header bind:date={$date} />

<Main bind:date={$date} />
{#if notSupported}
	<p class="text-light">Not Supported</p>
{/if}

<DateZmanim date={$date} longitude={$coords[0]} latitude={$coords[1]} />

<WeekZmanim date={$date} longitude={$coords[0]} latitude={$coords[1]} />
