<script lang="ts">
    import { type Template } from "./Template";
    export let templates: Template[];
    export let selectedIndex = 0;
    export let onApply: (Template) => void;
</script>

<style>

</style>

<select bind:value={selectedIndex} on:change={() => onApply(templates[selectedIndex])}>
    {#each templates as template, index}
        <option value={index}>
            {template.title}
        </option>
    {/each}
</select>