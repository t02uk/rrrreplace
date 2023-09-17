<script lang="ts">
    export let searchPattern;
    export let searchSubject;
    export let replacePattern;
    type ReplacePreviewLine = {
        type: "mathed",
        text: String,
    } | {
        type: "unmathed",
    };
    let replacePreviewLines: ReplacePreviewLine[] = [];

    let errorMessage = "";

    $: {
        try {
            errorMessage = "";
            
            const regexp = new RegExp(searchPattern, "");
            const subjectLines = searchSubject.split(/\n/);
            const replaced = subjectLines.map((subjectLine) => {
                if (regexp.test(subjectLine)) {
                    return {
                        type: "mathed",
                        text: subjectLine.replace(regexp, replacePattern)
                    }
                } else {
                    return {
                        type: "unmathed"
                    }
                }
            });
            replacePreviewLines = replaced;
        } catch (e) {
            errorMessage = e.toString();
        }
    }
</script>

<style>
.textarea-like-wrap {
    height: calc(100vh - 90px);
}
.unmathed {
    color: #f00;
}
</style>

<div class="textarea-like-wrap">
   <code class="textarea-like">
        {#each replacePreviewLines as line, index}
            {#if line.type == "mathed"}
                {line.text}
            {:else}
                <span class="unmathed">(unmathed)</span>
            {/if}
            <!-- {#if replacePreviewLines.length === 1 && replacePreviewLines[0].text === ""} -->
                <!-- &nbsp; -->
            <!-- {/if} -->
            {#if index != replacePreviewLines.length - 1}
                <br>
            {/if}
        {/each}
    </code>
</div>
