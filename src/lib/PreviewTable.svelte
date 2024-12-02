<script lang="ts">
    export let searchPattern: string = "";
    export let searchSubject: string = "";
    let matchLines = new Array<RegExpExecArray>();
    let matchLineSize = 0;
    let errorMessage = "";

    $: {
        try {
            errorMessage = "";
            
            const regexp = new RegExp(searchPattern, "");
            const subjectLines = searchSubject.split(/\n/);
            matchLines = subjectLines.map((subjectLine) => {
                return regexp.exec(subjectLine);
            });
            if (matchLines) {
                matchLineSize = matchLines.reduce((acc, x) => Math.max(acc, x ? x.length : 0), 0);
            }
        } catch (e) {
            errorMessage = e.toString();
        }
    }
</script>

<style>
table {
    border-collapse: collapse;
    min-width: 100%
}
</style>

{#if errorMessage.length}
    <span class="errorMessage">{errorMessage}</span>
{/if}
<table>
    {#if matchLineSize > 0}
    <thead>
        {#each new Array(matchLineSize - 1) as _, i}
        <td>
            ${i + 1}
        </td>
        {/each}
    </thead>
    {/if}

    <tbody>
    {#each matchLines as match}
    <tr>
        {#if match}
        {#each match.slice(1) as m}
            <td>{m}</td>
        {/each}
        {:else}
            <td colspan={matchLineSize - 1}>not match</td>
        {/if}
    </tr>
    {/each}
    </tbody>
</table>