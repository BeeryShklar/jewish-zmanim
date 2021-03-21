<script lang="ts">
	import { getDaysInMonth, getGregMonths } from '../helpers/gregDate'
	import {
		convertToHebrew,
		getGregDate,
		getJewishDate,
		getJewishMonth,
		getJewishMonths,
		getJewishYears,
	} from '../helpers/jewishDatesCore'
	import Select from './Select.svelte'

	export let date: Date = new Date(Date.now())
	$: jDate = getJewishDate(date)
	export let jewish = false
	export let isHebrew = true
	export let classes = ''

	const props = {
		class: 'form-select col w-auto bg-transparent border-0 text-dark',
	}
	const optionProps = { class: 'bg-dark text-light' }

	let days = []
	let months = []
	let years = []

	$: if (jewish) {
		days = getJewishMonth(date)
			.days.filter(day => day.isCurrentMonth)
			.map(({ day }) => [
				day,
				isHebrew ? convertToHebrew(day, true, false) : day,
			])

		months = getJewishMonths(jDate.year, isHebrew).map(month => [
			month.id,
			month.text,
		])

		years = getJewishYears(jDate.year).map(year => [
			year,
			isHebrew ? convertToHebrew(year, true, false).slice(1) : year,
		])
	} else {
		years = []
		const currentYear = date.getFullYear()
		for (let i = currentYear - 100; i <= currentYear + 100; i++) {
			years.push([i, i])
		}

		days = []
		const numOfDays = getDaysInMonth(date.getMonth(), date.getFullYear())

		for (let i = 1; i <= numOfDays; i++) {
			days.push([i, i])
		}
	}

	// SETTERS
	function set(field: 'day' | 'month' | 'year', value: any) {
		if (jewish) {
			switch (field) {
				case 'day':
					jDate.day = value
					break
				case 'month':
					jDate.monthName = value
					break
				case 'year':
					jDate.year = value
					break
			}
			date = getGregDate(jDate)
		} else {
			switch (field) {
				case 'day':
					date.setDate(value)
					break
				case 'month':
					date.setMonth(value)
					break
				case 'year':
					date.setFullYear(value)
					break
			}
		}
	}
	const setDay = (day: number) => set('day', day)
	const setMonth = (month: string) => set('month', month)
	const setYear = (year: number) => set('year', year)
</script>

<form action="#" class="row align-items-center {classes}">
	<Select
		name="day"
		value={jewish ? jDate.day : date.getDate()}
		setValue={setDay}
		options={days}
		{props}
		{optionProps}
	/>
	<Select
		name="month"
		value={jewish ? jDate.monthName : date.getMonth()}
		setValue={setMonth}
		options={jewish
			? months
			: getGregMonths(isHebrew).map((month, index) => [index, month])}
		{props}
		{optionProps}
	/>
	<Select
		name="year"
		value={jewish ? jDate.year : date.getFullYear()}
		setValue={setYear}
		options={years}
		{props}
		{optionProps}
	/>
</form>
