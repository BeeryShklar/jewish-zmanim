<script lang="ts">
	export let name = ''
	export let value: string | number = ''
	export let setValue = (_: any) => null
	export let options = []
	export let props = {}
	export let optionProps = {}

	$: setValue(value)
</script>

<select {...props} {name} bind:value>
	{#each options as [id, description]}
		<option {...optionProps} value={id}>{description}</option>
	{/each}
</select>
