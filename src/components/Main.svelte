<script lang="ts">
	import { dictionary } from '../dictionary'
	import { daysDictionary } from '../dictionary/days'

	import {
		convertToHebrew,
		getJewishDate,
		getJewishMonths,
		isValidDate,
	} from '../helpers/jewishDatesCore'
	import { isHebrew, jewish, lang } from '../store'
	import PreviousNext from './PreviousNext.svelte'

	export let date
	$: jewishDate = getJewishDate(date)

	$: gregFormatedDate = date.toLocaleDateString()
	$: jewishFormatedDate = `${
		$isHebrew ? convertToHebrew(jewishDate.day, true, false) : jewishDate.day
	} ${
		getJewishMonths(jewishDate.year, $isHebrew).filter(
			val => val.id === jewishDate.monthName
		)[0].text
	} ${
		$isHebrew ? convertToHebrew(jewishDate.year, true, false) : jewishDate.year
	}`
</script>

<main
	class="bg-dark text-light container-fluid text-center d-flex row align-content-center justify-items-center"
>
	{#if isValidDate(date) && jewishDate?.day}
		<h2 class="display-4 fw-light m-0 lh-1">
			<PreviousNext
				props={{
					class: 'bg-transparent border-0 text-secondary cursor-pointer',
				}}
				onChange={amount => {
					const desiredDate = new Date(date)
					desiredDate.setDate(date.getDate() + amount)
					date = desiredDate
				}}
			>
				{dictionary[$lang].day}{daysDictionary[$lang][date.getDay()]}
			</PreviousNext>
		</h2>
		<h1 class="display-1 fw-bold m-0 mb-3 lh-1">
			{$jewish ? jewishFormatedDate : gregFormatedDate}
		</h1>
		<h3 class="fw-light">
			{!$jewish ? jewishFormatedDate : gregFormatedDate}
		</h3>
	{:else}
		<h1 class="display-1 fw-bold">{dictionary[$lang].dateNotValid}</h1>
	{/if}
</main>
