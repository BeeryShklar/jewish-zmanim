<script lang="ts">
	import { HebrewCalendar, Location, Locale, greg, HDate } from '@hebcal/core'
	import { lang } from '../store'
	import { timeToString } from '../helpers/time'

	export let date: Date
	export let latitude: number
	export let longitude: number

	$: yearCandleLightingEvents = HebrewCalendar.calendar({
		year: date.getFullYear(),
		isHebrewYear: false,
		location: new Location(latitude, longitude, true, 'Asia/Jerusalem'),
		candlelighting: true,
		noSpecialShabbat: true,
		noHolidays: true,
	})

	$: weekCandleLightingEvents = yearCandleLightingEvents.filter(event => {
		const eventDate = event.getDate()

		const jewishDate = new HDate(date)
		// const monthIsSame = eventDate.getMonth() === jewishDate.getMonth()

		const firstSaturday = jewishDate.onOrAfter(6)
		const firstFriday = jewishDate.onOrAfter(5)

		const weekEquals =
			firstFriday.isSameDate(eventDate) || firstSaturday.isSameDate(eventDate)
		return weekEquals
	})
	$: console.log(weekCandleLightingEvents.map(event => event.getFlags()))
</script>

<section
	class="week-zmanim text-center text-light container-sm d-flex flex-wrap column align-items-center justify-content-around"
>
	{#each weekCandleLightingEvents as event}
		<p class="zman m-2 mt-0 mb-0 fs-2 fw-light text-light">
			<span class="fw-light text-primary m-0">
				{Locale.hebrewStripNikkud(event.renderBrief($lang))}</span
			>{event.eventTime ? `: ${timeToString(event.eventTime)}` : ''}
		</p>
	{/each}
</section>
