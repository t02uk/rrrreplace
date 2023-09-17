<script lang="ts">
    export let value = "";
</script>

<style>
textarea {
    width: 100%;
    height: 100%;
}
</style>

<textarea bind:value={value} />