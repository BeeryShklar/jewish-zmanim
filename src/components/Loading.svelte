<script>
	export let size = 60
	export let unit = 'px'
	export let colorOuter = ''
	export let colorCenter = ''
	export let colorInner = ''
	export let durationMultiplier = 1
	export let durationOuter = `${durationMultiplier * 2}s`
	export let durationInner = `${durationMultiplier * 1.5}s`
	export let durationCenter = `${durationMultiplier * 3}s`
</script>

<div
	class="circle"
	style="--size: {size}{unit}; --colorInner: {colorInner}; --colorCenter: {colorCenter}; --colorOuter: {colorOuter}; --durationInner: {durationInner}; --durationCenter: {durationCenter}; --durationOuter: {durationOuter};"
/>
