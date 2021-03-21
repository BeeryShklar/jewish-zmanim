<script lang="ts">
	import { Zmanim } from '@hebcal/core'
	import { lang } from '../store'
	import { isValidDate } from '../helpers/jewishDatesCore'
	import { zmanimDictionary } from '../dictionary/zmanim'
	import { map } from '../helpers/math'
	import Loading from './Loading.svelte'
	import { timeToString } from '../helpers/time'

	export let date
	export let latitude: number = 0
	export let longitude: number = 0

	$: zmanim =
		isValidDate(date) &&
		longitude &&
		latitude &&
		new Zmanim(date, latitude, longitude)
	$: zmanEvents = zmanim && {
		alotHaShachar: zmanim.alotHaShachar(),
		dawn: zmanim.dawn(),
		misheyakir: zmanim.misheyakir(),
		misheyakirMachmir: zmanim.misheyakirMachmir(),
		neitzHaChama: zmanim.neitzHaChama(),
		sofZmanShma: zmanim.sofZmanShma(),
		sunrise: zmanim.sunrise(),
		chatzot: zmanim.chatzot(),
		chatzotNight: zmanim.chatzotNight(),
		dusk: zmanim.dusk(),
		gregEve: zmanim.gregEve(),
		minchaGedola: zmanim.minchaGedola(),
		minchaKetana: zmanim.minchaKetana(),
		plagHaMincha: zmanim.plagHaMincha(),
		shkiah: zmanim.shkiah(),
		sofZmanTfilla: zmanim.sofZmanTfilla(),
		sunset: zmanim.sunset(),
		tzeit: zmanim.tzeit(),
	}
</script>

<section
	class="date-zmanim container-sm m-auto text-center d-flex row align-items-center justify-content-center"
>
	{#if zmanEvents && zmanim}
		<div class="zmanim">
			{#each Object.entries(zmanEvents).sort(([_, timeA], [__, timeB]) => timeA - timeB) as [eventName, eventTime]}
				<p class="zman fs-2 fw-light text-light">
					<span
						class="fw-light m-0"
						style="color: hsl({map(
							eventTime.getHours() * 60 + eventTime.getMinutes(),
							0,
							1500,
							0,
							360
						)}, 100%, 85%);"
					>
						{zmanimDictionary[$lang][eventName]}
					</span>
					- {timeToString(eventTime)}
				</p>
			{/each}
			<div class="space" />
		</div>
		<div class="overlay" />
	{:else}
		<Loading />
	{/if}
</section>
