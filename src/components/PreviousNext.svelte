<script lang="ts">
	export let onChange = (_: number) => null
	export let props = {}
</script>

<div class="previous-next">
	<button {...props} on:click={() => onChange(-1)}>
		<span>&blacktriangleright</span>
	</button>
	<slot />
	<button {...props} on:click={() => onChange(1)}>
		<span>&blacktriangleleft;</span>
	</button>
</div>
