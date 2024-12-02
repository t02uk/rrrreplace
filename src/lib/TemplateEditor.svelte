<script lang="ts">
    import { TemplateRepository, type Template } from "./Template";

    export let templates: Template[] = [];

    function handleAdd() {
        templates = [...templates, {
            title: "",
            search: "",
            replace: ""
        }];
    }

    function handleDelete(index) {
        templates.splice(index, 1)
        templates = templates;
    } 

    function handleSave() {
        TemplateRepository.replaceAll(templates);
    }
</script>

<style>

</style>

<table class="editor">
    <thead>
        <th>title</th>
        <th>search</th>
        <th>replace</th>
        <th></th>
    </thead>
    {#each templates as template, index}
    <tr>
        <td><input type="text" bind:value={template.title}></td>
        <td><input type="text" bind:value={template.search}></td>
        <td><input type="text" bind:value={template.replace}></td>
        <td><button on:click={() => handleDelete(index)}>x</button></td>
    </tr>
    {/each}
    <button on:click={handleAdd}>add</button>
    <button on:click={handleSave}>save</button>
</table>